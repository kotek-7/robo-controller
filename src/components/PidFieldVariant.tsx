import { Animated, Animator } from "@arwes/react";

export default function PidFieldVariant(props: { label: string; value: number }) {
  return (
    <Animator>
      <div className="relative w-18 h-10 flex items-center justify-center">
        <Animated
          as="div"
          animated={["fade"]}
          className="flex flex-col items-center justify-center gap-0.5"
        >
          <div className="text-accent text-xs">{props.label}</div>
          <div className="text-text text-sm">{props.value}</div>
        </Animated>
      </div>
    </Animator>
  );
}
