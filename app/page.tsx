import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, PenLine, BarChart3, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-neon-green">
      <header className="border-b border-neon-pink py-4">
        <div className="container flex items-center justify-between">
          <h1 className="text-3xl font-black text-neon-pink glitch-text">
            ResumeAI<span className="text-neon-blue">_</span>
          </h1>
          <nav>
            <ul className="flex items-center gap-6">
              <li>
                <Link href="/" className="text-sm font-bold hover:text-neon-pink transition-colors">
                  HOME
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-sm font-bold hover:text-neon-pink transition-colors">
                  TEMPLATES
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm font-bold hover:text-neon-pink transition-colors">
                  ABOUT
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 border-b-4 border-neon-pink">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="inline-block bg-neon-pink text-black px-4 py-1 font-bold text-sm mb-2 rotate-1 shadow-brutal">
                  NEXT-GEN RESUME BUILDER
                </div>
                <h1 className="text-5xl md:text-6xl font-black leading-tight text-white">
                  CREATE <span className="text-neon-blue">CYBER</span>-POWERED RESUMES & COVER LETTERS
                </h1>
                <p className="text-xl text-neon-green max-w-[600px]">
                  Our AI-powered platform helps you craft standout documents with ATS-optimization to get past the bots
                  and into human hands.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/create/resume">
                    <Button
                      size="lg"
                      className="bg-neon-pink hover:bg-neon-pink/80 text-black font-bold border-4 border-black shadow-brutal w-full sm:w-auto"
                    >
                      <FileText className="h-5 w-5 mr-2" />
                      CREATE RESUME
                    </Button>
                  </Link>
                  <Link href="/create/cover-letter">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-4 border-neon-blue text-neon-blue hover:bg-neon-blue/20 font-bold shadow-brutal w-full sm:w-auto"
                    >
                      <PenLine className="h-5 w-5 mr-2" />
                      CREATE COVER LETTER
                    </Button>
                  </Link>
                  <Link href="/ats-score">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-4 border-neon-green text-neon-green hover:bg-neon-green/20 font-bold shadow-brutal w-full sm:w-auto"
                    >
                      <BarChart3 className="h-5 w-5 mr-2" />
                      ATS SCORE
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
                <div className="relative bg-black border-4 border-neon-pink p-6 shadow-brutal rotate-2">
                  <div className="absolute top-0 right-0 bg-neon-pink text-black px-3 py-1 font-bold text-sm -mt-3 -mr-3 rotate-3 shadow-brutal">
                    PREVIEW
                  </div>
                  <div className="space-y-4">
                    <div className="h-8 bg-neon-blue/20 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-neon-green/20 rounded w-full"></div>
                    <div className="h-4 bg-neon-green/20 rounded w-5/6"></div>
                    <div className="h-4 bg-neon-green/20 rounded w-full"></div>
                    <div className="h-8 bg-neon-pink/20 rounded w-1/2 mt-6"></div>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <div className="h-6 bg-neon-blue/20 rounded"></div>
                      <div className="h-6 bg-neon-blue/20 rounded"></div>
                      <div className="h-6 bg-neon-blue/20 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4 text-white">
                FEATURES<span className="text-neon-pink">_</span>
              </h2>
              <p className="text-xl text-neon-green max-w-[800px] mx-auto">
                Our platform combines cutting-edge AI with cyberpunk aesthetics to create resumes that stand out and get
                results.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-black border-4 border-neon-blue p-6 shadow-brutal -rotate-1 hover:rotate-0 transition-transform">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neon-blue/20 mb-4">
                  <Zap className="h-8 w-8 text-neon-blue" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">AI-POWERED CONTENT</h3>
                <p className="text-neon-green">
                  Our AI generates professional content tailored to your experience and target role, optimized for ATS
                  systems.
                </p>
              </div>

              <div className="bg-black border-4 border-neon-pink p-6 shadow-brutal rotate-1 hover:rotate-0 transition-transform">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neon-pink/20 mb-4">
                  <BarChart3 className="h-8 w-8 text-neon-pink" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">ATS SCORING</h3>
                <p className="text-neon-green">
                  Get instant feedback on how well your resume will perform against Applicant Tracking Systems with
                  actionable tips.
                </p>
              </div>

              <div className="bg-black border-4 border-neon-green p-6 shadow-brutal -rotate-1 hover:rotate-0 transition-transform">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neon-green/20 mb-4">
                  <FileText className="h-8 w-8 text-neon-green" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">CYBERPUNK TEMPLATES</h3>
                <p className="text-neon-green">
                  Choose from our collection of neobrutalist and cyberpunk-inspired templates that make your resume
                  visually striking.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-grid-pattern bg-opacity-10">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto bg-black border-4 border-neon-blue p-8 shadow-brutal">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-white">
                  ATS OPTIMIZATION<span className="text-neon-pink">_</span>
                </h2>
                <p className="text-neon-green mt-2">Beat the bots with our advanced ATS scoring system</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 flex items-center justify-center bg-neon-pink text-black font-bold rounded-full border-4 border-black shadow-brutal">
                    01
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">UPLOAD YOUR RESUME</h3>
                    <p className="text-neon-green">Upload your existing resume or create a new one with our builder.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 flex items-center justify-center bg-neon-blue text-black font-bold rounded-full border-4 border-black shadow-brutal">
                    02
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">AI ANALYSIS</h3>
                    <p className="text-neon-green">
                      Our AI analyzes your resume against ATS algorithms and industry standards.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 flex items-center justify-center bg-neon-green text-black font-bold rounded-full border-4 border-black shadow-brutal">
                    03
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">GET YOUR SCORE & TIPS</h3>
                    <p className="text-neon-green">
                      Receive a detailed score and actionable recommendations to improve your resume.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link href="/ats-score">
                  <Button
                    size="lg"
                    className="bg-neon-pink hover:bg-neon-pink/80 text-black font-bold border-4 border-black shadow-brutal"
                  >
                    <BarChart3 className="h-5 w-5 mr-2" />
                    CHECK YOUR ATS SCORE NOW
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4 text-white">
                TESTIMONIALS<span className="text-neon-blue">_</span>
              </h2>
              <p className="text-xl text-neon-green max-w-[800px] mx-auto">
                See what our users are saying about their experience with ResumeAI
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-black border-4 border-neon-pink p-6 shadow-brutal rotate-1">
                <div className="flex justify-between items-center mb-4">
                  <div className="font-bold text-white">ALEX_K</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Zap key={i} className="h-4 w-4 text-neon-pink" />
                    ))}
                  </div>
                </div>
                <p className="text-neon-green">
                  "The ATS scoring feature helped me optimize my resume and I got calls from 3 companies within a week!"
                </p>
              </div>

              <div className="bg-black border-4 border-neon-blue p-6 shadow-brutal -rotate-1">
                <div className="flex justify-between items-center mb-4">
                  <div className="font-bold text-white">SARAH_M</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Zap key={i} className="h-4 w-4 text-neon-blue" />
                    ))}
                  </div>
                </div>
                <p className="text-neon-green">
                  "The cyberpunk templates made my resume stand out while still being professional. Landed my dream tech
                  job!"
                </p>
              </div>

              <div className="bg-black border-4 border-neon-green p-6 shadow-brutal rotate-1">
                <div className="flex justify-between items-center mb-4">
                  <div className="font-bold text-white">JAMES_T</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Zap key={i} className="h-4 w-4 text-neon-green" />
                    ))}
                  </div>
                </div>
                <p className="text-neon-green">
                  "The AI-generated content was spot-on for my industry. Saved me hours of writing and improved my
                  resume quality."
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 border-t-4 border-neon-pink">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto bg-black border-4 border-neon-blue p-8 shadow-brutal text-center">
              <h2 className="text-3xl font-black text-white mb-4">READY TO UPGRADE YOUR CAREER?</h2>
              <p className="text-xl text-neon-green mb-8">
                Create a resume that stands out visually and beats the ATS algorithms
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/create/resume">
                  <Button
                    size="lg"
                    className="bg-neon-pink hover:bg-neon-pink/80 text-black font-bold border-4 border-black shadow-brutal w-full sm:w-auto"
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    CREATE RESUME
                  </Button>
                </Link>
                <Link href="/create/cover-letter">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-4 border-neon-blue text-neon-blue hover:bg-neon-blue/20 font-bold shadow-brutal w-full sm:w-auto"
                  >
                    <PenLine className="h-5 w-5 mr-2" />
                    CREATE COVER LETTER
                  </Button>
                </Link>
                <Link href="/ats-score">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-4 border-neon-green text-neon-green hover:bg-neon-green/20 font-bold shadow-brutal w-full sm:w-auto"
                  >
                    <BarChart3 className="h-5 w-5 mr-2" />
                    ATS SCORE
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-4 border-neon-blue py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-black text-neon-pink mb-2">
              ResumeAI<span className="text-neon-blue">_</span>
            </h2>
            <p className="text-sm text-neon-green">© {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
          </div>
          <nav>
            <ul className="flex items-center gap-6">
              <li>
                <Link href="/terms" className="text-sm font-bold hover:text-neon-pink transition-colors">
                  TERMS
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm font-bold hover:text-neon-pink transition-colors">
                  PRIVACY
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm font-bold hover:text-neon-pink transition-colors">
                  CONTACT
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  )
}

