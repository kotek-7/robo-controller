import { ReactNode } from "react";

export default function Button(props: {
  icon: ReactNode;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <div>
      <button
        id="search-button"
        className="relative cursor-pointer font-normal text-slate-950 py-1 px-4 flex *:z-10 before:w-full before:h-full before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-primary before:-skew-x-12 hover:before:opacity-70 before:transition-all"
        onClick={props.onClick}
      >
        {props.icon}
        <span className="ml-2">{props.children}</span>
      </button>
    </div>
  );
}
