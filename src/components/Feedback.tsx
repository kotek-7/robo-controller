import { Animated, Animator, FrameOctagon } from "@arwes/react";

export default function Feedback(props: { label: string; value: number; unit: string }) {
  return (
    <Animator>
      <div className="relative">
        <div className="absolute -top-2.5 -left-4.5 -rotate-45 text-primary/70 text-sm">{props.label}</div>
        <div className="relative w-16 h-16 flex items-center justify-center">
          <FrameOctagon
            style={{
              // @ts-expect-error css variables
              "--arwes-frames-bg-color": "color-mix(in oklab, var(--color-secondary) 10%, transparent)",
              "--arwes-frames-line-color": "color-mix(in oklab, var(--color-accent) 70%, transparent)",
            }}
          />
          <Animated
            as="div"
            animated={["fade"]}
            className="relative text-center"
          >
            <div className="text-text text-sm">{props.value}</div>
            <div className="text-secondary text-xs absolute -bottom-[.8rem] left-2">{props.unit}</div>
          </Animated>
        </div>
      </div>
    </Animator>
  );
}
