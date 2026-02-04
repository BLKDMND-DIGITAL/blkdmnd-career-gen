
import { GoogleGenAI, Type } from "@google/genai";
import { getSystemPrompt } from "../constants";
import { TailoredContent, CandidateProfile } from "../types";

// Removed deprecated Schema type annotation; using plain object for responseSchema.
const responseSchema = {
  type: Type.OBJECT,
  properties: {
    linkedin_headline: { type: Type.STRING, description: "LinkedIn headline, max 220 characters." },
    linkedin_about_section: { type: Type.STRING, description: "LinkedIn 'About' section summary, max 2200 characters." },
    easy_apply_introduce_yourself: { type: Type.STRING, description: "Short intro for Easy Apply, max 500 characters." },
    easy_apply_why_good_fit: { type: Type.STRING, description: "Answer for 'Why are you a good fit?', max 500 characters." },
    recruiter_dm: { type: Type.STRING, description: "Short DM for recruiter (max 350 chars). MUST mention a specific project or skill requirement from the JD." },
    connection_note: { type: Type.STRING, description: "Personalized connection note, max 250 characters." },
    interview_bullets: {
      type: Type.ARRAY,
      description: "5–7 high-impact talking points for a phone screen or interview, each max 180 characters.",
      items: { type: Type.STRING },
    },
    interview_prep_tips: {
      type: Type.ARRAY,
      description: "4-6 specific study tips or technical topics to review based on the JD, each max 200 characters.",
      items: { type: Type.STRING },
    },
    tailored_keywords: {
      type: Type.ARRAY,
      description: "Keywords from JD.",
      items: { type: Type.STRING },
    },
    resume_target_title: { type: Type.STRING, description: "Suggested resume title." },
    resume_professional_summary: { type: Type.STRING, description: "Resume summary, max 900 characters." },
    resume_core_bullets: {
      type: Type.ARRAY,
      description: "4–7 reusable core bullets, max 220 characters each.",
      items: { type: Type.STRING },
    },
    resume_role_specific_bullets: {
      type: Type.ARRAY,
      description: "4–8 tailored bullets, max 220 characters each.",
      items: { type: Type.STRING },
    },
    cover_letter_body: { type: Type.STRING, description: "Cover letter body text, max 1800 characters." },
    match_score: { type: Type.INTEGER, description: "Match percentage (0-100)." },
    match_explanation: { type: Type.STRING, description: "1-2 sentence explanation of match score." },
  },
  required: [
    "linkedin_headline", "linkedin_about_section", "easy_apply_introduce_yourself",
    "easy_apply_why_good_fit", "recruiter_dm", "connection_note", "interview_bullets",
    "interview_prep_tips", "tailored_keywords", "resume_target_title", "resume_professional_summary",
    "resume_core_bullets", "resume_role_specific_bullets", "cover_letter_body",
    "match_score", "match_explanation"
  ],
};

// Updated profileSchema to include all contact fields
const profileSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    location: { type: Type.STRING },
    email: { type: Type.STRING },
    phone: { type: Type.STRING },
    github: { type: Type.STRING },
    linkedin: { type: Type.STRING },
    portfolio_name: { type: Type.STRING },
    roles: { type: Type.ARRAY, items: { type: Type.STRING } },
    core_skills: { type: Type.ARRAY, items: { type: Type.STRING } },
    signature_projects: { type: Type.ARRAY, items: { type: Type.STRING } },
    media_credentials: { type: Type.ARRAY, items: { type: Type.STRING } },
    education: { type: Type.STRING },
    certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ["name", "location", "roles", "core_skills", "signature_projects", "education"],
};

export const parseResumePDF = async (base64Data: string): Promise<CandidateProfile> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType: "application/pdf" } },
        { text: "Extract the career information from this resume and format it into the specified JSON structure. Be precise." }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: profileSchema,
    }
  });
  
  const text = response.text;
  if (!text) throw new Error("Could not extract career information from PDF.");
  return JSON.parse(text) as CandidateProfile;
};

export const parseResumeText = async (resumeText: string): Promise<CandidateProfile> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { text: `Extract the career information from this resume/bio text and format it into the specified JSON structure. Be precise.\n\nTEXT:\n${resumeText}` }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: profileSchema,
    }
  });
  
  const text = response.text;
  if (!text) throw new Error("Could not extract career information from text.");
  return JSON.parse(text) as CandidateProfile;
};

export const extractTextFromPDF = async (base64Data: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType: "application/pdf" } },
        { text: "Extract all the text from this Job Description PDF. Return only the raw text." }
      ]
    }
  });
  return response.text || "";
};

export const generateContent = async (
  jobDescription: string,
  targetRole: string,
  profile: CandidateProfile
): Promise<TailoredContent> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const systemPrompt = getSystemPrompt(profile);

  const prompt = `
    Generate tailored LinkedIn and resume content for ${profile.name}.
    
    JOB DESCRIPTION:
    """
    ${jobDescription}
    """

    TARGET ROLE: ${targetRole}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No content generated.");

    return JSON.parse(text) as TailoredContent;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
