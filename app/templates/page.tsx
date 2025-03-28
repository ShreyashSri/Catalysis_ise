import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default function TemplatesPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Resume & Cover Letter Templates</h1>
        <p className="text-muted-foreground">Choose from our professionally designed templates</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="overflow-hidden">
          <div className="aspect-[3/4] bg-muted relative">
            <img
              src="/placeholder.svg?height=400&width=300"
              alt="Professional template preview"
              className="object-cover w-full h-full"
            />
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded-full">
              Popular
            </div>
          </div>
          <CardHeader>
            <CardTitle>Professional</CardTitle>
            <CardDescription>A clean, traditional template suitable for most industries</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/create/resume">Use Template</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <div className="aspect-[3/4] bg-muted">
            <img
              src="/placeholder.svg?height=400&width=300"
              alt="Modern template preview"
              className="object-cover w-full h-full"
            />
          </div>
          <CardHeader>
            <CardTitle>Modern</CardTitle>
            <CardDescription>A contemporary design with a creative touch</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/create/resume">Use Template</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <div className="aspect-[3/4] bg-muted">
            <img
              src="/placeholder.svg?height=400&width=300"
              alt="Executive template preview"
              className="object-cover w-full h-full"
            />
          </div>
          <CardHeader>
            <CardTitle>Executive</CardTitle>
            <CardDescription>An elegant design for senior professionals</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/create/resume">Use Template</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <div className="aspect-[3/4] bg-muted">
            <img
              src="/placeholder.svg?height=400&width=300"
              alt="Creative template preview"
              className="object-cover w-full h-full"
            />
          </div>
          <CardHeader>
            <CardTitle>Creative</CardTitle>
            <CardDescription>A bold design for creative industries</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/create/resume">Use Template</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <div className="aspect-[3/4] bg-muted">
            <img
              src="/placeholder.svg?height=400&width=300"
              alt="Minimalist template preview"
              className="object-cover w-full h-full"
            />
          </div>
          <CardHeader>
            <CardTitle>Minimalist</CardTitle>
            <CardDescription>A simple, clean design that focuses on content</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/create/resume">Use Template</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <div className="aspect-[3/4] bg-muted relative">
            <img
              src="/placeholder.svg?height=400&width=300"
              alt="Technical template preview"
              className="object-cover w-full h-full"
            />
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded-full">
              New
            </div>
          </div>
          <CardHeader>
            <CardTitle>Technical</CardTitle>
            <CardDescription>Optimized for technical roles and highlighting skills</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/create/resume">Use Template</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Cover Letter Templates</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="overflow-hidden">
            <div className="aspect-[3/4] bg-muted">
              <img
                src="/placeholder.svg?height=400&width=300"
                alt="Standard cover letter template preview"
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <CardTitle>Standard</CardTitle>
              <CardDescription>A professional cover letter format</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/create/cover-letter">Use Template</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-[3/4] bg-muted">
              <img
                src="/placeholder.svg?height=400&width=300"
                alt="Contemporary cover letter template preview"
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <CardTitle>Contemporary</CardTitle>
              <CardDescription>A modern approach to the traditional cover letter</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/create/cover-letter">Use Template</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-[3/4] bg-muted">
              <img
                src="/placeholder.svg?height=400&width=300"
                alt="Simple cover letter template preview"
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <CardTitle>Simple</CardTitle>
              <CardDescription>A clean, straightforward cover letter design</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/create/cover-letter">Use Template</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Need a Custom Template?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our premium subscription includes access to additional templates and customization options.
        </p>
        <Button asChild>
          <Link href="/pricing" className="gap-2">
            View Premium Options <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

