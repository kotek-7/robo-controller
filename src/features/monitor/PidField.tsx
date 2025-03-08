import { Animated, Animator } from "@arwes/react";

export default function PidField(props: { label: string; value: number }) {
  return (
    <Animator>
      <div className="relative w-18 items-center justify-center">
        <Animated
          as="div"
          animated={["fade"]}
          className="flex flex-col items-center justify-center gap-0.5"
        >
          <div className="text-primary text-xs">{props.label}</div>
          <div className="text-text text-sm">{props.value}</div>
        </Animated>
      </div>
    </Animator>
  );
}
