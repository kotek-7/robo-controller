import { Animated, Animator, cx, FrameOctagon } from "@arwes/react";
import { ReactNode, useState } from "react";

export default function ControllerButtonLong(props: {
  icon: ReactNode;
  children?: ReactNode;
  className: string;
  onPressStart: () => void;
  onPressEnd: () => void;
}) {
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
        className={cx(
          "absolute group cursor-pointer font-normal text-text text-lg py-2 flex justify-center items-center gap-2 z-20",
          props.className,
        )}
        onMouseDown={() => {
          setStrokeWidth(3);
          props.onPressStart();
        }}
        onMouseUp={() => {
          setStrokeWidth(1);
          props.onPressEnd();
        }}
        onTouchStart={() => {
          setStrokeWidth(3);
          props.onPressStart();
        }}
        onTouchEnd={() => {
          setStrokeWidth(1);
          props.onPressEnd();
        }}
      >
        <Animator>
          <Animated
            animated={[["rotate", -45, 0]]}
            className={cx("group-hover:-translate-y-0.5 group-active:-translate-y-0.5 transition-all")}
          >
            {props.icon}
          </Animated>
        </Animator>
        <Animator>
          <div className={cx(props.children === undefined ? "hidden" : "")}>
            <Animated
              animated={["flicker"]}
              className="group-hover:-translate-y-0.5 group-active:-translate-y-0.5 transition-all"
            >
              {props.children}
            </Animated>
          </div>
        </Animator>
        <Animator duration={{ enter: 0.6 }}>
          <FrameOctagon
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
