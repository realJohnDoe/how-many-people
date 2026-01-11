import React from "react";
import Dropdown from "./Dropdown";

interface AppHeaderProps {
  orderBy: "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson";
  setOrderBy: (
    value: "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson"
  ) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ orderBy, setOrderBy }) => {
  return (
    <div>
      <div className="fixed inset-0 z-10 pointer-events-none">
        <div className="relative w-full h-full">
          {/* Title */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            <div className="text-3xl font-bold text-primary">
              How many people are...
            </div>
          </div>

          {/* Dropdown */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-auto">
            <Dropdown orderBy={orderBy} setOrderBy={setOrderBy} />
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 top-20 bottom-20 z-0">
        <div className="w-[min(90vw,24rem)] h-full rounded-lg bg-gray-200" />
      </div>
    </div>
  );
};

export default AppHeader;
