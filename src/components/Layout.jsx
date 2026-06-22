import { Loader } from "./Loader";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { SmoothScroll } from "./SmoothScroll";

export function Layout({ children }) {
  return (
    <>
      <Loader />
      <Nav />
      <SmoothScroll>
        <main className="min-h-screen bg-background relative z-10 shadow-2xl">
          {children}
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
