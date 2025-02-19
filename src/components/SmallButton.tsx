import { Animated, cx } from "@arwes/react";

export default function SmallButton(props: { icon?: React.ReactNode; children: React.ReactNode; onClick: () => void }) {
  return (
    <Animated
      as="button"
      animated={["fade"]}
      className={cx(
        "font-normal border border-primary text-primary py-1 px-4 flex gap-2 cursor-pointer transition-all text-sm",
        "hover:bg-primary/10",
        "active:bg-primary/20"
      )}
      onClick={props.onClick}
    >
      {props.icon}
      <span className="">{props.children}</span>
    </Animated>
  );
}
