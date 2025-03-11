import { Animator } from "@arwes/react";
import ControllerButton from "./ControllerButton";
import { sendJsonData } from "../../logics/bluetooth";

export default function ResetImuButton(props: { btTxCharacteristic: BluetoothRemoteGATTCharacteristic | undefined }) {
  return (
    <Animator
      duration={{ stagger: 0.03, delay: 0.25 }}
      manager="stagger"
      combine
    >
      <ControllerButton
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="var(--color-primary)"
          >
            <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
          </svg>
        }
        onClick={() => {
          if (props.btTxCharacteristic === undefined) {
            return;
          }
          sendJsonData({ type: "resetImu" }, props.btTxCharacteristic);
        }}
        className="top-[8%] right-12 w-40 h-16"
      >
        Reset IMU
      </ControllerButton>
    </Animator>
  );
}
