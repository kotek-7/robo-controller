import { cx } from "@arwes/react";

export default function RoboAngle(props: { yaw: number }) {
  return (
    <div className="relative w-20">
      <div
        className={cx("absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2")}
        style={{ transform: `rotate(${props.yaw}deg)` }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="var(--color-primary)"
        >
          <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
        </svg>
      </div>
    </div>
  );
}
