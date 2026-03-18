/**
 * Canonical Profile Fields — Single Source of Truth
 *
 * Every onboarding screen, Journey Doula task, and profile display component
 * MUST import column names, enum values, and display labels from this file.
 *
 * Never hardcode column names, enum values, or display labels as strings in components.
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

/** Canonical GC enum values — uses onboarding values as canonical */
export const GC_ENUMS = {
  SMOKING_STATUS: {
    NEVER: 'never',
    QUIT_OVER_1_YEAR: 'quit_over_1_year',
    QUIT_UNDER_1_YEAR: 'quit_less_than_1_year',
    CURRENT: 'current_smoker',
  },
  VAPING_STATUS: {
    NEVER: 'never',
    FORMER: 'former',
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
    NO_HISTORY: 'no_history',
    PAST_OVER_2_YEARS: 'past_over_2_years',
    PAST_UNDER_2_YEARS: 'past_under_2_years',
    CURRENT: 'current_use',
  },
  CPS_HISTORY: {
    NO: 'no',
    CLOSED: 'closed',
    ACTIVE: 'active',
    PREFER_NOT: 'prefer_not_to_say',
  },
  RELATIONSHIP_STATUS: {
    SINGLE: 'single',
    IN_RELATIONSHIP: 'in_relationship',
    MARRIED: 'married',
    DIVORCED: 'divorced',
    OTHER: 'other',
  },
  HEALTH_INSURANCE: {
    EMPLOYER_PRIVATE: 'employer_private',
    ACA_MARKETPLACE: 'aca_marketplace',
    MEDICAID: 'medicaid',
    NO_INSURANCE: 'no_insurance',
    NOT_SURE: 'not_sure',
  },
  COMPENSATION: {
    RANGE_35_45: '35000_45000',
    RANGE_45_55: '45000_55000',
    RANGE_55_65: '55000_65000',
    RANGE_65_75: '65000_75000',
    RANGE_75_PLUS: '75000_plus',
    FLEXIBLE: 'flexible',
    NOT_SURE: 'not_sure',
  },
  WILLING_TO_TRAVEL: {
    LOCAL_ONLY: 'local_only',
    WITHIN_STATE: 'within_state',
    NEIGHBORING_STATES: 'neighboring_states',
    ANYWHERE_US: 'anywhere_us',
  },
  LGBTQ_COMFORT: {
    ABSOLUTELY: 'absolutely',
    OPEN_TO_IT: 'open_to_it',
    NO: 'no',
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
    VBAC: 'vbac',
  },
  CITIZENSHIP_STATUS: {
    US_CITIZEN: 'us_citizen',
    PERMANENT_RESIDENT: 'permanent_resident',
    WORK_VISA: 'work_visa',
    OTHER_VISA: 'other_visa',
    UNDOCUMENTED: 'undocumented',
    PREFER_NOT: 'prefer_not_to_say',
  },
  BMI_REMEDIATION: {
    WORKING_ON_IT: 'working_on_it',
    PROCEED_ANYWAY: 'proceed_anyway',
    PAUSE: 'pause',
  },
  IP_TYPES_OPEN_TO: {
    COUPLES: 'couples',
    SINGLE_PARENTS: 'single_parents',
    FIRST_TIME: 'first_time',
    EXISTING_CHILDREN: 'existing_children',
    INTERNATIONAL: 'international',
    NO_PREFERENCE: 'no_preference',
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
    SURROGACY: 'surrogacy',
    EGG_DONATION: 'egg_donation',
    BOTH: 'both',
    DOULA_ONLY: 'doula_only',
  },
  FAMILY_STRUCTURE: {
    COUPLE: 'couple',
    SINGLE: 'single',
    OTHER: 'other',
  },
  PARTNERSHIP_TYPE: {
    SAME_SEX: 'same_sex',
    DIFFERENT_SEX: 'different_sex',
    PREFER_NOT: 'prefer_not_to_say',
  },
  EMBRYO_STATUS: {
    READY: 'ready',
    CREATING: 'creating',
    NONE: 'none',
    UNSURE: 'unsure',
  },
  CLINIC_STATUS: {
    NOT_STARTED: 'not_started',
    RESEARCHING: 'researching',
    SELECTED: 'selected',
    WORKING_WITH: 'working_with',
    EMBRYOS_STORED: 'embryos_stored',
  },
  GC_EXPERIENCE_PREFERENCE: {
    EXPERIENCED_ONLY: 'experienced_only',
    PREFER_EXPERIENCED: 'prefer_experienced',
    NO_PREFERENCE: 'no_preference',
    NOT_SURE: 'not_sure',
  },
  VIEWS_ON_TERMINATION: {
    COMFORTABLE_ANY: 'comfortable_any',
    SEVERE_MEDICAL: 'severe_medical',
    LIFE_THREATENING: 'life_threatening',
    NOT_COMFORTABLE: 'not_comfortable',
    NEED_TO_THINK: 'need_to_think',
  },
  GC_LOCATION_PREFERENCE: {
    LOCAL: 'local',
    SAME_STATE: 'same_state',
    NEAR_CLINIC: 'near_clinic',
    ANYWHERE_US: 'anywhere_us',
    NOT_SURE: 'not_sure',
  },
  DONOR_ANONYMITY_PREFERENCE: {
    ANONYMOUS: 'anonymous',
    SEMI_OPEN: 'semi_open',
    OPEN_ID: 'open_id',
    KNOWN_FULLY_OPEN: 'known_fully_open',
    OPEN_TO_ANY: 'open_to_any',
  },
  DONOR_EXPERIENCE_PREFERENCE: {
    PROVEN_ONLY: 'proven_only',
    PREFER_PROVEN: 'prefer_proven',
    NO_PREFERENCE: 'no_preference',
    NOT_SURE: 'not_sure',
  },
  TIMELINE: {
    IMMEDIATELY: 'immediately',
    ONE_THREE_MONTHS: '1_3_months',
    THREE_SIX_MONTHS: '3_6_months',
    SIX_PLUS_MONTHS: '6_plus_months',
    EXPLORING: 'exploring',
  },
  EMPLOYER_BENEFITS: {
    COMPREHENSIVE: 'comprehensive',
    PARTIAL: 'partial',
    PROGYNY: 'progyny',
    NONE: 'none',
    SELF_EMPLOYED: 'self_employed',
    UNSURE: 'unsure',
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

/** Canonical ED enum values — uses onboarding values as canonical */
export const ED_ENUMS = {
  EYE_COLOR: {
    BROWN: 'brown',
    BLUE: 'blue',
    GREEN: 'green',
    HAZEL: 'hazel',
    GRAY: 'gray',
    AMBER: 'amber',
    OTHER: 'other',
  },
  HAIR_COLOR: {
    BLACK: 'black',
    DARK_BROWN: 'dark_brown',
    LIGHT_BROWN: 'light_brown',
    BLONDE: 'blonde',
    RED: 'red',
    AUBURN: 'auburn',
    OTHER: 'other',
  },
  HAIR_TEXTURE: {
    STRAIGHT: 'straight',
    WAVY: 'wavy',
    CURLY: 'curly',
    COILY_KINKY: 'coily_kinky',
  },
  ETHNICITY: {
    CAUCASIAN: 'caucasian',
    EAST_ASIAN: 'east_asian',
    SOUTH_ASIAN: 'south_asian',
    SOUTHEAST_ASIAN: 'southeast_asian',
    HISPANIC_LATINO: 'hispanic_latino',
    AFRICAN_AMERICAN: 'african_american',
    MIDDLE_EASTERN: 'middle_eastern',
    NATIVE_AMERICAN: 'native_american',
    PACIFIC_ISLANDER: 'pacific_islander',
    JEWISH: 'jewish',
    MIXED_MULTIRACIAL: 'mixed_multiracial',
    OTHER: 'other',
  },
  SKIN_TONE: {
    VERY_FAIR: 'very_fair',
    FAIR: 'fair',
    MEDIUM: 'medium',
    OLIVE: 'olive',
    TAN: 'tan',
    BROWN: 'brown',
    DARK_BROWN: 'dark_brown',
  },
  BLOOD_TYPE: {
    A_POS: 'A+',
    A_NEG: 'A-',
    B_POS: 'B+',
    B_NEG: 'B-',
    AB_POS: 'AB+',
    AB_NEG: 'AB-',
    O_POS: 'O+',
    O_NEG: 'O-',
    DONT_KNOW: 'dont_know',
  },
  SMOKING_STATUS: {
    NEVER: 'never',
    QUIT_OVER_1_YEAR: 'quit_over_1_year',
    QUIT_UNDER_1_YEAR: 'quit_less_than_1_year',
    CURRENT: 'current_smoker',
  },
  VAPING_STATUS: {
    NEVER: 'never',
    FORMER: 'former',
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
    NO_HISTORY: 'no_history',
    PAST_OVER_2_YEARS: 'past_over_2_years',
    PAST_UNDER_2_YEARS: 'past_under_2_years',
    CURRENT: 'current_use',
  },
  EDUCATION_LEVEL: {
    HIGH_SCHOOL: 'high_school',
    GED: 'ged',
    SOME_COLLEGE: 'some_college',
    ASSOCIATES: 'associates',
    BACHELORS: 'bachelors',
    MASTERS: 'masters',
    DOCTORAL: 'doctoral',
    IN_COLLEGE: 'in_college',
    OTHER: 'other',
  },
  RELATIONSHIP_STATUS: {
    SINGLE: 'single',
    IN_RELATIONSHIP: 'in_relationship',
    MARRIED: 'married',
    OTHER: 'other',
  },
  COMPENSATION_RANGE: {
    RANGE_5_7_5: '5000_7500',
    RANGE_7_5_10: '7500_10000',
    RANGE_10_15: '10000_15000',
    RANGE_15_PLUS: '15000_plus',
    ASRM_GUIDELINES: 'asrm_guidelines',
    FLEXIBLE: 'flexible',
    NOT_SURE: 'not_sure',
  },
  ANONYMITY_LEVEL: {
    ANONYMOUS: 'anonymous',
    SEMI_OPEN: 'semi_open',
    OPEN: 'open',
    KNOWN: 'known',
    OPEN_TO_DISCUSSING: 'open_to_discussing',
  },
  AVAILABLE_TO_START: {
    READY_NOW: 'ready_now',
    WITHIN_3_MONTHS: 'within_3_months',
    THREE_SIX_MONTHS: '3_6_months',
    FLEXIBLE: 'flexible',
  },
  TRAVEL_WILLINGNESS: {
    LOCAL_ONLY: 'local_only',
    WITHIN_STATE: 'within_state',
    NEIGHBORING_STATES: 'neighboring_states',
    ANYWHERE_US: 'anywhere_us',
  },
  OVARIAN_STATUS: {
    BOTH: 'both',
    ONE_REMOVED: 'one_removed',
    BOTH_REMOVED: 'both_removed',
    UNSURE: 'unsure',
  },
  CONTRACEPTION: {
    NONE: 'none',
    ORAL: 'oral_contraceptive',
    HORMONAL_IUD: 'hormonal_iud',
    COPPER_IUD: 'copper_iud',
    DEPO: 'depo_provera',
    IMPLANT: 'contraceptive_implant',
    CONDOMS: 'condoms',
    OTHER: 'other',
  },
  CALL_PREFERENCE: {
    VIDEO: 'video',
    AUDIO_ONLY: 'audio_only',
    MESSAGING_ONLY: 'messaging_only',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════
// Display Label Maps — slug → human-readable
// ═══════════════════════════════════════════════════════════════════

/** GC field display labels keyed by column name → stored value → label */
export const GC_LABELS: Record<string, Record<string, string>> = {
  gc_smoking_status: {
    never: 'Never smoked',
    quit_over_1_year: 'Quit over 1 year ago',
    quit_less_than_1_year: 'Quit less than 1 year ago',
    current_smoker: 'Current smoker',
  },
  gc_vaping_status: {
    never: 'Never vaped',
    former: 'Former vaper',
    current: 'Current vaper',
  },
  gc_alcohol_use: {
    none: 'No alcohol use',
    social: 'Social drinker',
    regular: 'Regular drinker',
  },
  gc_marijuana_use: {
    never: 'Never',
    former: 'Former use',
    current_recreational: 'Current recreational use',
    current_medical: 'Current medical use',
  },
  gc_substance_use: {
    no_history: 'No history',
    past_over_2_years: 'Past use — over 2 years ago',
    past_under_2_years: 'Past use — under 2 years ago',
    current_use: 'Current use',
  },
  gc_cps_history: {
    no: 'No',
    closed: 'Yes — closed case',
    active: 'Yes — active case',
    prefer_not_to_say: 'Prefer not to say',
  },
  gc_relationship_status: {
    single: 'Single',
    in_relationship: 'In a relationship',
    married: 'Married',
    divorced: 'Divorced',
    other: 'Other',
  },
  gc_health_insurance: {
    employer_private: 'Employer-provided',
    aca_marketplace: 'ACA Marketplace',
    medicaid: 'Medicaid',
    no_insurance: 'No insurance',
    not_sure: 'Not sure',
  },
  gc_base_compensation_expectation: {
    '35000_45000': '$35,000 – $45,000',
    '45000_55000': '$45,000 – $55,000',
    '55000_65000': '$55,000 – $65,000',
    '65000_75000': '$65,000 – $75,000',
    '75000_plus': '$75,000+',
    flexible: 'Flexible',
    not_sure: 'Not sure',
  },
  gc_willing_to_travel: {
    local_only: 'Local only',
    within_state: 'Within my state',
    neighboring_states: 'Neighboring states',
    anywhere_us: 'Anywhere in the US',
  },
  gc_lgbtq_comfort: {
    absolutely: 'Absolutely — fully supportive',
    open_to_it: 'Open to it',
    no: 'No',
  },
  gc_mental_health_history: {
    none: 'No mental health history',
    managed_past: 'Past — managed and resolved',
    managed_current: 'Currently managed with treatment',
    unmanaged: 'Currently unmanaged',
  },
  gc_delivery_methods: {
    vaginal: 'Vaginal',
    c_section: 'C-section',
    vbac: 'Vaginal after C-section (VBAC)',
  },
  gc_citizenship_status: {
    us_citizen: 'US Citizen',
    permanent_resident: 'Permanent Resident',
    work_visa: 'Work Visa',
    other_visa: 'Other Visa',
    undocumented: 'Undocumented',
    prefer_not_to_say: 'Prefer not to say',
  },
};

/** ED field display labels keyed by column name → stored value → label */
export const ED_LABELS: Record<string, Record<string, string>> = {
  smoking_status: {
    never: 'Never smoked',
    quit_over_1_year: 'Quit over 1 year ago',
    quit_less_than_1_year: 'Quit less than 1 year ago',
    current_smoker: 'Current smoker',
  },
  alcohol_use: {
    none: 'No alcohol use',
    social: 'Social drinker',
    regular: 'Regular drinker',
  },
  education_level: {
    high_school: 'High school diploma',
    ged: 'GED',
    some_college: 'Some college',
    associates: "Associate's degree",
    bachelors: "Bachelor's degree",
    masters: "Master's degree",
    doctoral: 'Doctoral degree',
    in_college: 'Currently in college',
    other: 'Other',
  },
  available_to_start: {
    ready_now: 'Ready now',
    within_3_months: 'Within 3 months',
    '3_6_months': '3–6 months',
    flexible: 'Flexible',
  },
  anonymity_level: {
    anonymous: 'Anonymous',
    semi_open: 'Semi-open',
    open: 'Open identity',
    known: 'Known donor',
    open_to_discussing: 'Open to discussing',
  },
  ed_compensation_range: {
    '5000_7500': '$5,000 – $7,500',
    '7500_10000': '$7,500 – $10,000',
    '10000_15000': '$10,000 – $15,000',
    '15000_plus': '$15,000+',
    asrm_guidelines: 'ASRM guidelines',
    flexible: 'Flexible',
    not_sure: 'Not sure',
  },
};

/** IP field display labels keyed by column name → stored value → label */
export const IP_LABELS: Record<string, Record<string, string>> = {
  journey_type: {
    surrogacy: 'Surrogacy only',
    egg_donation: 'Egg donation only',
    both: 'Surrogacy + egg donation',
    doula_only: 'Journey Doula only',
  },
  clinic_status: {
    not_started: 'Not started',
    researching: 'Researching clinics',
    selected: 'Clinic selected',
    working_with: 'Currently working with a clinic',
    embryos_stored: 'Embryos already stored',
  },
  timeline_to_begin: {
    immediately: 'Immediately',
    '1_3_months': '1–3 months',
    '3_6_months': '3–6 months',
    '6_plus_months': '6+ months',
    exploring: 'Just exploring',
  },
  views_on_termination: {
    comfortable_any: 'Comfortable with termination for any reason',
    severe_medical: 'Only for severe medical conditions',
    life_threatening: 'Only if life-threatening',
    not_comfortable: 'Not comfortable with termination',
    need_to_think: 'Need more time to think about this',
  },
};

/**
 * Universal label lookup — works for any role and field.
 * Returns human-readable label for a stored enum value.
 * Falls back to the raw value if no label is found.
 */
export function getFieldLabel(fieldKey: string, value: string | null | undefined): string {
  if (!value) return '—';
  const map = { ...GC_LABELS, ...ED_LABELS, ...IP_LABELS };
  return map[fieldKey]?.[value] ?? value;
}
