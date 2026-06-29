import { TransitionLink as Link } from "../components/ui/TransitionLink";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function NotFound() {
  useDocumentTitle("Page Not Found — E-Summit 2026");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md">
        <div className="flex items-center justify-center w-full p-10">
          <img src="/404.svg" alt="" />
        </div>
        <h2 className="capitalize text-zinc-700">
          the developer was lazy, but will make sure to include this path next
          year, if I am still in charge of web team XD
        </h2>
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
