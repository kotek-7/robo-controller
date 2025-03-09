import { Animated, Animator, cx } from "@arwes/react";

export default function Connected(props: { connected: boolean }) {
  return (
    <Animator duration={{ delay: 1.0 }}>
      <Animated
        as="div"
        animated={[["opacity", 0, 1], ["y", 10, 0],]}
        className={cx("text-center", props.connected ? "text-accent" : "text-primary")}
      >
        {props.connected ? "Connected" : "Disconnected"}
      </Animated>
    </Animator>
  );
}
