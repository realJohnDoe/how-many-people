import * as React from "react";

type ScrollSpaceProps = {
  numItems: number;
  itemDistance: number; // px
  onIndexChange?: (index: number) => void;

  /** Controlled scroll target */
  scrollToIndex?: number;
};

export function ScrollSpace({
  numItems,
  itemDistance,
  onIndexChange,
  scrollToIndex,
}: ScrollSpaceProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = React.useRef(false);
  const [paddingX, setPaddingX] = React.useState(0);

  // --- measure container + compute centering padding ---
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updatePadding = () => {
      const containerWidth = el.clientWidth;
      const padding = (containerWidth - itemDistance) / 2;
      setPaddingX(Math.max(0, padding));
    };

    updatePadding();

    const ro = new ResizeObserver(updatePadding);
    ro.observe(el);

    return () => ro.disconnect();
  }, [itemDistance]);

  // --- programmatic scroll ---
  React.useEffect(() => {
    if (scrollToIndex == null) return;
    const el = containerRef.current;
    if (!el) return;

    isProgrammaticScroll.current = true;

    el.scrollTo({
      left: scrollToIndex * itemDistance,
      behavior: "smooth",
    });

    const id = window.setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 100);

    return () => window.clearTimeout(id);
  }, [scrollToIndex, itemDistance]);

  // --- scroll → index ---
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      if (isProgrammaticScroll.current) return;

      const index = Math.round(el.scrollLeft / itemDistance);
      onIndexChange?.(index);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [itemDistance, onIndexChange]);

  return (
    <div
      ref={containerRef}
      className="
        h-full w-full
        overflow-x-scroll overflow-y-hidden
        snap-x snap-mandatory
        box-border
      "
      style={{
        paddingLeft: paddingX,
        paddingRight: paddingX,
      }}
    >
      <div className="flex">
        {Array.from({ length: numItems }).map((_, i) => (
          <div
            key={i}
            className="shrink-0 snap-center"
            style={{
              width: itemDistance,
            }}
          />
        ))}
      </div>
    </div>
  );
}
