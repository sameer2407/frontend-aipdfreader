import {
  Github,
  Linkedin,
  Twitter,
  Code2,
  Sparkles,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="max-w-3xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block p-2 px-4 rounded-full bg-blue-500/10 text-blue-500 mb-3 sm:mb-4">
            <span className="text-sm font-medium">Full Stack Developer</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Sameer Jadaun
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-2">
            Building the future of AI-powered applications with modern web
            technologies
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2">
          {/* Left Column - About */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-500/20">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                About Me
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p className="text-sm sm:text-base">
                  Hi there! I'm Sameer, a full-stack developer with a passion
                  for creating innovative solutions that combine cutting-edge AI
                  technology with modern web development practices.
                </p>

                <p className="text-sm sm:text-base mt-2">
                  I'm currently focused on building AI-powered applications that
                  make complex tasks simpler and more accessible. This AI PDF
                  Reader is one of my projects that demonstrates how AI can be
                  used to enhance document interaction and understanding.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-500/20">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                What I Do
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p className="text-sm sm:text-base">
                  When I'm not coding, I'm exploring new technologies,
                  contributing to open-source projects, and sharing my knowledge
                  with the developer community.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Social Links */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-pink-500/20">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
                <Rocket className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500" />
                Connect With Me
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <Button
                  className="w-full h-11 sm:h-12 bg-gradient-to-r from-[#24292e] to-[#24292e] hover:from-[#2d333b] hover:to-[#2d333b] text-white text-sm sm:text-base"
                  asChild
                >
                  <a
                    href="https://github.com/sameer2407"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    <span>Follow on GitHub</span>
                  </a>
                </Button>

                <Button
                  className="w-full h-11 sm:h-12 bg-gradient-to-r from-[#0077b5] to-[#0077b5] hover:from-[#006699] hover:to-[#006699] text-white text-sm sm:text-base"
                  asChild
                >
                  <a
                    href="https://www.linkedin.com/in/sameer-jadaun-13379a241/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </Button>

                <Button
                  className="w-full h-11 sm:h-12 bg-gradient-to-r from-[#1DA1F2] to-[#1DA1F2] hover:from-[#1a8cd8] hover:to-[#1a8cd8] text-white text-sm sm:text-base"
                  asChild
                >
                  <a
                    href="https://x.com/Sameer_2407"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    <span>Follow on Twitter</span>
                  </a>
                </Button>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-orange-500/20">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Node.js",
                  "AI/ML",
                  "Python",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-white/10 border border-white/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
