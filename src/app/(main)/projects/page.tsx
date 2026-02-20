import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { placeholderImages } from "@/lib/placeholder-images";
import { projects } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export default function ProjectsPage() {
  return (
    <div className="container py-24 md:py-32">
      <div className="space-y-16">
        <Reveal className="space-y-6">
          <p className="text-primary font-black tracking-[0.5em] uppercase text-[10px]">Gallery</p>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">My Work.</h1>
          <p className="text-xl text-foreground/50 max-w-2xl font-light leading-relaxed">
            A curated selection of design solutions ranging from mobile ecosystems to luxury brand identities.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, index) => {
            const projectImage = placeholderImages.find(p => p.id === project.thumbnailId);
            return (
              <Reveal key={project.id} delay={index * 100} className="h-full">
                <Link href={`/projects/${project.id}`} className="block h-full group">
                  <Card className="flex flex-col h-full bg-card border-white/5 hover:border-primary/40 transition-all duration-500 rounded-none overflow-hidden shadow-2xl">
                    <CardHeader className="p-0">
                      {projectImage && (
                        <div className="aspect-video relative overflow-hidden">
                          <Image
                              src={projectImage.imageUrl}
                              alt={project.title}
                              fill
                              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                              data-ai-hint={projectImage.imageHint}
                          />
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="flex-1 p-8 space-y-4">
                      <CardTitle className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <p className="text-foreground/60 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </CardContent>
                    <CardFooter className="p-8 pt-0 flex flex-col items-start gap-6">
                      <div className="flex flex-wrap gap-3">
                        {project.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-[9px] uppercase tracking-widest font-black border-white/10 text-foreground/40 px-3 py-1 rounded-none">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-primary group-hover:translate-x-2 transition-transform">
                        Explore Case Study <ArrowUpRight className="h-3 w-3 ml-2" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </div>
  );
}
