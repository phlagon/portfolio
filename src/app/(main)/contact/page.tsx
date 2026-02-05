"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function ContactPage() {
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

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold font-headline">Get in Touch</h1>
      <p className="text-lg text-foreground/80">
        Have a project in mind, a question, or just want to say meow? I'd love to hear from you.
      </p>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        <div className="space-y-6">
            <h3 className="text-xl font-bold">Or find me on social media</h3>
            <div className="flex space-x-4">
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
  );
}
