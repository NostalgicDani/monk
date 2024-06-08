import { Button } from "@/components/ui/button";
import { PT_Sans } from "next/font/google";
import { Medal } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

const textFont = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-3xl md:text-6xl text-center pt-9 text-neutral-800 mb-6">
          Min Kanban
        </h1>
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          minimal task management
        </div>
        <div className="text-3xl md:text-6xl text-center bg-gradient-to-r from-sky-800 to-cyan-500 text-white px-4 p-4 rounded-md w-f">
          any name is fine here
        </div>
      </div>
      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl mx-auto",
          textFont.className
        )}
      >
        A simple kanban board for individuals or teams.
      </div>
      <Button variant="secondary" className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Continue ahead</Link>
      </Button>

      <div className="flex items-center justify-center flex-col mt-20 bg-slate-500 mx-auto p-10">
        <h2 className="text-2xl md:text-4xl text-center">
          unlimited boards for your unlimited tasks
        </h2>
      </div>
    </div>
  );
};

export default MarketingPage;
