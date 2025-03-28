"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Download } from "lucide-react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

interface CoverLetterData {
  fullName: string
  email: string
  phone: string
  address: string
  companyName: string
  jobTitle: string
  recipientName?: string
  recipientTitle?: string
  companyAddress?: string
  relevantSkills: string
  coverLetterContent: string
}

export default function CoverLetterPreview() {
  const router = useRouter()
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    // Format current date
    const date = new Date()
    setCurrentDate(date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }))

    // Get cover letter data from localStorage
    const storedData = localStorage.getItem("coverLetterData")
    if (storedData) {
      setCoverLetterData(JSON.parse(storedData))
    } else {
      // Redirect back to form if no data is found
      router.push("/create/cover-letter")
    }
  }, [router])

  const downloadPDF = async () => {
    if (!coverLetterData) return

    setIsLoading(true)
    const coverLetterElement = document.getElementById("cover-letter-preview")

    try {
      if (coverLetterElement) {
        const canvas = await html2canvas(coverLetterElement, {
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
        pdf.save(`${coverLetterData.fullName.replace(/\s+/g, "_")}_Cover_Letter.pdf`)
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!coverLetterData) {
    return (
      <div className="container py-8 flex items-center justify-center min-h-[60vh]">
        <p>Loading cover letter data...</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link
            href="/create/cover-letter"
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Editor
          </Link>
          <h1 className="mt-4 text-3xl font-bold">Cover Letter Preview</h1>
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
        <Card className="w-full max-w-[800px] p-8 shadow-lg" id="cover-letter-preview">
          <div className="mb-8">
            <div className="text-right mb-8">
              <p>{currentDate}</p>
            </div>

            <div className="mb-8">
              <p className="font-bold">{coverLetterData.fullName}</p>
              <p>{coverLetterData.address}</p>
              <p>{coverLetterData.phone}</p>
              <p>{coverLetterData.email}</p>
            </div>

            {(coverLetterData.recipientName || coverLetterData.companyName) && (
              <div className="mb-8">
                {coverLetterData.recipientName && <p>{coverLetterData.recipientName}</p>}
                {coverLetterData.recipientTitle && <p>{coverLetterData.recipientTitle}</p>}
                <p>{coverLetterData.companyName}</p>
                {coverLetterData.companyAddress && <p>{coverLetterData.companyAddress}</p>}
              </div>
            )}

            <div className="mb-4">
              <p>Dear {coverLetterData.recipientName || "Hiring Manager"},</p>
            </div>
          </div>

          <div className="whitespace-pre-line">{coverLetterData.coverLetterContent}</div>

          <div className="mt-8">
            <p>Sincerely,</p>
            <p className="mt-6 font-bold">{coverLetterData.fullName}</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

