import React from 'react';

function App() {
  type Circle = {
    area: number;
    posX: 'left' | 'center' | 'right';
  };

  const circlesData: Circle[] = [
    { area: 1, posX: 'left' },
    { area: 2, posX: 'center' },
    { area: 10, posX: 'right' },
  ];

  // The diameter for a circle with area 1 is 7rem (w-28)
  const baseDiameter = 7;

  return (
    <div className="relative w-screen h-screen">
      <div className="absolute bottom-[10vh] w-full flex justify-around items-end px-4">
        {circlesData.map((circle) => {
          const diameter = baseDiameter * Math.sqrt(circle.area);
          const style = {
            width: `${diameter}rem`,
            height: `${diameter}rem`,
          };

          // Adjust font size based on circle size
          const fontSize = 1.5 * Math.sqrt(circle.area);

          return (
            <div
              key={circle.area}
              style={style}
              className="bg-gray-500 rounded-full flex justify-center items-center text-black font-bold"
            >
              <span style={{ fontSize: `${fontSize}rem`, lineHeight: '1' }}>
                {circle.area}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
