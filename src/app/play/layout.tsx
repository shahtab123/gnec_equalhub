import { Navbar } from "@/components/Navbar";
import { GridBackground } from "@/components/ui/grid-background";

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0">
        <GridBackground />
      </div>

      <Navbar />

      <div className="relative pt-24">
        {children}
      </div>
    </main>
  );
} 