'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { placeholderImages } from "@/lib/placeholder-images";
import { projects } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-background py-24">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-headline">Selected Work</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              A showcase of projects where strategy meets craft. Each one was a unique challenge focused on user outcome and brand impact.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const projectImage = placeholderImages.find(p => p.id === project.thumbnailId);
              return (
                <Link key={project.id} href={`/projects/${project.id}`} className="block h-full group">
                  <Card className="flex flex-col h-full bg-card border-border/50 hover:border-primary/50 transition-all duration-300 shadow-xl overflow-hidden">
                    <CardHeader className="p-0">
                      {projectImage && (
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <Image
                              src={projectImage.imageUrl}
                              alt={project.title}
                              fill
                              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                              data-ai-hint={projectImage.imageHint}
                          />
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="flex-1 p-6 space-y-4">
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <p className="text-foreground/70 text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 flex flex-col items-start gap-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-background/50 text-foreground/60 border-none font-medium text-[10px] uppercase tracking-wider">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center text-xs font-bold uppercase tracking-widest text-primary pt-2">
                        Case Study <ArrowUpRight className="h-3 w-3 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
