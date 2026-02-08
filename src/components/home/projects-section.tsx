'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { placeholderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "project-1",
    title: "Rapido UI/UX Redesign",
    description: "A complete UI/UX overhaul for the popular bike taxi app, focusing on a modern and user-friendly experience.",
    tags: ["UI/UX Design", "Mobile App", "Figma"],
    link: "#",
  },
  {
    id: "project-2",
    title: "LOSMO Logo Design",
    description: "A refined emblem of luxury for a perfume brand, crafted to express elegance, artistry, and timeless sophistication.",
    tags: ["Logo Design", "Branding", "Luxury"],
    link: "#",
  },
  {
    id: "project-3",
    title: "Project Gamma",
    description: "Logo redesign.",
    tags: ["Logo Design", "Branding"],
    link: "#",
  },
    {
    id: "project-4",
    title: "Project Delta",
    description: "A data visualization dashboard for tracking real-time analytics and KPIs.",
    tags: ["D3.js", "React", "Node.js"],
    link: "#",
  },
  {
    id: "project-5",
    title: "Project Epsilon",
    description: "A collaborative design tool for teams to create and iterate on user interfaces.",
    tags: ["Figma Plugin", "TypeScript", "GraphQL"],
    link: "#",
  },
  {
    id: "project-6",
    title: "Project Zeta",
    description: "An AI-powered chatbot for customer support, integrated with multiple messaging platforms.",
    tags: ["Genkit", "Dialogflow", "Next.js"],
    link: "#",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-transparent py-16 md:py-24">
      <div className="container animate-fade-in-up" style={{ animationDuration: '1s' }}>
        <div className="space-y-8">
          <h1 className="text-4xl font-bold font-headline text-center">My Work</h1>
          <p className="text-lg text-foreground/80 text-center">
            Here are some of the projects I'm proud of. Each one was a unique challenge and a learning experience.
          </p>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const projectImage = placeholderImages.find(p => p.id === project.id);
              return (
                <div key={project.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms`, animationDuration: '1s' }}>
                  <Card className="flex flex-col h-full hover:border-primary/50 transition-colors">
                    <CardHeader>
                      {projectImage && (
                        <div className="aspect-video relative mb-4 overflow-hidden rounded-t-lg">
                           <Image
                              src={projectImage.imageUrl}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-500 hover:scale-105"
                              data-ai-hint={projectImage.imageHint}
                           />
                        </div>
                      )}
                      <CardTitle>{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-foreground/80">{project.description}</p>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      <Link href={project.link} target="_blank" className="flex items-center text-sm text-primary hover:underline">
                        View Project <ArrowUpRight className="h-4 w-4 ml-1" />
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
