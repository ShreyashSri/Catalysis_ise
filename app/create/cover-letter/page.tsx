"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Loader2 } from "lucide-react"
import { generateCoverLetter } from "@/lib/ai-helpers"

const coverLetterSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  address: z.string().min(2, { message: "Please enter your address." }),
  companyName: z.string().min(2, { message: "Company name is required." }),
  jobTitle: z.string().min(2, { message: "Job title is required." }),
  recipientName: z.string().optional(),
  recipientTitle: z.string().optional(),
  companyAddress: z.string().optional(),
  relevantSkills: z.string().min(10, { message: "Please enter some relevant skills or experience." }),
  coverLetterContent: z.string().min(10, { message: "Cover letter content is required." }),
})

export default function CreateCoverLetter() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)

  const form = useForm<z.infer<typeof coverLetterSchema>>({
    resolver: zodResolver(coverLetterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      companyName: "",
      jobTitle: "",
      recipientName: "",
      recipientTitle: "",
      companyAddress: "",
      relevantSkills: "",
      coverLetterContent: "",
    },
  })

  const handleGenerateCoverLetter = async () => {
    const formData = form.getValues()

    // Check if essential fields are filled
    if (!formData.fullName || !formData.jobTitle || !formData.companyName || !formData.relevantSkills) {
      form.setError("relevantSkills", {
        type: "manual",
        message: "Please fill in your name, job title, company name, and relevant skills before generating",
      })
      return
    }

    setIsGenerating(true)
    try {
      const generatedContent = await generateCoverLetter({
        name: formData.fullName,
        jobTitle: formData.jobTitle,
        companyName: formData.companyName,
        skills: formData.relevantSkills,
      })

      form.setValue("coverLetterContent", generatedContent)
    } catch (error) {
      console.error("Error generating cover letter:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const onSubmit = (data: z.infer<typeof coverLetterSchema>) => {
    // Store in localStorage for preview page
    localStorage.setItem("coverLetterData", JSON.stringify(data))

    // Navigate to preview page
    router.push("/create/cover-letter/preview")
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="mt-4 text-3xl font-bold">Create Your Cover Letter</h1>
        <p className="text-muted-foreground">Fill in your details to generate a professional cover letter</p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Cover Letter Information</CardTitle>
          <CardDescription>Enter the details for your cover letter</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Your Information</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St, City, State, ZIP" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Job Information</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Software Engineer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recipient Name (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recipient Title (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Hiring Manager" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companyAddress"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Company Address (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="456 Business Ave, City, State, ZIP" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="relevantSkills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relevant Skills & Experience</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your relevant skills, experience, and qualifications for this position..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Include skills, experience, and achievements relevant to the position you're applying for.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <FormLabel className="text-base">Cover Letter Content</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateCoverLetter}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>Generate with AI</>
                    )}
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name="coverLetterContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Your cover letter content..." className="min-h-[300px]" {...field} />
                      </FormControl>
                      <FormDescription>
                        Write or generate your cover letter. You can edit the generated content to personalize it.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Preview Cover Letter
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

