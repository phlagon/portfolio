import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { placeholderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
    const skills = [
        "React", "Next.js", "TypeScript", "JavaScript",
        "HTML5", "CSS3", "Tailwind CSS", "Figma",
        "UI/UX Design", "Three.js", "GenAI"
    ];

    const profileImage = placeholderImages.find(p => p.id === "profile");

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold font-headline">About Me</h1>
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {profileImage && <Image 
                    src={profileImage.imageUrl} 
                    alt="A picture of me" 
                    width={150} 
                    height={150}
                    data-ai-hint={profileImage.imageHint}
                    className="rounded-full aspect-square object-cover border-4 border-primary/20"
                />}
                <div className="space-y-4 text-foreground/80">
                    <p>
                        Hello! I'm PurrfectDev, a passionate developer and designer with a love for creating beautiful,
                        interactive, and user-friendly web experiences. My journey into the world of code was driven by
                        a desire to bring ideas to life, and I've been hooked ever since.
                    </p>
                    <p>
                        I specialize in front-end development, with a particular focus on the React ecosystem. I enjoy
                        the challenge of building complex UIs and animations that not only look great but also perform
                        flawlessly. This portfolio is a little passion project to explore 3D on the web and the fun of AI-powered interactions.
                    </p>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold font-headline mb-4">My Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                </div>
            </div>
        </div>
    );
}
