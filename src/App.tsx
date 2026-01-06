import React from "react";
import { circlesData } from "./data";
import Circle from "./Circle";
import InfoBox from "./InfoBox";
import Overlay from "./Overlay";

// --- The React Component ---
function App() {
  const [selectedId, setSelectedId] = React.useState(1);
  const [orderBy, setOrderBy] = React.useState<
    "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson"
  >("yearlyTurnOver");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [paddingX, setPaddingX] = React.useState(0);

  const targetDiameter = 20; // rem
  const overlayWidthPx = 24 * 16; // w-96 in Tailwind is 24rem, assuming 1rem = 16px

  const selectNextCircle = () => {
    const currentIndex = circlesData.findIndex((c) => c.id === selectedId);
    if (currentIndex < circlesData.length - 1) {
      setSelectedId(circlesData[currentIndex + 1].id);
    }
  };

  const selectPreviousCircle = () => {
    const currentIndex = circlesData.findIndex((c) => c.id === selectedId);
    if (currentIndex > 0) {
      setSelectedId(circlesData[currentIndex - 1].id);
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        selectNextCircle();
      } else if (event.key === "ArrowLeft") {
        selectPreviousCircle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedId]);

  React.useEffect(() => {
    const calculatePadding = () => {
      const newPaddingX = (window.innerWidth - overlayWidthPx) / 2;
      setPaddingX(Math.max(0, newPaddingX)); // Ensure padding is not negative
    };

    calculatePadding(); // Calculate on mount
    window.addEventListener("resize", calculatePadding); // Recalculate on resize

    return () => {
      window.removeEventListener("resize", calculatePadding); // Cleanup
    };
  }, [overlayWidthPx]); // Recalculate if overlayWidthPx changes (though it's constant here)

  const [touchStart, setTouchStart] = React.useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;

    if (touchStart - touchEnd > 50) {
      // Swiped left
      selectNextCircle();
    }

    if (touchStart - touchEnd < -50) {
      // Swiped right
      selectPreviousCircle();
    }
  };

  return (
    <>
      <Overlay
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* --- Scrollable Content --- */}
      <div className="flex flex-col min-h-dvh">
        <div
          className="flex flex-row items-center flex-1 space-x-8"
          style={{
            paddingLeft: `${paddingX}px`,
            paddingRight: `${paddingX}px`,
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {circlesData.map((circle) => {
            const scaleFactor = 1;
            const isSelected = circle.id === selectedId;

            return (
              <div
                key={circle.id}
                className="relative flex flex-col items-center justify-center space-y-4 flex-shrink-0"
              >
                {/* Container for the visual circle */}
                <div
                  className="origin-bottom transition-transform duration-500 ease-in-out"
                  style={{
                    width: `${targetDiameter}rem`,
                    height: `${targetDiameter}rem`,
                    transform: `scale(${scaleFactor})`,
                  }}
                >
                  <Circle circle={circle} isSelected={isSelected} />
                </div>
                {/* Container for the InfoBox */}
                <div>
                  <InfoBox circle={circle} isSelected={isSelected} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
