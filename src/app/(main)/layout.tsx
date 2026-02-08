import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TravelingCat } from "@/components/layout/traveling-cat";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TravelingCat />
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
