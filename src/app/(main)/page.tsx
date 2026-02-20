
"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Script from "next/script";
import { Linkedin, Twitter, Mail, Facebook } from "lucide-react";

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
import { Reveal } from "@/components/ui/reveal";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Home() {
  const { toast } = useToast();
  const [spotlightPos, setSpotlightPos] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

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
      title: "Transmission Received! ⚡",
      description: "I'll be in touch shortly.",
    });
    form.reset();
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-background">
      <Script 
        type="module" 
        src="https://unpkg.com/@splinetool/viewer@1.12.58/build/spline-viewer.js" 
        strategy="afterInteractive"
      />

      {/* Hero Section */}
      <section 
        id="home" 
        ref={heroRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex flex-col justify-center px-4 md:px-16 overflow-hidden border-b border-white/5"
      >
        {/* Spline 3D Scene - Full Background Layer */}
        <div 
          className="absolute inset-0 z-0 transition-opacity duration-500 pointer-events-none"
          style={{
            opacity: isHovering ? 1 : 0,
            maskImage: `radial-gradient(circle 350px at ${spotlightPos.x}px ${spotlightPos.y}px, black 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 350px at ${spotlightPos.x}px ${spotlightPos.y}px, black 0%, transparent 100%)`,
          }}
        >
          <div className="w-full h-full pointer-events-auto">
            <spline-viewer 
              url="https://prod.spline.design/YPNPfF4VmzkVgRS1/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            ></spline-viewer>
          </div>
        </div>

        <div className="container max-w-7xl mx-auto z-10 pointer-events-none">
          <div className="grid lg:grid-cols-2 items-center">
            <Reveal className="space-y-12 pointer-events-auto">
              <div className="space-y-6">
                <p className="text-primary font-black tracking-[0.5em] uppercase text-[10px]">India • Remote • Available</p>
                <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter text-white leading-[0.85] uppercase">
                  Creative <br /> <span className="text-primary">Design</span>
                </h1>
              </div>
              
              <div className="space-y-8 max-w-xl">
                <div className="flex flex-wrap gap-6 pt-6">
                  <Button size="lg" onClick={scrollToContact} className="rounded-none px-12 h-16 text-xs uppercase tracking-[0.3em] font-black bg-white text-black hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl">
                    Get in Touch
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="rounded-none px-12 h-16 text-xs uppercase tracking-[0.3em] font-black border-white/10 text-white hover:border-primary hover:text-primary transition-all duration-500"
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View Work
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-10 pt-12 opacity-30">
                <Link href="#" className="hover:text-primary transition-colors">
                  <Facebook className="h-4 w-4" />
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                  <Twitter className="h-4 w-4" />
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ProjectsSection />

      <section id="contact" className="py-40 bg-card/40 border-t border-white/5">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-32">
            <Reveal className="space-y-16">
              <div className="space-y-6">
                <p className="text-primary font-black tracking-[0.4em] uppercase text-[10px]">Open for collaboration</p>
                <h2 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.9]">Start a <br /> Project.</h2>
              </div>
              
              <p className="text-xl text-foreground/50 leading-relaxed font-light max-w-md">
                Reach out to discuss new opportunities, creative partnerships, or just to say hello.
              </p>
              
              <div className="space-y-6 pt-12">
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Direct Line</h3>
                <div className="space-y-3 text-2xl font-light text-foreground/80">
                  <p className="flex items-center gap-6">
                    <Mail className="h-6 w-6 text-primary" /> benzitta2003@gmail.com
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={300} className="bg-card p-12 rounded-none border border-white/5 shadow-2xl">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40">Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter name" {...field} className="bg-transparent border-0 border-b-2 border-white/5 rounded-none h-14 focus-visible:ring-0 focus-visible:border-primary transition-all px-0 placeholder:text-white/5" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40">Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="name@company.com" {...field} className="bg-transparent border-0 border-b-2 border-white/5 rounded-none h-14 focus-visible:ring-0 focus-visible:border-primary transition-all px-0 placeholder:text-white/5" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40">Brief Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell me about your vision" {...field} rows={5} className="bg-transparent border-0 border-b-2 border-white/5 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all px-0 resize-none placeholder:text-white/5" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full rounded-none h-20 bg-white text-black font-black uppercase tracking-[0.4em] text-xs hover:bg-primary hover:text-white transition-all duration-500 mt-6">
                    Send Inquiry
                  </Button>
                </form>
              </Form>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
