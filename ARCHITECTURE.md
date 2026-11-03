# Pineapple Family — Architecture Reference

This document defines canonical data ownership rules for the platform. These rules exist to prevent data model drift — the pattern where the same field gets written to one table and read from another, causing silent mismatches across surfaces.

**Rule: when in doubt, check here first before writing any query that touches the fields below.**

---

## Canonical Table Ownership

These fields exist in multiple tables due to legacy history. The canonical owner is the source of truth. All reads and writes must use the canonical table.

| Field | Canonical Table | Legacy Table (do not read/write) | Notes |
|---|---|---|---|
| `journey_type` | `ip_profiles` | `profiles` | User-facing journey type. Also copied to `journeys.journey_type` at row creation only — that copy is structural, not a read path. |
| `clinic_status` | `ip_profiles` | `profiles` | Whether the IP has a fertility clinic. |
| `embryo_status` | `ip_profiles` | `profiles` | Whether the IP has embryos ready. |
| `existing_children_count` | `ip_profiles` | `profiles` | Integer count. `ip_profiles.existing_children` (string) is legacy — do not write new code against it. |

## Photo Column Ownership

Profile photos are stored as direct URL arrays. One canonical column per role — do not create additional photo columns.

| Role | Canonical column | Table |
|---|---|---|
| GC | `family_photo_urls` | `gc_profiles` |
| IP | `family_photo_urls` | `ip_profiles` |
| Donor | `photo_urls` | `donor_profiles` |

All photo upload surfaces (PhotoUploadModal, publish tasks) write to these columns.
All photo read surfaces (ProfileHeroZone, usePhotoCompleteness) read from these columns.
The `adult_photos_document_ids` and `childhood_photos_document_ids` columns on `donor_profiles` are legacy — do not write new code against them.

---

## Journey Type Vocabulary

Two different enums exist and are intentionally separate. Do not conflate them.

### `ip_profiles.journey_type` — user-facing language
Describes what the IP is pursuing:
- `surrogacy` — surrogacy only
- `surrogacy_egg_donor` — surrogacy with egg donor
- `egg_donation` — egg donation only
- `both` — same as surrogacy_egg_donor (legacy alias)
- `gc_only`, `egg_donor_only`, `gc_plus_donor`, `doula_only` — infrastructure values, also valid here

### `journeys.journey_type` — infrastructure language
Describes what participants are involved. Postgres enum — only these four values are valid:
- `gc_only`
- `egg_donor_only`
- `gc_plus_donor`
- `doula_only`

**When creating a `journeys` row, always map through `mapToJourneyType()` in `onboardingStateManager.ts`.** Never pass `ip_profiles.journey_type` directly to a `journeys` insert.

---

## Profile Table Responsibilities

| Table | Owns | Does NOT own |
|---|---|---|
| `profiles` | Identity fields: `legal_first_name`, `legal_last_name`, `email`, `alias`, `partner_user_id`, `role`, `account_type`, `profile_published`, `id_verification_status` | Journey-specific fields: `journey_type`, `clinic_status`, `embryo_status`, `existing_children_count` |
| `ip_profiles` | All IP journey fields including the four canonical fields above | Identity fields |
| `gc_profiles` | All GC journey fields including `gc_id_verification_status` | Identity fields |
| `donor_profiles` | All egg donor journey fields | Identity fields |
| `journeys` | Journey lifecycle: `payment_status`, `status`, `matching_locked`, `gc_user_id`, `egg_donor_user_id` | Profile data of any kind |

---

## Three Surfaces, One Data Source

Profile data is collected and edited through three surfaces. All three read and write the same tables.

| Surface | Purpose |
|---|---|
| Onboarding | First-time collection. Writes to role-specific profile table (`ip_profiles`, `gc_profiles`, `donor_profiles`). |
| Journey Doula | Guided completion. Reads and writes the same role-specific profile table as onboarding. |
| Profile page | Direct edit. Reads and writes the same role-specific profile table as onboarding. |

If a field is collected during onboarding, it must be readable in Journey Doula and on the profile page without any sync step. There is no sync — they share the same row.

---

## Journey Row Lifecycle

A `journeys` row is created for IP users only. GCs and egg donors participate in an IP's journey when matched — they do not own journey rows.

| Event | What happens |
|---|---|
| IP completes onboarding | `ensureJourneyRow()` fires inside `completeOnboarding()` in `onboardingStateManager.ts` |
| IP hits Stripe checkout | `ensureJourneyRow()` fires inside `setPendingPayment()` — must exist before `create-checkout` edge function runs |
| Match confirmed | `gc_user_id` or `egg_donor_user_id` set on the existing row |
| Payment completes | `payment_status` updated to `'paid'` by `create-checkout` edge function |

**Never insert into `journeys` from any surface other than `onboardingStateManager.ts`.** The `create-checkout` edge function reads and updates existing rows only.

---

## Verification Status Enums

Two separate verification concepts with different column names and different valid values.

### ID Verification (`profiles.id_verification_status`, `gc_profiles.gc_id_verification_status`)
Written by Stripe Identity webhook and `create-identity-verification` edge function.

| Value | Meaning |
|---|---|
| `not_started` | Default — no action taken |
| `pending` | Stripe session created, user redirected |
| `verified` | Stripe confirmed identity — this is the success state |
| `failed` | Stripe rejected or user abandoned — show retry UI |

### Background Check (`profiles.background_check_status`, `gc_profiles.background_check_status`)
Written by Checkr webhook.

| Value | Meaning |
|---|---|
| `not_started` | Default |
| `pending` | Check initiated |
| `cleared` | Background check passed — this is the success state |
| `flagged` | Requires review |

**Do not use `cleared` for ID verification. Do not use `verified` for background checks.**

---

## Deep-Link Contract

Journey Doula accepts both task UUIDs and `task_type` strings as the `?task=` URL parameter. Both are valid. Use `task_type` strings when navigating from the profile page or any other surface — they are stable and human-readable.

```typescript
// Both of these work
navigate('/journey-doula?task=gc_publish_profile')        // task_type string ✅
navigate('/journey-doula?task=6c653344-...')              // UUID ✅
```

The lookup in `JourneyDoula.tsx` handles both:
```typescript
tasks.find(t => t.id === taskIdFromUrl || t.task_type === taskIdFromUrl)
```

---

## Database Object Security — Public Schema Defaults

Supabase applies default privileges in the `public` schema: **every new table, view, and function is automatically granted to `anon` and `authenticated` at creation.** Creating an object in `public` IS exposing it through PostgREST until access is explicitly revoked.

This caused a production security incident (advisor criticals, 2026-07-20/21): `v_admin_user_analytics` (joins `auth.users`, exposes every user's email) and `get_admin_analytics()` were created for the admin portal and were immediately readable/callable by anyone holding the anon key that ships in the frontend bundle. `cio_track_dedupe` was created without RLS and was world-readable and world-writable.

Rules — non-negotiable, enforced in the same migration that creates the object:

- Every new table in `public` gets `ENABLE ROW LEVEL SECURITY` in its creation migration. No exceptions, including internal/service tables.
- Service-only tables (written only by SECURITY DEFINER functions or service-role paths) get RLS enabled with **no policies** plus `REVOKE ALL ON TABLE ... FROM anon, authenticated;`.
- Admin-only or service-only views and functions get `REVOKE ALL`/`REVOKE EXECUTE ... FROM PUBLIC, anon, authenticated;` in their creation migration. Only `service_role` retains access.
- No view in `public` may reference `auth.users` unless its API-role access is revoked in the same migration. `auth.users` contains every user's email.
- After any migration that creates or replaces a table, view, or function, run the Supabase security advisors (security lints) against the target environment before declaring the work done. A new ERROR-level lint means the work is not done.
- These rules bind BOTH Lovable projects. The admin portal (`pineapple-admin`) writes to the same production database; deploying straight to prod does not exempt it — it raises the stakes.

---

## Adding New Features — Checklist

Before writing any query that touches profile or journey data:

- [ ] Is the field I need in `profiles` or in a role-specific table (`ip_profiles`, `gc_profiles`, `donor_profiles`)? Check the table above.
- [ ] If it's one of the four canonical fields (`journey_type`, `clinic_status`, `embryo_status`, `existing_children_count`), am I reading from `ip_profiles`?
- [ ] If I'm creating a `journeys` row for any reason, am I going through `ensureJourneyRow()` and mapping journey types through `mapToJourneyType()`?
- [ ] If I'm checking verification status, am I using `verified` for ID and `cleared` for background checks?
- [ ] If I'm linking to a Journey Doula task, am I using the `task_type` string from the `tasks` table?
- [ ] If a migration replaces a database function with DROP FUNCTION + CREATE FUNCTION, the ACL is reset. Re-grant EXECUTE explicitly (e.g. `GRANT EXECUTE ON FUNCTION ... TO authenticated;`) for every function the frontend calls via `.rpc()`. CREATE OR REPLACE preserves grants; DROP + CREATE silently strips them (incident: get_ips_for_gc, 2026-07-09).

- [ ] If this change creates a new table, view, or function in `public`: RLS is enabled (tables) and `anon`/`authenticated` access is explicitly revoked in the SAME migration unless client access is intended. Supabase default privileges auto-grant everything to API roles at creation (incident: `v_admin_user_analytics` email exposure, 2026-07-21). See 'Database Object Security'.
- [ ] If the new object is admin-only or service-only, only `service_role` can touch it, verified by running the Supabase security advisors on the target environment before declaring done.
---

## Canonical Profile Fields

ALL onboarding screens, Journey Doula tasks, and profile display components MUST import
column names and enum values from `src/constants/profileFields.ts`.

Never hardcode column names or enum values as strings.

Before writing any query or component that reads/writes gc_profiles, ip_profiles,
or donor_profiles: open profileFields.ts and verify the exact column name and
allowed values. This is the single source of truth.

Column name mismatches and vocabulary mismatches between surfaces are the primary
source of data not appearing where expected. profileFields.ts prevents this.

## Deploy caveat: merged-SHA production deploys can be silently dropped (observed 2026-07-30, PR #449)

When a PR from staging is merged into main, an automation fast-forwards staging to the same merge
commit within seconds. GitHub then delivers two push events (staging and main) carrying the identical
SHA, and Vercel can drop the main event: only a preview deployment attributed to staging is created and
pineapplefamily.org keeps serving the previous production deployment. PR #448 got both deployments;
PR #449 got only the preview.

Rule: after every merge to main, the four-point verification must confirm a deployment with
target=production built from the merge SHA, not merely a READY deployment from that SHA. A staging-ref
preview of the merge commit does NOT count. If no production deployment appears within a few minutes,
the remedy is a new commit through staging and a re-merge (never a direct push to main), which produces
a fresh merge SHA and a clean main push event.

## Vercel server layer (hand-maintained, not Lovable)

These files are edited directly, not through Lovable prompts. Lovable must not modify them; if a
Lovable change appears to need them, stop and flag it instead:

- `vercel.json` (headers, redirects, rewrites; rewrite order matters, the SPA catch-all must stay last)
- `middleware.ts` (crawler OG tags for `/webinars/:slug` and `/family-fronds` only)
- `api/**` (Vercel serverless functions; files prefixed `_` are not routes)

Public SEO surfaces served by functions:

- `/sitemap.xml` -> `api/sitemap.ts`. Explicit `application/xml`. Reads `articles` with the publishable
  key and `status = 'published'`, so RLS decides what is listed. Do not proxy the sitemap to a Supabase
  edge function again: the Supabase gateway delivered it as `text/plain` and Search Console rejected it.
- `/education` and `/education/:slug` -> `api/education.ts`. Serves the app shell with the article (or
  index) prerendered inside `#root`, plus title, meta, canonical, OG and JSON-LD. Same HTML for every
  visitor; browsers hide `#prerender` and React replaces `#root` on mount. Unpublished or unknown slugs
  return a real 404. Must use the same `status = 'published'` filter as `src/pages/ArticlePage.tsx`.

Environment: functions read `VITE_SUPABASE_URL` and a publishable/anon key at runtime. Those Vercel
variables exist for Production and for the `staging` branch Preview only. Feature-branch previews have
none, so the functions fall back to prod only when `VERCEL_ENV === 'production'` and otherwise fail
closed (`X-Sitemap-Error` / `X-Prerender: passthrough-env-missing-url`). Test these functions on
dev.pineapplefamily.org after merging to staging, not on feature-branch preview URLs.
