import { Animator } from "@arwes/react";
import PidField from "./PidField";
import PidFieldVariant from "./PidFieldVariant";

export default function PidFields(props: {
  p: number;
  i: number;
  d: number;
  output: number;
  targetRpm: number;
  error: number;
}) {
  return (
    <Animator combine manager="stagger" duration={{ stagger: 0.015 }}>
      <div className="flex gap-3 items-center">
        <PidField
          label="Prop"
          value={props.p}
        />
        <PidField
          label="Integ"
          value={props.i}
        />
        <PidField
          label="Deriv"
          value={props.d}
        />
        <div />
        <PidFieldVariant
          label="Output"
          value={props.output}
        />
        <PidFieldVariant
          label="Target"
          value={props.targetRpm}
        />
        <PidFieldVariant
          label="Error"
          value={props.error}
        />
      </div>
    </Animator>
  );
}
