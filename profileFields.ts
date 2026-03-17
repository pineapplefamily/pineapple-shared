/**
 * Canonical Profile Fields — Single Source of Truth
 *
 * Every onboarding screen, Journey Doula task, and profile display component
 * MUST import column names and enum values from this file.
 *
 * Never hardcode column names or enum values as strings in components.
 * This prevents schema drift between surfaces.
 */

// ═══════════════════════════════════════════════════════════════════
// GC (Gestational Carrier) Profile
// ═══════════════════════════════════════════════════════════════════

/** Canonical gc_profiles column names */
export const GC_FIELDS = {
  TOTAL_PREGNANCIES: 'gc_total_pregnancies',
  LIVE_BIRTHS: 'gc_live_births',
  CSECTION_COUNT: 'gc_csection_count',
  CURRENTLY_PREGNANT: 'gc_currently_pregnant',
  CURRENTLY_BREASTFEEDING: 'gc_currently_breastfeeding',
  MISCARRIAGES: 'gc_miscarriages',
  ECTOPIC_PREGNANCIES: 'gc_ectopic_pregnancies',
  STILLBIRTHS: 'gc_stillbirths',
  DELIVERY_METHODS: 'gc_delivery_methods',
  PREGNANCY_COMPLICATIONS: 'gc_pregnancy_complications',
  HEIGHT_FEET: 'gc_height_feet',
  HEIGHT_INCHES: 'gc_height_inches',
  WEIGHT: 'gc_weight',
  BMI: 'gc_bmi',
  BMI_REMEDIATION: 'gc_bmi_remediation',
  SMOKING_STATUS: 'gc_smoking_status',
  VAPING_STATUS: 'gc_vaping_status',
  ALCOHOL_USE: 'gc_alcohol_use',
  MARIJUANA_USE: 'gc_marijuana_use',
  SUBSTANCE_USE: 'gc_substance_use',
  MENTAL_HEALTH_HISTORY: 'gc_mental_health_history',
  CHRONIC_CONDITIONS: 'gc_chronic_conditions',
  CONDITION_MEDICATIONS: 'gc_condition_medications',
  FELONY_SELF: 'gc_felony_self',
  FELONY_SELF_DETAIL: 'gc_felony_self_detail',
  FELONY_PARTNER: 'gc_felony_partner',
  FELONY_PARTNER_DETAIL: 'gc_felony_partner_detail',
  CPS_HISTORY: 'gc_cps_history',
  CITIZENSHIP_STATUS: 'gc_citizenship_status',
  RELATIONSHIP_STATUS: 'gc_relationship_status',
  HEALTH_INSURANCE: 'gc_health_insurance',
  WILLING_TO_TRAVEL: 'gc_willing_to_travel',
  LGBTQ_COMFORT: 'gc_lgbtq_comfort',
  IP_TYPES_OPEN_TO: 'gc_ip_types_open_to',
  BASE_COMPENSATION_EXPECTATION: 'gc_base_compensation_expectation',
  PREVIOUS_SURROGACY: 'gc_previous_surrogacy',
  TIMELINE: 'gc_timeline',
  MULTIPLES_WILLINGNESS: 'gc_multiples_willingness',
  VIEWS_ON_TERMINATION: 'gc_views_on_termination',
  COMMUNICATION_PREFERENCE: 'gc_communication_preference',
  POST_BIRTH_RELATIONSHIP: 'gc_post_birth_relationship',
  INSURANCE_SURROGACY_FRIENDLY: 'gc_insurance_surrogacy_friendly',
  SCREENING_STATUS: 'gc_screening_status',
  DISQUALIFIER_REASONS: 'gc_disqualifier_reasons',
  SOFT_FLAG_REASONS: 'gc_soft_flag_reasons',
  CALL_PREFERENCE: 'gc_call_preference',
} as const;

/** Canonical GC enum values */
export const GC_ENUMS = {
  SMOKING_STATUS: {
    NEVER: 'never',
    QUIT_OVER_1_YEAR: 'quit_over_1_year',
    QUIT_UNDER_1_YEAR: 'quit_under_1_year',
    CURRENT: 'current',
  },
  ALCOHOL_USE: {
    NONE: 'none',
    SOCIAL: 'social',
    REGULAR: 'regular',
  },
  MARIJUANA_USE: {
    NEVER: 'never',
    FORMER: 'former',
    CURRENT_RECREATIONAL: 'current_recreational',
    CURRENT_MEDICAL: 'current_medical',
  },
  SUBSTANCE_USE: {
    NEVER: 'never',
    FORMER: 'former',
    CURRENT: 'current',
  },
  LGBTQ_COMFORT: {
    ABSOLUTELY: 'absolutely',
    OPEN_TO_IT: 'open_to_it',
    NO: 'no',
  },
  COMPENSATION: {
    RANGE_25_35: '25000_35000',
    RANGE_35_45: '35000_45000',
    RANGE_45_55: '45000_55000',
    RANGE_55_65: '55000_65000',
    RANGE_65_PLUS: '65000_plus',
    NEGOTIABLE: 'negotiable',
  },
  WILLING_TO_TRAVEL: {
    LOCAL_ONLY: 'local_only',
    STATEWIDE: 'statewide',
    REGIONAL: 'regional',
    ANYWHERE_US: 'anywhere_us',
  },
  MENTAL_HEALTH_HISTORY: {
    NONE: 'none',
    MANAGED_PAST: 'managed_past',
    MANAGED_CURRENT: 'managed_current',
    UNMANAGED: 'unmanaged',
  },
  DELIVERY_METHODS: {
    VAGINAL: 'vaginal',
    C_SECTION: 'c_section',
    VAGINAL_AFTER_C_SECTION: 'vaginal_after_c_section',
  },
  RELATIONSHIP_STATUS: {
    SINGLE: 'single',
    MARRIED: 'married',
    DOMESTIC_PARTNERSHIP: 'domestic_partnership',
    DIVORCED: 'divorced',
    SEPARATED: 'separated',
  },
  HEALTH_INSURANCE: {
    EMPLOYER: 'employer',
    MARKETPLACE: 'marketplace',
    MEDICAID: 'medicaid',
    NONE: 'none',
    OTHER: 'other',
  },
  CPS_HISTORY: {
    NO: 'no',
    YES_RESOLVED: 'yes_resolved',
    YES_OPEN: 'yes_open',
  },
  CITIZENSHIP_STATUS: {
    US_CITIZEN: 'us_citizen',
    PERMANENT_RESIDENT: 'permanent_resident',
    WORK_VISA: 'work_visa',
    UNDOCUMENTED: 'undocumented',
    OTHER_VISA: 'other_visa',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════
// IP (Intended Parent) Profile
// ═══════════════════════════════════════════════════════════════════

/** Canonical ip_profiles column names */
export const IP_FIELDS = {
  FAMILY_STRUCTURE: 'family_structure',
  PARTNERSHIP_TYPE: 'partnership_type',
  EXISTING_CHILDREN: 'existing_children',
  EXISTING_CHILDREN_COUNT: 'existing_children_count',
  JOURNEY_TYPE: 'journey_type',
  CLINIC_STATUS: 'clinic_status',
  CLINIC_STATE: 'clinic_state',
  EMBRYO_STATUS: 'embryo_status',
  EMBRYO_COUNT: 'embryo_count',
  EMBRYO_COUNT_TOTAL: 'embryo_count_total',
  EGG_SOURCE: 'egg_source',
  SPERM_SOURCE: 'sperm_source',
  TIMELINE: 'timeline_to_begin',
  GC_COMPENSATION_BUDGET: 'gc_compensation_budget',
  GC_BASE_COMPENSATION_BUDGET: 'gc_base_compensation_budget',
  GC_EXPERIENCE_PREFERENCE: 'gc_experience_preference',
  GC_LOCATION_PREFERENCE: 'gc_location_preference',
  GC_LOCATION_PREFERENCES: 'gc_location_preferences',
  VIEWS_ON_TERMINATION: 'views_on_termination',
  EMPLOYER_FERTILITY_BENEFITS: 'employer_fertility_benefits',
  DONOR_COMPENSATION_BUDGET: 'donor_compensation_budget',
  DONOR_ETHNICITY_PREFERENCES: 'donor_ethnicity_preferences',
  DONOR_EXPERIENCE_PREFERENCE: 'donor_experience_preference',
  DONOR_ANONYMITY_PREFERENCE: 'donor_anonymity_preference',
} as const;

/** Canonical IP enum values */
export const IP_ENUMS = {
  JOURNEY_TYPE: {
    SURROGACY_ONLY: 'surrogacy_only',
    EGG_DONOR_ONLY: 'egg_donor_only',
    SURROGACY_AND_DONOR: 'surrogacy_egg_donor',
    DOULA_ONLY: 'doula_only',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════
// ED (Egg Donor) Profile
// ═══════════════════════════════════════════════════════════════════

/** Canonical donor_profiles column names */
export const ED_FIELDS = {
  HEIGHT_FEET: 'ed_height_feet',
  HEIGHT_INCHES: 'height_inches',
  WEIGHT: 'weight_lbs',
  BMI: 'ed_bmi',
  EYE_COLOR: 'eye_color',
  NATURAL_HAIR_COLOR: 'natural_hair_color',
  HAIR_TEXTURE: 'hair_texture',
  ETHNICITIES: 'ethnicities',
  SKIN_TONE: 'skin_tone',
  BLOOD_TYPE: 'blood_type',
  SMOKING_STATUS: 'smoking_status',
  ALCOHOL_USE: 'alcohol_use',
  MARIJUANA_USE: 'marijuana_use',
  SUBSTANCE_USE: 'drug_use',
  EDUCATION_LEVEL: 'education_level',
  COMPENSATION_RANGE: 'ed_compensation_range',
  ANONYMITY_LEVEL: 'anonymity_level',
  PRIOR_DONATIONS: 'prior_donations',
  AVAILABLE_TO_START: 'available_to_start',
} as const;
