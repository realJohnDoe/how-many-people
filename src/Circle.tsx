import React from "react";

interface CircleProps {
  name: string;
  formattedPersons: string;
  formattedDailyTurnover: string;
  isSelected: boolean;
}

const Circle: React.FC<CircleProps> = ({
  name,
  formattedPersons,
  formattedDailyTurnover,
  isSelected,
}) => {
  const bgColor = isSelected ? "bg-yellow-400" : "bg-gray-500";

  return (
    <div
      className={`${bgColor} rounded-full flex justify-center items-center text-black font-bold p-2 text-center w-full h-full`}
    >
      <div className="flex flex-col items-center">
        <span
          style={{
            fontSize: `1.5rem`,
            lineHeight: "1",
          }}
        >
          {name}
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
  );
};

export default Circle;
