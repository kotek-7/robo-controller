import { Animated, Animator, Text } from "@arwes/react";

export default function Section(props: { title: string; children: React.ReactNode }) {
  return (
    <Animator>
      <Animated
        as="section"
        animated={["fade"]}
        className="px-4 pt-4 pb-8 bg-primary/10 w-fit h-fit backdrop-blur-[2px]"
      >
        <div className="flex items-center">
          <div className="w-1 h-4 bg-primary" />
          <Text className="text-primary ml-3 text-sm">{props.title}</Text>
        </div>
        <hr className="border-primary/40 mt-1" />
        <div className="mt-6 px-4">{props.children}</div>
      </Animated>
    </Animator>
  );
}
