import React from "react";

type DropdownProps = {
  orderBy: "numberOfPersons" | "yearlyTurnOver";
  setOrderBy: (orderBy: "numberOfPersons" | "yearlyTurnOver") => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
};

function Dropdown({
  orderBy,
  setOrderBy,
  isMenuOpen,
  setIsMenuOpen,
}: DropdownProps) {
  const [hoveredOption, setHoveredOption] = React.useState<
    "numberOfPersons" | "yearlyTurnOver" | null
  >(null);

  const getOptionClassName = (option: "numberOfPersons" | "yearlyTurnOver") => {
    if (hoveredOption) {
      return hoveredOption === option ? "bg-gray-600" : "";
    }
    return orderBy === option ? "bg-gray-600" : "";
  };

  return (
    <div className="absolute top-4 left-4 z-10">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="bg-gray-700 text-white rounded p-2"
      >
        <img src="/src/icon.svg" alt="order by" className="w-6 h-6" />
      </button>
      {isMenuOpen && (
        <div
          className="absolute top-12 left-0 bg-gray-700 text-white rounded p-2 w-48"
          onMouseLeave={() => setHoveredOption(null)}
        >
          <div className="font-bold mb-2">Circle Size by...</div>
          <div
            onClick={() => {
              setOrderBy("numberOfPersons");
              setIsMenuOpen(false);
            }}
            onMouseEnter={() => setHoveredOption("numberOfPersons")}
            className={`cursor-pointer p-1 ${getOptionClassName(
              "numberOfPersons"
            )}`}
          >
            Number of Persons
          </div>
          <div
            onClick={() => {
              setOrderBy("yearlyTurnOver");
              setIsMenuOpen(false);
            }}
            onMouseEnter={() => setHoveredOption("yearlyTurnOver")}
            className={`cursor-pointer p-1 ${getOptionClassName(
              "yearlyTurnOver"
            )}`}
          >
            Yearly Turnover
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
