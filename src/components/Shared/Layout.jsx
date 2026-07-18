import { Nav } from "./Nav";
import { Footer } from "./Footer";


export function Layout({ children }) {
  return (
    <>
      <Nav />
        <main className="min-h-screen bg-background relative z-10 shadow-2xl">
          {children}
        </main>
        <Footer />
    </>
  );
}
