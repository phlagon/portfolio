"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Facebook } from "lucide-react";

import { Loading } from "@/components/layout/loading";
import { AboutSection } from "@/components/home/about-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Message Sent! 🐾",
      description: "Thanks for reaching out! I'll get back to you soon.",
    });
    form.reset();
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setShowLoader(false);
          }, 500);
          return 100;
        }
        return oldProgress + 2;
      });
    }, 15);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (showLoader) {
    return <Loading progress={progress} />;
  }

  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section id="home" className="relative min-h-[90vh] flex flex-col justify-center px-4 md:px-16 py-24 overflow-hidden">
        <div className="container max-w-6xl mx-auto z-10">
          <div className="max-w-2xl space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
              Hi, I'm <span className="text-white">Benzitta</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-primary">
              Creative Digital Designer
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-xl leading-relaxed">
              Specializing in UI/UX, branding, and interaction design that combines elegance with purpose. I build digital spaces that are intuitive, accessible, and intentional.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="rounded-md px-8 h-14 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90">
                Hire Me
              </Button>
              <Button size="lg" variant="outline" className="rounded-md px-8 h-14 text-base font-bold border-primary text-primary hover:bg-primary/10">
                Let's Talk
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-12">
              <Link href="#" className="p-2 rounded-full border border-border/50 hover:border-primary/50 text-foreground/50 hover:text-primary transition-all">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 rounded-full border border-border/50 hover:border-primary/50 text-foreground/50 hover:text-primary transition-all">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 rounded-full border border-border/50 hover:border-primary/50 text-foreground/50 hover:text-primary transition-all">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Abstract Background Element (Simplified for reference aesthetic) */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[40%] h-[80%] bg-primary/5 blur-[150px] rounded-full -z-10" />
      </section>

      <AboutSection />
      <ProjectsSection />

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-card/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold font-headline">Get in Touch</h2>
              <p className="text-lg text-foreground/70">
                Have a project in mind, a question, or just want to connect? I'm always open to discussing new opportunities and creative ideas.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Contact Info</h3>
                <div className="space-y-2 text-foreground/70">
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" /> benzitta2003@gmail.com
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-2xl border border-border/50">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} className="bg-background/50 border-border/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} className="bg-background/50 border-border/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="How can I help you?" {...field} rows={5} className="bg-background/50 border-border/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
