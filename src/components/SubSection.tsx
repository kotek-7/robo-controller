import { Animated, Animator, cx, Text } from "@arwes/react";

export default function SubSection(props: { title: string; indent?: boolean; children: React.ReactNode }) {
  return (
    <Animator>
      <Animated
        as="section"
        animated={["fade"]}
        className="w-fit h-fit"
      >
        <div className="flex items-center">
          <Text className="text-primary text-sm">{props.title}</Text>
        </div>
        <hr className="border-primary/30" />
        <div className={cx("mt-2", props.indent ? "ml-4" : "")}>{props.children}</div>
      </Animated>
    </Animator>
  );
}
