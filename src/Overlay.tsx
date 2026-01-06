import React from "react";
import Dropdown from "./Dropdown";

interface OverlayProps {
  orderBy: "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson";
  setOrderBy: React.Dispatch<
    React.SetStateAction<
      "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson"
    >
  >;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Overlay: React.FC<OverlayProps> = ({
  orderBy,
  setOrderBy,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center z-0 pointer-events-none">
      <div className="py-4 pointer-events-auto">
        <div className="text-3xl font-bold text-primary">
          How many people are...
        </div>
      </div>
      <div className="w-96 grow rounded-lg bg-gray-200"></div>
      <div className="py-4 pointer-events-auto">
        <Dropdown
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>
    </div>
  );
};

export default Overlay;
