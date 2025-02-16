import { Animated, Animator, cx, FrameCorners } from "@arwes/react";
import SmallButton from "./SmallButton";

export default function Console(props: {
  autoScroll: boolean;
  setAutoScroll: (to: boolean) => void;
  consoleTexts: Array<string>;
  setConsoleTexts: (texts: Array<string>) => void;
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <Animator>
      <div
        className="relative font-mono w-full h-full"
      >
        <FrameCorners
          className="fixed inset-0"
          style={{
            // @ts-expect-error css variables
            "--arwes-frames-bg-color": "color-mix(in oklab, var(--color-secondary) 10%, transparent)",
            "--arwes-frames-line-color": "var(--color-primary)",
          }}
        />
        <Animated
          animated={["fade"]}
          ref={props.ref}
          className="relative text-text py-4 px-6 overflow-y-auto h-full"
        >
          {props.consoleTexts.map((text, index) => {
            return <div key={index}>{text}</div>;
          })}
        </Animated>
      </div>
      <Animator>
        <div className="flex mt-2 gap-4">
          <Animated
            animated={["fade"]}
            className="flex items-center gap-2"
          >
            <input
              type="checkbox"
              checked={props.autoScroll}
              onChange={(e) => props.setAutoScroll(e.target.checked)}
              className={cx(
                "appearance-none border border-accent relative w-5 h-5 cursor-pointer transition-all",
                "checked:bg-accent",
                "hover:opacity-90",
              )}
            />
            <label className="*:align-middle font-[Titillium_Web] font-light text-primary">auto scroll</label>
          </Animated>
          <SmallButton onClick={() => props.setConsoleTexts([])}>clear console</SmallButton>
        </div>
      </Animator>
    </Animator>
  );
}
