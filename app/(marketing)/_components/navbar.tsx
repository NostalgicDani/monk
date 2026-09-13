import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
  return (
    <nav className="w-full h-16 px-4 border-b shadow-sm  bg-neutral-50 dark:bg-neutral-950 flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 w-auto h-auto flex items-center justify-end ">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
