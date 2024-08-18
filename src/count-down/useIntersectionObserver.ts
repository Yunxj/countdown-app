import { useEffect, useRef } from 'react';

interface UseIntersectionObserverParams {
  intersectionHandler?: () => void;
  outerSectionHandler?: () => void;
  element: React.MutableRefObject<HTMLElement | undefined | null> | null;
  threshold: number[];
  unobserveAfterIntersect?: boolean;
  skip?: boolean;
  rootMargin?: string;
}

export function useIntersectionObserver({
  intersectionHandler,
  outerSectionHandler,
  element,
  threshold,
  rootMargin = '0px',
  unobserveAfterIntersect,
  skip,
}: UseIntersectionObserverParams): void {
  const observerRef = useRef<IntersectionObserver>();
  useEffect(() => {
    if (skip) {
      return;
    }
    const handleObserver = (entities: IntersectionObserverEntry[]): void => {
      if (entities[0].isIntersecting && intersectionHandler) {
        intersectionHandler();
        if (unobserveAfterIntersect) {
          observerRef.current?.unobserve(entities[0].target);
        }
      } else if (!entities[0].isIntersecting && outerSectionHandler) {
        outerSectionHandler();
      }
    };
    try {
      const options = {
        rootMargin,
        threshold,
      };
      observerRef.current = new IntersectionObserver(handleObserver, options);
      if (element && element.current && observerRef.current) {
        observerRef.current.observe(element?.current);
      }
    } catch (error) {
      console.error(error);
    }
    return () => {
      observerRef.current?.disconnect();
    };
  }, [element, intersectionHandler, outerSectionHandler, threshold, unobserveAfterIntersect, skip, rootMargin]);
}
