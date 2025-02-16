import { Dots, GridLines, MovingLines } from "@arwes/react";

export default function Background() {
  return (
    <div className="fixed inset-0 bg-radial from-slate-800 to-bg -z-10">
      <GridLines
        lineColor="hsla(180, 100%, 75%, 0.05)"
        distance={30}
      />
      <Dots
        color="hsla(180, 100%, 75%, 0.05)"
        distance={30}
      />
      <MovingLines
        lineColor="hsla(180, 100%, 75%, 0.07)"
        distance={30}
        sets={20}
      />
    </div>
  );
}
