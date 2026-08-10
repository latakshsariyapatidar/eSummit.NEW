import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      <Nav />
      <main className="flex-1 w-full relative z-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}
