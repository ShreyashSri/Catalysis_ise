"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Loader2, Plus, Trash } from "lucide-react"
import { generateResumeContent } from "@/lib/ai-helpers"

const personalInfoSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  location: z.string().min(2, { message: "Please enter your location." }),
  summary: z
    .string()
    .min(10, { message: "Summary must be at least 10 characters." })
    .max(500, { message: "Summary must not exceed 500 characters." }),
})

const experienceSchema = z.object({
  experiences: z.array(
    z.object({
      title: z.string().min(2, { message: "Job title is required." }),
      company: z.string().min(2, { message: "Company name is required." }),
      location: z.string().optional(),
      startDate: z.string().min(2, { message: "Start date is required." }),
      endDate: z.string().optional(),
      description: z.string().min(10, { message: "Please provide a description of your responsibilities." }),
    }),
  ),
})

const educationSchema = z.object({
  educations: z.array(
    z.object({
      degree: z.string().min(2, { message: "Degree is required." }),
      institution: z.string().min(2, { message: "Institution name is required." }),
      location: z.string().optional(),
      startDate: z.string().min(2, { message: "Start date is required." }),
      endDate: z.string().optional(),
      description: z.string().optional(),
    }),
  ),
})

const skillsSchema = z.object({
  skills: z.string().min(2, { message: "Please enter at least one skill." }),
})

export default function CreateResume() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")
  const [isGenerating, setIsGenerating] = useState(false)

  const personalForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
  })

  const experienceForm = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      experiences: [
        {
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    },
  })

  const educationForm = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: [
        {
          degree: "",
          institution: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    },
  })

  const skillsForm = useForm<z.infer<typeof skillsSchema>>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: "",
    },
  })

  const addExperience = () => {
    const experiences = experienceForm.getValues("experiences")
    experienceForm.setValue("experiences", [
      ...experiences,
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ])
  }

  const removeExperience = (index: number) => {
    const experiences = experienceForm.getValues("experiences")
    experienceForm.setValue(
      "experiences",
      experiences.filter((_, i) => i !== index),
    )
  }

  const addEducation = () => {
    const educations = educationForm.getValues("educations")
    educationForm.setValue("educations", [
      ...educations,
      {
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ])
  }

  const removeEducation = (index: number) => {
    const educations = educationForm.getValues("educations")
    educationForm.setValue(
      "educations",
      educations.filter((_, i) => i !== index),
    )
  }

  const handleGenerateSummary = async () => {
    setIsGenerating(true)
    try {
      const name = personalForm.getValues("fullName")
      const experiences = experienceForm.getValues("experiences")
      const educations = educationForm.getValues("educations")
      const skills = skillsForm.getValues("skills")

      const generatedSummary = await generateResumeContent({
        name,
        experiences,
        educations,
        skills,
      })

      personalForm.setValue("summary", generatedSummary)
    } catch (error) {
      console.error("Error generating summary:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const onSubmit = () => {
    const personalData = personalForm.getValues()
    const experienceData = experienceForm.getValues()
    const educationData = educationForm.getValues()
    const skillsData = skillsForm.getValues()

    // Combine all data
    const resumeData = {
      ...personalData,
      ...experienceData,
      ...educationData,
      ...skillsData,
    }

    // Store in localStorage for preview page
    localStorage.setItem("resumeData", JSON.stringify(resumeData))

    // Navigate to preview page
    router.push("/create/resume/preview")
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="mt-4 text-3xl font-bold">Create Your Resume</h1>
        <p className="text-muted-foreground">Fill in your details to generate a professional resume</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Enter your basic contact information and professional summary.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...personalForm}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={personalForm.control}
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
                      control={personalForm.control}
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
                      control={personalForm.control}
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
                      control={personalForm.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="City, State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={personalForm.control}
                    name="summary"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Professional Summary</FormLabel>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleGenerateSummary}
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
                        <FormControl>
                          <Textarea
                            placeholder="A brief summary of your professional background and key strengths..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Write a concise overview of your professional background, skills, and career goals.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button onClick={() => setActiveTab("experience")}>Next: Experience</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="experience">
          <Card>
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>Add your relevant work experience, starting with the most recent.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...experienceForm}>
                <form className="space-y-6">
                  {experienceForm.watch("experiences").map((_, index) => (
                    <div key={index} className="space-y-4 rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Experience {index + 1}</h3>
                        {index > 0 && (
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeExperience(index)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField
                          control={experienceForm.control}
                          name={`experiences.${index}.title`}
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
                          control={experienceForm.control}
                          name={`experiences.${index}.company`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company</FormLabel>
                              <FormControl>
                                <Input placeholder="Acme Inc." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={experienceForm.control}
                          name={`experiences.${index}.location`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input placeholder="City, State" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <FormField
                            control={experienceForm.control}
                            name={`experiences.${index}.startDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YYYY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={experienceForm.control}
                            name={`experiences.${index}.endDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YYYY or Present" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <FormField
                        control={experienceForm.control}
                        name={`experiences.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe your responsibilities, achievements, and skills used..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addExperience} className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add Another Experience
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("personal")}>
                Previous
              </Button>
              <Button onClick={() => setActiveTab("education")}>Next: Education</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>Add your educational background, starting with the most recent.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...educationForm}>
                <form className="space-y-6">
                  {educationForm.watch("educations").map((_, index) => (
                    <div key={index} className="space-y-4 rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Education {index + 1}</h3>
                        {index > 0 && (
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeEducation(index)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField
                          control={educationForm.control}
                          name={`educations.${index}.degree`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Degree</FormLabel>
                              <FormControl>
                                <Input placeholder="Bachelor of Science in Computer Science" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={educationForm.control}
                          name={`educations.${index}.institution`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Institution</FormLabel>
                              <FormControl>
                                <Input placeholder="University of Example" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={educationForm.control}
                          name={`educations.${index}.location`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input placeholder="City, State" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <FormField
                            control={educationForm.control}
                            name={`educations.${index}.startDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YYYY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={educationForm.control}
                            name={`educations.${index}.endDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YYYY or Present" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <FormField
                        control={educationForm.control}
                        name={`educations.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Relevant coursework, achievements, GPA, etc."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addEducation} className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add Another Education
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("experience")}>
                Previous
              </Button>
              <Button onClick={() => setActiveTab("skills")}>Next: Skills</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>List your relevant skills and competencies.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...skillsForm}>
                <form className="space-y-6">
                  <FormField
                    control={skillsForm.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skills</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="JavaScript, React, Node.js, Project Management, Communication, Leadership..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter your skills separated by commas. Include both technical and soft skills relevant to your
                          target position.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("education")}>
                Previous
              </Button>
              <Button onClick={onSubmit}>Preview Resume</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

