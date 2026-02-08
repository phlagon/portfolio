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
    title: "Project Alpha",
    description: "An innovative web application that redefines productivity with a slick, futuristic interface.",
    tags: ["Next.js", "Tailwind CSS", "AI"],
    link: "#",
  },
  {
    id: "project-2",
    title: "Project Beta",
    description: "A mobile-first social platform connecting users through shared interests and real-time events.",
    tags: ["React Native", "Firebase", "UX/UI"],
    link: "#",
  },
  {
    id: "project-3",
    title: "Project Gamma",
    description: "An e-commerce site with a focus on 3D product visualization and augmented reality try-on features.",
    tags: ["Three.js", "Shopify", "Blender"],
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
    <section id="projects" className="bg-background py-16 md:py-24">
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
