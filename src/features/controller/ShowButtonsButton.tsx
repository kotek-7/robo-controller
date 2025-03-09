import { Animated, Animator, cx, FrameLines } from "@arwes/react";

export default function ShowButtonsButton(props: {
  showButtons: boolean;
  setShowButtons: (value: React.SetStateAction<boolean>) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Animator
        unmountOnExited
        condition={() => !props.showButtons}
        duration={{ "delay": 0.1 }}
      >
        <Animated
          as="div"
          animated={["flicker"]}
          className="absolute top-6 left-6 z-20 cursor-pointer px-4 py-2 w-fit flex items-center group"
          onClick={() => props.setShowButtons(true)}
        >
          <FrameLines
            style={{
              // @ts-expect-error css variables
              "--arwes-frames-bg-color": "color-mix(in oklab, var(--color-secondary) 20%, transparent)",
              "--arwes-frames-line-color": "color-mix(in oklab, var(--color-primary) 60%, transparent)",
              "--arwes-frames-deco-color": "var(--color-primary)",
            }}
          />
          <Animated
            as="div"
            animated={["fade"]}
            className={cx(
              "relative text-center text-text  transition-all",
              "group-hover:text-primary group-active:text-primary",
            )}
          >
            Show buttons
          </Animated>
        </Animated>
      </Animator>
      <Animator
        unmountOnExited
        condition={() => props.showButtons}
        combine
      >
        <div
          className="absolute z-20 cursor-pointer p-8" 
          onClick={() => props.setShowButtons(false)}
        />
        <div className="absolute left-6 top-0 w-[40%]">{props.children}</div>
      </Animator>
    </div>
  );
}
