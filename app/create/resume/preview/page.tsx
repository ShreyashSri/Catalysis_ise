"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Download, Mail, MapPin, Phone } from "lucide-react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

interface ResumeData {
  fullName: string
  email: string
  phone: string
  location: string
  summary: string
  experiences: {
    title: string
    company: string
    location: string
    startDate: string
    endDate: string
    description: string
  }[]
  educations: {
    degree: string
    institution: string
    location: string
    startDate: string
    endDate: string
    description: string
  }[]
  skills: string
}

export default function ResumePreview() {
  const router = useRouter()
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Get resume data from localStorage
    const storedData = localStorage.getItem("resumeData")
    if (storedData) {
      setResumeData(JSON.parse(storedData))
    } else {
      // Redirect back to form if no data is found
      router.push("/create/resume")
    }
  }, [router])

  const downloadPDF = async () => {
    if (!resumeData) return

    setIsLoading(true)
    const resumeElement = document.getElementById("resume-preview")

    try {
      if (resumeElement) {
        const canvas = await html2canvas(resumeElement, {
          scale: 2,
          logging: false,
          useCORS: true,
        })

        const imgData = canvas.toDataURL("image/png")
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        })

        const imgWidth = 210
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
        pdf.save(`${resumeData.fullName.replace(/\s+/g, "_")}_Resume.pdf`)
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!resumeData) {
    return (
      <div className="container py-8 flex items-center justify-center min-h-[60vh]">
        <p>Loading resume data...</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link
            href="/create/resume"
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Editor
          </Link>
          <h1 className="mt-4 text-3xl font-bold">Resume Preview</h1>
        </div>
        <Button onClick={downloadPDF} disabled={isLoading} className="gap-2">
          {isLoading ? (
            "Generating..."
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download PDF
            </>
          )}
        </Button>
      </div>

      <div className="flex justify-center">
        <Card className="w-full max-w-[800px] p-8 shadow-lg" id="resume-preview">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-center">{resumeData.fullName}</h1>
            <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm text-muted-foreground">
              {resumeData.email && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  {resumeData.email}
                </div>
              )}
              {resumeData.phone && (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  {resumeData.phone}
                </div>
              )}
              {resumeData.location && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {resumeData.location}
                </div>
              )}
            </div>
          </div>

          {resumeData.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold border-b pb-1 mb-2">Professional Summary</h2>
              <p className="text-sm">{resumeData.summary}</p>
            </div>
          )}

          {resumeData.experiences && resumeData.experiences.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold border-b pb-1 mb-2">Experience</h2>
              <div className="space-y-4">
                {resumeData.experiences.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{exp.title}</h3>
                        <p className="text-sm">
                          {exp.company}
                          {exp.location ? `, ${exp.location}` : ""}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </p>
                    </div>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resumeData.educations && resumeData.educations.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold border-b pb-1 mb-2">Education</h2>
              <div className="space-y-4">
                {resumeData.educations.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{edu.degree}</h3>
                        <p className="text-sm">
                          {edu.institution}
                          {edu.location ? `, ${edu.location}` : ""}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {edu.startDate} - {edu.endDate || "Present"}
                      </p>
                    </div>
                    {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {resumeData.skills && (
            <div>
              <h2 className="text-xl font-semibold border-b pb-1 mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {resumeData.skills.split(",").map((skill, index) => (
                  <span key={index} className="bg-muted px-2 py-1 rounded text-sm">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

