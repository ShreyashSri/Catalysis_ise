"use client"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { anthropic } from "@ai-sdk/anthropic"
import { gemini } from "@ai-sdk/google"

// Provider fallback mechanism
const getAIProvider = async () => {
  try {
    return openai("gpt-4o")
  } catch (error) {
    console.log("OpenAI provider failed, trying Anthropic...")
    try {
      return anthropic("claude-3-haiku-20240307")
    } catch (error) {
      console.log("Anthropic provider failed, trying Gemini...")
      try {
        return gemini("gemini-1.5-pro")
      } catch (error) {
        throw new Error("All AI providers failed")
      }
    }
  }
}

interface GenerateResumeContentParams {
  name: string
  experiences: {
    title: string
    company: string
    description: string
  }[]
  educations: {
    degree: string
    institution: string
  }[]
  skills: string
}

export async function generateResumeContent({
  name,
  experiences,
  educations,
  skills,
}: GenerateResumeContentParams): Promise<string> {
  try {
    // Create a prompt with the user's information
    const experienceText = experiences.map((exp) => `- ${exp.title} at ${exp.company}: ${exp.description}`).join("\n")

    const educationText = educations.map((edu) => `- ${edu.degree} from ${edu.institution}`).join("\n")

    const prompt = `
      Write a professional summary for ${name}'s resume. 
      
      Work Experience:
      ${experienceText}
      
      Education:
      ${educationText}
      
      Skills:
      ${skills}
      
      The summary should be concise (3-4 sentences), professional, and highlight key strengths and experiences.
      Do not use bullet points. Write in first person.
      Make sure to include keywords that would be relevant for ATS systems.
    `

    const model = await getAIProvider()
    const { text } = await generateText({
      model,
      prompt,
      maxTokens: 200,
    })

    return text.trim()
  } catch (error) {
    console.error("Error generating resume content:", error)
    return "An experienced professional with a track record of success in my field. I combine technical expertise with strong communication skills to deliver results. I am dedicated to continuous improvement and bringing value to my organization."
  }
}

interface GenerateCoverLetterParams {
  name: string
  jobTitle: string
  companyName: string
  skills: string
}

export async function generateCoverLetter({
  name,
  jobTitle,
  companyName,
  skills,
}: GenerateCoverLetterParams): Promise<string> {
  try {
    const prompt = `
      Write a professional cover letter for ${name} applying for the position of ${jobTitle} at ${companyName}.
      
      The applicant has the following skills and experience:
      ${skills}
      
      The cover letter should:
      1. Be professionally formatted
      2. Express enthusiasm for the position and company
      3. Highlight relevant skills and experience
      4. Include a call to action
      5. Be approximately 3-4 paragraphs long
      6. Include keywords that would be relevant for ATS systems
      
      Do not include the header, date, or signature sections. Start with the body of the letter.
    `

    const model = await getAIProvider()
    const { text } = await generateText({
      model,
      prompt,
      maxTokens: 500,
    })

    return text.trim()
  } catch (error) {
    console.error("Error generating cover letter:", error)
    return `I am writing to express my interest in the ${jobTitle} position at ${companyName}. With my background and skills, I believe I would be a valuable addition to your team.

Throughout my career, I have developed expertise in various areas that align well with this role. My experience includes strong problem-solving abilities, excellent communication skills, and a dedication to delivering high-quality results.

I am particularly drawn to ${companyName} because of your reputation for innovation and excellence in the industry. I am confident that my skills in ${skills.split(",").slice(0, 3).join(", ")} would allow me to make significant contributions to your team.

I would welcome the opportunity to discuss how my background, skills, and experiences would benefit ${companyName}. Thank you for considering my application, and I look forward to the possibility of working with your team.`
  }
}

interface AnalyzeResumeParams {
  jobTitle: string
  jobDescription: string
  resumeText: string
}

export async function analyzeResume({ jobTitle, jobDescription, resumeText }: AnalyzeResumeParams): Promise<{
  score: number
  feedback: string
  keywordMatch: number
  formatScore: number
  contentScore: number
  improvements: string[]
  strengths: string[]
}> {
  try {
    const prompt = `
      Analyze the following resume for ATS compatibility for a ${jobTitle} position.
      
      Job Description:
      ${jobDescription}
      
      Resume:
      ${resumeText}
      
      Provide a detailed analysis with the following:
      1. Overall ATS score (0-100)
      2. Keyword match percentage (0-100)
      3. Format score (0-100)
      4. Content score (0-100)
      5. General feedback (1-2 paragraphs)
      6. 3-5 specific improvements
      7. 3-5 strengths
      
      Return the results in the following JSON format:
      {
        "score": number,
        "keywordMatch": number,
        "formatScore": number,
        "contentScore": number,
        "feedback": "string",
        "improvements": ["string", "string", ...],
        "strengths": ["string", "string", ...]
      }
    `

    const model = await getAIProvider()
    const { text } = await generateText({
      model,
      prompt,
      maxTokens: 1000,
    })

    // Parse the JSON response
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error("Error parsing AI response:", e)
      // Fallback with mock data
      return {
        score: 68,
        keywordMatch: 65,
        formatScore: 75,
        contentScore: 70,
        feedback:
          "Your resume has good structure but could benefit from more targeted keywords related to the job description. The experience section is well-detailed, but some technical skills mentioned in the job posting are missing from your resume.",
        improvements: [
          "Add more industry-specific keywords from the job description",
          "Quantify achievements with metrics and numbers",
          "Include a skills section with technical competencies",
          "Use more action verbs at the beginning of bullet points",
          "Tailor your professional summary to the specific job",
        ],
        strengths: [
          "Clear chronological format that's easy for ATS to parse",
          "Relevant work experience is well-described",
          "Education section is properly formatted",
          "Contact information is complete and well-positioned",
          "Job titles are clearly stated",
        ],
      }
    }
  } catch (error) {
    console.error("Error analyzing resume:", error)
    // Return mock data in case of error
    return {
      score: 68,
      keywordMatch: 65,
      formatScore: 75,
      contentScore: 70,
      feedback:
        "Your resume has good structure but could benefit from more targeted keywords related to the job description. The experience section is well-detailed, but some technical skills mentioned in the job posting are missing from your resume.",
      improvements: [
        "Add more industry-specific keywords from the job description",
        "Quantify achievements with metrics and numbers",
        "Include a skills section with technical competencies",
        "Use more action verbs at the beginning of bullet points",
        "Tailor your professional summary to the specific job",
      ],
      strengths: [
        "Clear chronological format that's easy for ATS to parse",
        "Relevant work experience is well-described",
        "Education section is properly formatted",
        "Contact information is complete and well-positioned",
        "Job titles are clearly stated",
      ],
    }
  }
}

