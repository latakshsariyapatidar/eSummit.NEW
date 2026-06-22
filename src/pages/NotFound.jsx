import { TransitionLink as Link } from "../components/ui/TransitionLink";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function NotFound() {
  useDocumentTitle("Page Not Found — E-Summit 2026");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md">
        <div className="font-display text-[10rem] leading-none text-primary">
          404
        </div>
        <h2 className="font-display text-2xl">Off the racing line</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page took a wrong turn.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest font-semibold"
        >
          Back to the grid
        </Link>
      </div>
    </div>
  );
}
