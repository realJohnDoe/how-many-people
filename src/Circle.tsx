import React from "react";

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

interface CircleProps {
  name: string;
  numberOfPersons: number;
  yearlyTurnOver: number;
  isSelected: boolean;
}

const Circle: React.FC<CircleProps> = ({
  name,
  numberOfPersons,
  yearlyTurnOver,
  isSelected,
}) => {
  const bgColor = isSelected ? "bg-yellow-400" : "bg-gray-500";

  // Calculate daily turnover and format numbers here
  const dailyTurnover = yearlyTurnOver / 365;
  const formattedDailyTurnover = formatToTwoSignificantDigits(dailyTurnover, true);
  const formattedPersons = formatToTwoSignificantDigits(numberOfPersons);

  return (
    <div className="relative w-full h-full">
      {/* The actual circle content */}
      <div
        className={`${bgColor} rounded-full flex justify-center items-center text-white font-bold p-2 text-center w-full h-full transition-colors duration-500 ease-in-out`}
      >
        <span // Only the name remains inside the circle
          style={{
            fontSize: `1.5rem`,
            lineHeight: "1",
          }}
        >
          {name}
        </span>
      </div>

      {/* The text positioned below the circle (only for selected) */}
      {isSelected && ( // Only show for selected circle
        <div className="absolute top-full mt-2 text-white text-lg font-bold text-center w-max left-1/2 -translate-x-1/2">
          <div>Persons: {formattedPersons}</div>
          <div>Daily Turnover: {formattedDailyTurnover}</div>
        </div>
      )}
    </div>
  );
};

export default Circle;
