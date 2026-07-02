import { Suspense } from "react";
import { useInView } from "react-intersection-observer";

export function LazySection({ component }) {
  const Component = component;

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px",
  });

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={null}>
          <Component />
        </Suspense>
      ) : (
        <div className="min-h-75" />
      )}
    </div>
  );
}
