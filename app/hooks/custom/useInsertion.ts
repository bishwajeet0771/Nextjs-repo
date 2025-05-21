import { useState, useEffect, useRef, MutableRefObject } from "react";

interface IntersectionOptions {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface IntersectionReturn {
  ref: MutableRefObject<HTMLDivElement | null>;
  entry: IntersectionObserverEntry | null;
}

const useIntersection = ({
  root = null,
  rootMargin = "0px", 
  threshold = 0.1,
}: IntersectionOptions): IntersectionReturn => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    const { current: currentObserver } = observer;
    if (ref.current) currentObserver.observe(ref.current);

    return () => currentObserver.disconnect();
  }, [root, rootMargin, threshold]);

  return { ref, entry };
};

export default useIntersection;
