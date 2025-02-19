import { Animator } from "@arwes/react";
import { ReactNode } from "react";
import Button from "./Button";

export default function Buttons(props: {buttons: {icon: ReactNode; children: ReactNode; onClick: () => void}[]}) {
  return (
    <Animator
      combine
      manager="stagger"
      duration={{ stagger: 0.1 }}
    >
      <div className="flex gap-4 mt-6 flex-wrap">
        {props.buttons.map((button, index) => (
          <Button key={index} {...button} />
        ))}
      </div>
    </Animator>
  );
}
