import { Animated, Animator, cx, FrameUnderline } from "@arwes/react";
import { ReactNode, useState } from "react";

export default function Button(props: { icon: ReactNode; children: ReactNode; onClick: () => void }) {
  const [strokeWidth, setStrokeWidth] = useState(1);
  return (
    <Animator
      combine
      manager="stagger"
      duration={{ stagger: 0.2 }}
    >
      <Animated
        as="button"
        animated={["fade"]}
        id="search-button"
        className={cx("relative group cursor-pointer font-normal w-fit text-text py-1 pl-4 pr-8 flex gap-4 z-20")}
        onClick={props.onClick}
        onMouseEnter={() => setStrokeWidth(3)}
        onMouseLeave={() => setStrokeWidth(1)}
        onTouchStart={() => setStrokeWidth(3)}
        onTouchEnd={() => setStrokeWidth(1)}
      >
        <Animator>
          <Animated
            animated={[["rotate", -45, 0]]}
            className="group-hover:-translate-y-0.5 group-active:-translate-y-0.5 transition-all"
          >
            {props.icon}
          </Animated>
        </Animator>
        <Animator>
          <Animated
            animated={["flicker"]}
            className="group-hover:-translate-y-0.5 group-active:-translate-y-0.5 transition-all"
          >
            {props.children}
          </Animated>
        </Animator>
        <Animator duration={{ enter: 0.6 }}>
          <FrameUnderline
            style={{
              // @ts-expect-error css variables
              "--arwes-frames-bg-color": "color-mix(in oklab, var(--color-secondary) 20%, transparent)",
              "--arwes-frames-line-color": "var(--color-primary)",
            }}
            strokeWidth={strokeWidth}
          />
        </Animator>
      </Animated>
    </Animator>
  );
}
