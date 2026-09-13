import { Archive } from "lucide-react";

export function ArchiveBanner() {
  return (
    <aside
      aria-label="Portfolio archive notice"
      className="flex min-h-16 items-center justify-center border-b border-amber-800/25 bg-gradient-to-b from-white/55 to-white/0 bg-amber-50 px-4 py-2 text-center text-xs text-amber-950 backdrop-blur-lg dark:border-amber-400/20 dark:from-black/20 dark:bg-amber-950/40 dark:text-amber-100 md:min-h-10 md:text-sm"
    >
      <p className="max-w-2xl leading-relaxed">
        <span className="mr-1 inline-flex items-center gap-1 rounded-sm border border-amber-900/25 bg-amber-900/5 px-1.5 py-0.5 align-middle font-mono text-[0.7em] font-medium text-amber-900 dark:border-amber-300/25 dark:bg-amber-300/10 dark:text-amber-200">
          <Archive className="h-3 w-3" aria-hidden />
          archived
        </span>
        This project is no longer maintained.
        <br />
        Sign-in and all app functionality have been disabled, kept online as a portfolio snapshot
        only.
      </p>
    </aside>
  );
}
