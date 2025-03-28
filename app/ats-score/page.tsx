"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, FileUp, Loader2, Upload, CheckCircle, AlertCircle } from "lucide-react"
import { analyzeResume } from "@/lib/ai-helpers"

const formSchema = z.object({
  jobTitle: z.string().min(2, { message: "Job title is required" }),
  jobDescription: z.string().min(10, { message: "Please provide a job description" }),
  resumeText: z.string().min(50, { message: "Please paste your resume content or upload a file" }),
})

export default function ATSScorePage() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<{
    score: number
    feedback: string
    keywordMatch: number
    formatScore: number
    contentScore: number
    improvements: string[]
    strengths: string[]
  } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      jobDescription: "",
      resumeText: "",
    },
  })

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const selectedFile = files[0]
      setFile(selectedFile)

      // Simple text extraction (in a real app, use a proper PDF/DOCX parser)
      if (selectedFile.type === "text/plain") {
        const text = await selectedFile.text()
        form.setValue("resumeText", text)
      } else {
        // For demo purposes, we'll just show a message
        form.setValue(
          "resumeText",
          `[Content extracted from ${selectedFile.name}]
        
Professional Experience:
- Senior Software Engineer at TechCorp (2018-Present)
- Software Developer at InnoSystems (2015-2018)
- Junior Developer at StartupXYZ (2013-2015)

Education:
- Bachelor of Science in Computer Science, University of Technology (2013)

Skills:
- Programming Languages: JavaScript, TypeScript, Python, Java
- Frameworks: React, Node.js, Express, Django
- Tools: Git, Docker, AWS, CI/CD
- Soft Skills: Team Leadership, Project Management, Communication
        `,
        )
      }
    }
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsAnalyzing(true)
    try {
      const analysisResult = await analyzeResume({
        jobTitle: data.jobTitle,
        jobDescription: data.jobDescription,
        resumeText: data.resumeText,
      })

      setResult(analysisResult)
    } catch (error) {
      console.error("Error analyzing resume:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="container py-8 bg-black text-neon-green min-h-screen">
      <div className="mb-8">
        <Link
          href="/"
          className="flex items-center text-sm font-bold text-neon-blue hover:text-neon-pink transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          BACK TO HOME
        </Link>
        <h1 className="mt-4 text-4xl font-black text-white">
          ATS SCORE<span className="text-neon-pink">_</span>
        </h1>
        <p className="text-neon-green">Check how your resume performs against Applicant Tracking Systems</p>
      </div>

      {!result ? (
        <Card className="border-4 border-neon-blue shadow-brutal bg-black">
          <CardHeader className="border-b border-neon-blue">
            <CardTitle className="text-2xl font-black text-white">RESUME ANALYZER</CardTitle>
            <CardDescription className="text-neon-green">
              Upload your resume and provide job details to get an ATS compatibility score
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-bold">JOB TITLE</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Software Engineer"
                            {...field}
                            className="border-2 border-neon-pink bg-black text-white placeholder:text-gray-500 focus:border-neon-blue"
                          />
                        </FormControl>
                        <FormMessage className="text-neon-pink" />
                      </FormItem>
                    )}
                  />

                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="jobDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-bold">JOB DESCRIPTION</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Paste the job description here..."
                              {...field}
                              className="min-h-[100px] border-2 border-neon-pink bg-black text-white placeholder:text-gray-500 focus:border-neon-blue"
                            />
                          </FormControl>
                          <FormDescription className="text-neon-blue">
                            The more detailed the job description, the more accurate your ATS score will be.
                          </FormDescription>
                          <FormMessage className="text-neon-pink" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <div className="mb-4">
                      <h3 className="text-white font-bold mb-2">UPLOAD RESUME</h3>
                      <div className="border-2 border-dashed border-neon-green p-6 rounded-md text-center cursor-pointer hover:bg-neon-green/5 transition-colors">
                        <input
                          type="file"
                          id="resume-upload"
                          accept=".txt,.pdf,.docx,.doc"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
                          <FileUp className="h-10 w-10 text-neon-green mb-2" />
                          <span className="text-white font-bold">
                            {file ? file.name : "DRAG & DROP OR CLICK TO UPLOAD"}
                          </span>
                          <span className="text-neon-green text-sm mt-1">
                            {file ? `${(file.size / 1024).toFixed(2)} KB` : "Supports PDF, DOCX, TXT"}
                          </span>
                        </label>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="resumeText"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-bold">OR PASTE RESUME TEXT</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Paste your resume content here..."
                              {...field}
                              className="min-h-[200px] border-2 border-neon-pink bg-black text-white placeholder:text-gray-500 focus:border-neon-blue"
                            />
                          </FormControl>
                          <FormMessage className="text-neon-pink" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isAnalyzing}
                  className="w-full bg-neon-pink hover:bg-neon-pink/80 text-black font-bold border-4 border-black shadow-brutal"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      ANALYZING...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-5 w-5" />
                      ANALYZE RESUME
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          <Card className="border-4 border-neon-blue shadow-brutal bg-black overflow-hidden">
            <CardHeader className="border-b border-neon-blue">
              <CardTitle className="text-2xl font-black text-white">ATS SCORE RESULTS</CardTitle>
              <CardDescription className="text-neon-green">
                Analysis for {form.getValues("jobTitle")} position
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white font-bold">OVERALL ATS SCORE</h3>
                  <span className="text-2xl font-black text-neon-pink">{result.score}/100</span>
                </div>
                <Progress
                  value={result.score}
                  className="h-4 bg-gray-800 border border-neon-blue"
                  indicatorClassName={`${
                    result.score >= 80 ? "bg-neon-green" : result.score >= 60 ? "bg-neon-blue" : "bg-neon-pink"
                  }`}
                />
                <div className="mt-2 text-sm text-neon-green">
                  {result.score >= 80
                    ? "Excellent! Your resume is well-optimized for ATS systems."
                    : result.score >= 60
                      ? "Good. Your resume is moderately optimized but has room for improvement."
                      : "Needs improvement. Your resume may struggle to pass ATS filters."}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-black border-2 border-neon-blue p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white font-bold">KEYWORD MATCH</h4>
                    <span className="text-xl font-black text-neon-blue">{result.keywordMatch}%</span>
                  </div>
                  <Progress
                    value={result.keywordMatch}
                    className="h-2 bg-gray-800 border border-neon-blue"
                    indicatorClassName="bg-neon-blue"
                  />
                </div>

                <div className="bg-black border-2 border-neon-pink p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white font-bold">FORMAT SCORE</h4>
                    <span className="text-xl font-black text-neon-pink">{result.formatScore}%</span>
                  </div>
                  <Progress
                    value={result.formatScore}
                    className="h-2 bg-gray-800 border border-neon-pink"
                    indicatorClassName="bg-neon-pink"
                  />
                </div>

                <div className="bg-black border-2 border-neon-green p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white font-bold">CONTENT SCORE</h4>
                    <span className="text-xl font-black text-neon-green">{result.contentScore}%</span>
                  </div>
                  <Progress
                    value={result.contentScore}
                    className="h-2 bg-gray-800 border border-neon-green"
                    indicatorClassName="bg-neon-green"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">FEEDBACK SUMMARY</h3>
                  <p className="text-neon-green border-l-4 border-neon-blue pl-4 py-2">{result.feedback}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 text-neon-green mr-2" />
                      STRENGTHS
                    </h3>
                    <ul className="space-y-2">
                      {result.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-neon-green mr-2">✓</span>
                          <span className="text-white">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <AlertCircle className="h-5 w-5 text-neon-pink mr-2" />
                      IMPROVEMENTS
                    </h3>
                    <ul className="space-y-2">
                      {result.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-neon-pink mr-2">!</span>
                          <span className="text-white">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-neon-blue flex justify-between">
              <Button
                variant="outline"
                onClick={() => setResult(null)}
                className="border-2 border-neon-blue text-neon-blue hover:bg-neon-blue/20 font-bold"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                BACK TO ANALYZER
              </Button>

              <Link href="/create/resume">
                <Button className="bg-neon-pink hover:bg-neon-pink/80 text-black font-bold border-2 border-black shadow-brutal">
                  IMPROVE YOUR RESUME
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <div className="bg-black border-4 border-neon-green p-6 shadow-brutal">
            <h3 className="text-xl font-bold text-white mb-4">NEXT STEPS</h3>
            <p className="text-neon-green mb-4">
              Based on your ATS score, here are some recommended actions to improve your resume:
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 flex items-center justify-center bg-neon-pink text-black font-bold rounded-full border-2 border-black">
                  1
                </div>
                <div>
                  <h4 className="text-white font-bold">USE OUR RESUME BUILDER</h4>
                  <p className="text-neon-green">Create an ATS-optimized resume with our cyberpunk-themed templates.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-8 w-8 flex items-center justify-center bg-neon-blue text-black font-bold rounded-full border-2 border-black">
                  2
                </div>
                <div>
                  <h4 className="text-white font-bold">INCORPORATE KEYWORDS</h4>
                  <p className="text-neon-green">
                    Add relevant keywords from the job description to increase your match score.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-8 w-8 flex items-center justify-center bg-neon-green text-black font-bold rounded-full border-2 border-black">
                  3
                </div>
                <div>
                  <h4 className="text-white font-bold">REANALYZE</h4>
                  <p className="text-neon-green">
                    After making improvements, run the analysis again to see your improved score.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

