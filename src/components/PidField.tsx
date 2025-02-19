import { Animated, Animator, FrameCircle } from "@arwes/react";

export default function PidField(props: { label: string; value: number }) {
  return (
    <Animator>
      <div className="relative w-20 h-20 flex items-center justify-center">
        <FrameCircle
          sideWidth={12}
          strokeWidth={1}
          style={{
            // @ts-expect-error css variables
            "--arwes-frames-bg-color": "color-mix(in oklab, var(--color-secondary) 10%, transparent)",
            "--arwes-frames-line-color": "color-mix(in oklab, var(--color-accent) 40%, transparent)",
            "--arwes-frames-deco-color": "var(--color-accent)",
          }}
        />
        <Animated
          as="div"
          animated={["fade"]}
          className="relative text-center"
        >
          <div className="text-primary text-xs absolute w-12 -top-[1rem] left-1/2 -translate-x-1/2">{props.label}</div>
          <div className="text-text text-sm">{props.value}</div>
        </Animated>
      </div>
    </Animator>
  );
}
