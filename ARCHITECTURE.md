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

## Adding New Features — Checklist

Before writing any query that touches profile or journey data:

- [ ] Is the field I need in `profiles` or in a role-specific table (`ip_profiles`, `gc_profiles`, `donor_profiles`)? Check the table above.
- [ ] If it's one of the four canonical fields (`journey_type`, `clinic_status`, `embryo_status`, `existing_children_count`), am I reading from `ip_profiles`?
- [ ] If I'm creating a `journeys` row for any reason, am I going through `ensureJourneyRow()` and mapping journey types through `mapToJourneyType()`?
- [ ] If I'm checking verification status, am I using `verified` for ID and `cleared` for background checks?
- [ ] If I'm linking to a Journey Doula task, am I using the `task_type` string from the `tasks` table?

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
