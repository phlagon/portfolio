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
import { HeroGraphic } from "@/components/home/hero-graphic";
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
      <section id="home" className="relative min-h-[95vh] flex flex-col justify-center px-4 md:px-16 py-24 overflow-hidden border-b border-white/5">
        <div className="container max-w-7xl mx-auto z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs">Based in India</p>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[0.9] uppercase">
                  Digital <br /> <span className="text-primary">Designer</span>
                </h1>
              </div>
              
              <div className="space-y-6 max-w-lg">
                <p className="text-xl md:text-2xl font-light text-foreground/80 leading-tight">
                  I'm <span className="text-white font-medium italic">Benzitta</span>. I build intentional digital spaces through branding, interaction, and mobile interfaces.
                </p>
                
                <div className="flex flex-wrap gap-5 pt-4">
                  <Button size="lg" className="rounded-none px-10 h-16 text-sm uppercase tracking-widest font-black bg-white text-black hover:bg-primary hover:text-white transition-all duration-300">
                    Hire Benzitta
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="rounded-none px-10 h-16 text-sm uppercase tracking-widest font-black border-white/20 text-white hover:border-primary hover:text-primary transition-all duration-300"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Let's Talk
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-8 pt-8 opacity-40">
                <Link href="#" className="hover:text-primary transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-[500px] h-[500px]">
                <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full" />
                <HeroGraphic />
              </div>
            </div>
          </div>
        </div>
        
        {/* Structural Background Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] -z-10">
          <div className="h-full w-px bg-white absolute left-1/4" />
          <div className="h-full w-px bg-white absolute left-2/4" />
          <div className="h-full w-px bg-white absolute left-3/4" />
        </div>
      </section>

      <AboutSection />
      <ProjectsSection />

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-card/20 border-t border-white/5">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-24">
            <div className="space-y-12">
              <div className="space-y-4">
                <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs">Ready for work</p>
                <h2 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter uppercase">Let's build <br /> something.</h2>
              </div>
              
              <p className="text-xl text-foreground/60 leading-relaxed font-light">
                Have a project in mind, a question, or just want to connect? I'm always open to discussing new opportunities and creative ideas.
              </p>
              
              <div className="space-y-4 pt-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Inquiries</h3>
                <div className="space-y-2 text-2xl font-light text-foreground/80">
                  <p className="flex items-center gap-4">
                    <Mail className="h-6 w-6 text-primary" /> benzitta2003@gmail.com
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-10 rounded-none border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-xs uppercase tracking-widest font-bold opacity-50">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} className="bg-transparent border-0 border-b border-white/10 rounded-none h-12 focus-visible:ring-0 focus-visible:border-primary transition-all px-0" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-xs uppercase tracking-widest font-bold opacity-50">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} className="bg-transparent border-0 border-b border-white/10 rounded-none h-12 focus-visible:ring-0 focus-visible:border-primary transition-all px-0" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-xs uppercase tracking-widest font-bold opacity-50">Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="How can I help you?" {...field} rows={4} className="bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all px-0 resize-none" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full rounded-none h-16 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-primary hover:text-white transition-all duration-300 mt-4">
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
