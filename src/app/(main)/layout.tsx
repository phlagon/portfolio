import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CatDialogue } from "@/components/cat/cat-dialogue";
import { CatModel } from "@/components/cat/cat-model";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 container py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <main className="md:col-span-2 animate-fade-in-up">{children}</main>
          <aside className="relative md:col-span-1">
            <div className="sticky top-24">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-card/50">
                <CatModel />
              </div>
              <CatDialogue />
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
