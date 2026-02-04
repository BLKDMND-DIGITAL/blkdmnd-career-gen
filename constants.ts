
import { CandidateProfile } from "./types";

export const DEFAULT_PROFILE: CandidateProfile = {
  name: "Greg Dukes",
  location: "Charlotte, NC",
  phone: "704-555-0123",
  email: "greg@example.com",
  github: "github.com/BLKDMND-DIGITAL",
  linkedin: "linkedin.com/in/gregdukes",
  portfolio_name: "blkdmnd.digital",
  roles: [
    "AI Solutions Architect",
    "Full-Stack + AI Integration Engineer",
    "LLM Prompt Workflow Designer",
    "Media Production Specialist"
  ],
  core_skills: [
    "LLM prompt engineering",
    "LLM workflow design",
    "JSON schema design",
    "Python automation",
    "JavaScript / TypeScript",
    "AWS (S3, CloudFront, Route 53)",
    "Adobe Premiere Pro",
    "Color Grading (DaVinci Resolve)",
    "Cinematography"
  ],
  signature_projects: [
    "AI Visual Thesis (AWS-hosted living portfolio)",
    "Hybrid AI color correction pipeline (Python + OpenCV)",
    "Legal-tech automation stack for document processing",
    "Documentary Series for BBC Reel"
  ],
  media_credentials: [
    "Documentary filmmaker with credits at BBC Reel",
    "Visual storyteller for global brands",
    "Expert in AI-enhanced post-production workflows"
  ],
  education: "B.A. in Media Studies",
  certifications: [
    "AI / ML certifications from Google",
    "AWS cloud certification",
    "Professional Colorist Certification"
  ]
};

export const MEDIA_PRODUCTION_JDS = [
  {
    id: "glimmer-1",
    source: "Glimmer",
    title: "Senior Video Producer (Remote)",
    description: "We are looking for a Senior Video Producer to lead high-impact visual storytelling for tech brands. Must have experience with end-to-end production, remote crew management, and high-end post-production workflows. Experience with AI-assisted editing tools is a plus."
  },
  {
    id: "glimmer-2",
    source: "Glimmer",
    title: "Creative Director - Digital Media",
    description: "Seeking a Creative Director to oversee a slate of digital documentaries. You will define the visual language, manage editors, and ensure narrative consistency across platforms. Deep knowledge of digital-first platforms like YouTube and BBC Reel is preferred."
  },
  {
    id: "glimmer-3",
    source: "Glimmer",
    title: "AI-Workflow Post-Production Lead",
    description: "Innovate at the intersection of media and technology. We need a lead who can implement AI-driven automation into our post-production pipeline. Must be comfortable with Python scripting for media assets and traditional NLE workflows."
  }
];

export const getSystemPrompt = (profile: CandidateProfile) => `
You are the **Fast Track Smart Matching Engine**, calibrated for **${profile.name}**. 
Your goal: Map the Job Description to the Candidate's background with perfect clarity and professional focus.

SYSTEM LOGIC:
1. **Source Data**: Use ONLY the information provided in the profile below. Do not invent new skills or degrees.
${JSON.stringify(profile, null, 2)}

2. **Core Guidelines**:
   - **Grounding**: All content must be based on facts from the profile. 
   - **Matching**: Highlight the parts of the candidate's history that directly solve the problems mentioned in the job description.
   - **Formatting**: Output must be strict JSON following the provided schema. No extra text.
   - **Transparency**: In 'match_explanation', explain clearly why the candidate is a great fit for this specific role.

3. **Output Style**:
   - Professional, impactful, and clear.
   - Optimized for both human recruiters and automated application systems.
   - Focus on measurable impact and leadership.

4. **Strategic Outreach**:
   - The 'recruiter_dm' should be a short, direct message that mentions a specific project from the profile which proves the candidate can handle the job's main challenge.

Tone: High-end, technical, and value-driven.
`;
