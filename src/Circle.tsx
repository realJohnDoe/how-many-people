import React from "react";
import { type CircleData } from "./data";

// --- Helper Functions ---
function formatToTwoSignificantDigits(
  num: number,
  isCurrency: boolean = false
): string {
  const prefix = isCurrency ? "$" : "";
  if (num === 0) return prefix + "0";

  const absNum = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  const options: Intl.NumberFormatOptions = {
    maximumSignificantDigits: 2,
    minimumSignificantDigits: 1, // Ensure at least one digit is shown
  };

  let formatted = absNum.toLocaleString(undefined, options);

  // Add the "trillion", "billion", "million", "thousand" suffix
  // This part needs to be done carefully to ensure two significant digits
  // are maintained even with the suffix.
  // We'll re-evaluate the scale after toLocaleString to get a clean number for comparison.
  let scaledNum = absNum;
  let suffix = "";

  if (absNum >= 1.0e12) {
    scaledNum = absNum / 1.0e12;
    suffix = " trillion";
  } else if (absNum >= 1.0e9) {
    scaledNum = absNum / 1.0e9;
    suffix = " billion";
  } else if (absNum >= 1.0e6) {
    scaledNum = absNum / 1.0e6;
    suffix = " million";
  } else if (absNum >= 1.0e3) {
    scaledNum = absNum / 1.0e3;
    suffix = " thousand";
  }

  // Format the scaled number for the suffix, ensuring two significant digits
  formatted = scaledNum.toLocaleString(undefined, options);

  return prefix + sign + formatted + suffix;
}

type CircleProps = {
  circle: CircleData;
  isSelected: boolean;
  setSelectedId: (id: number) => void;
  diameter: number;
  scaleFactor: number;
  wrapperStyle: React.CSSProperties;
};

function Circle({
  circle,
  isSelected,
  setSelectedId,
  diameter,
  scaleFactor,
  wrapperStyle,
}: CircleProps) {
  const innerStyle = {
    width: `${diameter}rem`,
    height: `${diameter}rem`,
    transform: `scale(${scaleFactor})`,
    transition: "transform 0.5s ease-in-out",
  };

  const bgColor = isSelected ? "bg-yellow-400" : "bg-gray-500";

  // Calculate daily turnover
  const dailyTurnover = circle.yearlyTurnOver / 365;
  const formattedDailyTurnover = formatToTwoSignificantDigits(
    dailyTurnover,
    true
  );
  const formattedPersons = formatToTwoSignificantDigits(circle.numberOfPersons);

  return (
    <div
      key={circle.id}
      onClick={() => setSelectedId(circle.id)}
      style={wrapperStyle}
      className="absolute bottom-[10vh] -translate-x-1/2 cursor-pointer"
    >
      <div
        style={innerStyle}
        className={`${bgColor} rounded-full flex justify-center items-center text-black font-bold p-2 text-center origin-bottom`}
      >
        <div className="flex flex-col items-center">
          <span
            style={{
              fontSize: `1.5rem`,
              lineHeight: "1",
            }}
          >
            {circle.name}
          </span>
          <span
            style={{
              fontSize: `0.75rem`,
              lineHeight: "1",
            }}
          >
            Persons: {formattedPersons}
          </span>
          <span
            style={{
              fontSize: `0.75rem`,
              lineHeight: "1",
            }}
          >
            Daily Turnover: {formattedDailyTurnover}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Circle;
