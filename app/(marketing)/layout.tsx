import { ArchiveBanner } from "@/components/archive-banner";
import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed top-0 z-40 w-full">
        <ArchiveBanner />
        <Navbar />
      </div>
      <main className="flex-1 pt-40 pb-12">{children}</main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
