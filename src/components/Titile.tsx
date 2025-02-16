import { Text, Animator } from "@arwes/react";
import React from "react";

export default function Title(props: { children: React.ReactNode }) {
  return (
    <Animator duration={{ enter: 0.3 }}>
      <Text
        as="h1"
        fixed={true}
        className="text-primary text-5xl text-center font-[Anta] shadow-xl [text-shadow:0_0_20px_#aaf]"
      >
        {props.children}
      </Text>
    </Animator>
  );
}
