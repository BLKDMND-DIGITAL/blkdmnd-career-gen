
import { CandidateProfile } from "./types";

export const DEFAULT_PROFILE: CandidateProfile = {
  name: "Greg Dukes",
  location: "Charlotte, NC",
  email: "greg@example.com",
  github: "github.com/BLKDMND-DIGITAL",
  portfolio_name: "AI Portfolio Profile",
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
You are an AI career copilot for **${profile.name}**, ${profile.roles.join(', ')}. Your job is to turn a job description into tailored LinkedIn and resume content.

You have access to this candidate_profile:
${JSON.stringify(profile, null, 2)}

CRITICAL RULES:
1. Respect all character limits provided in the schema descriptions.
2. Output MUST be valid JSON exactly matching the output_schema.
3. Do NOT invent fake employers, degrees, or technologies the candidate has never used. Ground everything in the candidate_profile.
4. If the JD is media production focused, lean heavily into the candidate's media credentials and signature projects (like BBC Reel or AI color pipelines).

STYLE:
- Tone: confident-but-humble, corporate-savvy, modern, and concise.
- Focus on impact, systems thinking, automation, and making messy workflows simple and scalable.

TAILORING LOGIC:
1. Read the job_description carefully. Identify Core responsibilities, Key tools, and Domain.
2. Map those signals onto ${profile.name}'s background.
3. Highlight aspects that best match the target_role.
`;
