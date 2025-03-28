import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Users, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About ResumeAI</h1>
        <p className="text-xl text-muted-foreground">
          We're on a mission to help job seekers create professional, standout resumes and cover letters with the power
          of AI.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 mb-16">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>Empowering job seekers with AI</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p>
              We believe that everyone deserves access to tools that help them present their best professional self. Our
              AI-powered platform makes it easy to create polished, professional documents that get results.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Our Team</CardTitle>
            <CardDescription>Experts in AI and career development</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p>
              Our team combines expertise in artificial intelligence, career coaching, and human resources to create a
              platform that understands what employers are looking for and helps you meet those expectations.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Our Approach</CardTitle>
            <CardDescription>Data-driven and user-focused</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p>
              We continuously analyze hiring trends and feedback from recruiters to ensure our AI generates content that
              aligns with current industry standards and expectations.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Enter Your Information</h3>
              <p className="text-muted-foreground">
                Fill in your personal details, work experience, education, and skills in our user-friendly form.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Generation</h3>
              <p className="text-muted-foreground">
                Our advanced AI analyzes your information and generates professional content tailored to your target
                role.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Customize and Download</h3>
              <p className="text-muted-foreground">
                Review the generated content, make any desired adjustments, and download your professional document in
                multiple formats.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted p-8 rounded-lg max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Create Your Professional Resume?</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Join thousands of job seekers who have successfully landed interviews with resumes created using our platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/create/resume">Create Resume</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/create/cover-letter">Create Cover Letter</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

