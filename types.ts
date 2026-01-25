
export type TargetRole = string;

export interface TailoredContent {
  linkedin_headline: string;
  linkedin_about_section: string;
  easy_apply_introduce_yourself: string;
  easy_apply_why_good_fit: string;
  recruiter_dm: string;
  connection_note: string;
  interview_bullets: string[];
  interview_prep_tips: string[];
  tailored_keywords: string[];
  resume_target_title: string;
  resume_professional_summary: string;
  resume_core_bullets: string[];
  resume_role_specific_bullets: string[];
  cover_letter_body: string;
  match_score: number;
  match_explanation: string;
}

export interface CandidateProfile {
  name: string;
  location: string;
  email?: string;
  github?: string;
  linkedin?: string;
  portfolio_name?: string;
  roles: string[];
  core_skills: string[];
  signature_projects: string[];
  media_credentials: string[];
  education: string;
  certifications: string[];
}