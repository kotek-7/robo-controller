import React from "react";

export default function Title(props: { children: React.ReactNode }) {
  return (
    <h1 className="text-cyberblue text-5xl text-center font-[Anta] shadow-xl [text-shadow:0_0_20px_#aaf]">
      {props.children}
    </h1>
  );
}
