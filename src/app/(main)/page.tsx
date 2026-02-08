"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

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

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>WhatsApp</title>
    <path
      fill="currentColor"
      d="M12.04 2.01A10.02 10.02 0 0 0 2.03 12a10.02 10.02 0 0 0 10.01 9.99A10.02 10.02 0 0 0 22.05 12a10.02 10.02 0 0 0-10.01-9.99zm0 1.67c4.6 0 8.33 3.73 8.33 8.32 0 4.59-3.73 8.32-8.33 8.32-1.48 0-2.88-.39-4.1-1.07l-4.43 1.16 1.2-4.32a8.28 8.28 0 0 1-1.15-4.09c0-4.59 3.74-8.32 8.33-8.32zm3.12 10.03c-.16-.08-1.03-.51-1.2-.6-.16-.08-.28-.13-.4.13-.13.26-.45.57-.56.68-.1.12-.2.13-.37.05-.17-.08-1.12-.41-2.14-1.32-.8-.72-1.34-1.61-1.5-1.88-.16-.28-.02-.43.07-.55.08-.1.17-.26.25-.38.08-.13.12-.21.18-.34.06-.13.03-.25 0-.33-.03-.08-.4-.95-.55-1.31-.15-.35-.3-.3-.42-.3-.12 0-.25 0-.37 0-.13 0-.33.05-.5.25s-.64.62-.64 1.51.66 1.75.75 1.88c.08.13 1.28 1.95 3.1 2.7.43.18.77.28.97.36.48.18.78.16.99.1.25-.06.77-.31.88-.61s.1-.48.07-.54-.12-.08-.28-.16z"
    />
  </svg>
);


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
    console.log(values); // In a real app, you would send this to a server
    toast({
      title: "Message Sent! 🐾",
      description: "Thanks for reaching out! I'll get back to you as soon as possible.",
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
          }, 500); // Wait half a second after 100%
          return 100;
        }
        return oldProgress + 1;
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
    <main>
      <section id="home" className="flex flex-1 flex-col items-center justify-center text-white p-4 overflow-hidden min-h-screen">
        <div className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-8 max-w-6xl w-full">
            <div className="hidden md:block">
                <h2 style={{ writingMode: 'vertical-rl' }} className="transform rotate-180 uppercase tracking-widest text-lg text-foreground/70 justify-self-start">
                    Branding & Identity
                </h2>
            </div>
            
            <div className="flex flex-col items-center text-center w-full">
                 <div className="relative flex items-center justify-center w-full max-w-sm mx-auto aspect-square my-8">
                    <HeroGraphic />
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                    Creative Digital Design
                </h1>
                <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-2xl">
                    Specializing in UI/UX, branding, and packaging that combines elegance with purpose.
                </p>
            </div>

            <div className="hidden md:block">
                <h2 style={{ writingMode: 'vertical-rl' }} className="uppercase tracking-widest text-lg text-foreground/70 justify-self-end">
                    UI/UX & Interaction
                </h2>
            </div>
        </div>

        <div className="md:hidden text-lg uppercase tracking-widest text-foreground/70 mt-16 flex flex-wrap justify-center gap-x-4 gap-y-2">
          <span>UI/UX</span>
          <span>Branding</span>
          <span>Logos</span>
          <span>Packaging</span>
        </div>
      </section>
      <div className="relative isolate">
        <video autoPlay loop muted playsInline className="absolute inset-0 -z-10 h-full w-full object-cover">
            <source src="https://raw.githubusercontent.com/phlagon/purr-folio/main/web-bg1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div className="relative z-10">
          <AboutSection />
          <ProjectsSection />
          <section id="contact" className="py-16 md:py-24 bg-transparent">
            <div className="container">
              <div className="space-y-8 text-center">
                <h1 className="text-4xl font-bold font-headline">Get in Touch</h1>
                <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                  Have a project in mind, a question, or just want to say meow? I'd love to hear from you.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 mt-12 max-w-4xl mx-auto">
                <div>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Name" {...field} />
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
                              <Input placeholder="your.email@example.com" {...field} />
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
                              <Textarea placeholder="Tell me what's on your mind..." {...field} rows={5} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </div>
                <div className="space-y-6 text-left">
                    <h3 className="text-xl font-bold">Or find me on social media</h3>
                    <div className="flex space-x-4">
                      <Link href="mailto:benzitta2003@gmail.com" passHref>
                        <Button variant="outline" size="icon" aria-label="Email">
                          <Mail className="h-5 w-5" />
                        </Button>
                      </Link>
                      <Link href="https://wa.me/8088159808" passHref target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" aria-label="WhatsApp">
                          <WhatsappIcon className="h-5 w-5" />
                        </Button>
                      </Link>
                      <Link href="#" passHref>
                        <Button variant="outline" size="icon" aria-label="GitHub">
                          <Github className="h-5 w-5" />
                        </Button>
                      </Link>
                      <Link href="#" passHref>
                        <Button variant="outline" size="icon" aria-label="LinkedIn">
                          <Linkedin className="h-5 w-5" />
                        </Button>
                      </Link>
                      <Link href="#" passHref>
                        <Button variant="outline" size="icon" aria-label="Twitter">
                          <Twitter className="h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mt-8 mb-2">My virtual office hours</h3>
                      <p className="text-foreground/80">I'm generally available from 9 AM to 5 PM (Cat Time), but feel free to drop a message anytime. I check my inbox between naps.</p>
                    </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
