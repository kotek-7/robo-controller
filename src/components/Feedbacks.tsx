import { Animator } from "@arwes/react";
import Feedback from "./Feedback";

export default function Feedbacks(props: {
  angle: number;
  rpm: number;
  amp: number;
  temp: number;
}) {
  return (
    <Animator combine manager="stagger" duration={{ stagger: 0.015 }}>
      <div className="flex gap-5 items-center">
        <Feedback
          label="Angle"
          value={props.angle}
          unit="deg"
        />
        <Feedback
          label="Rpm"
          value={props.rpm}
          unit="rpm"
        />
        <Feedback
          label="Amp"
          value={props.amp}
          unit="mA"
        />
        <Feedback
          label="Temp"
          value={props.temp}
          unit="°C"
        />
      </div>
    </Animator>
  );
}
