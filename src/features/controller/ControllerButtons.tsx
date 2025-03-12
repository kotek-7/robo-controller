import { Animator } from "@arwes/react";
import ControllerButton from "./ControllerButton";
import { sendJsonData } from "../../logics/bluetooth";
import Cone0Buttons from "./Cone0Buttons";
import Cone1Buttons from "./Cone1Buttons";
import BallButtons from "./BallButtons";
import BallDcButtons from "./BallDcButtons";
import Cone1DcButtons from "./Cone1DcButtons";
import Cone0DcButtons from "./Cone0DcButtons";

export default function ControllerButtons(props: {
  btTxCharacteristic: BluetoothRemoteGATTCharacteristic | undefined;
}) {
  return (
    <Animator
      duration={{ stagger: 0.03, delay: 0.25 }}
      manager="stagger"
      combine
    >
      <div className="absolute bottom-[20%] left-52">
        <Cone0Buttons btTxCharacteristic={props.btTxCharacteristic} />
      </div>
      <div className="absolute bottom-[10%] left-12">
        <Cone0DcButtons btTxCharacteristic={props.btTxCharacteristic} />
      </div>
      <div className="absolute bottom-[20%] right-52">
        <Cone1Buttons btTxCharacteristic={props.btTxCharacteristic} />
      </div>
      <div className="absolute bottom-[10%] right-12">
        <Cone1DcButtons btTxCharacteristic={props.btTxCharacteristic} />
      </div>
      <div className="absolute bottom-[20%] left-90">
        <BallButtons btTxCharacteristic={props.btTxCharacteristic} />
      </div>
      <div className="absolute bottom-[20%] right-90">
        <BallDcButtons btTxCharacteristic={props.btTxCharacteristic} />
      </div>
      <ControllerButton
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="var(--color-primary)"
          >
            <path d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-200v-80h320v80H320Zm10-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Zm24-80h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z" />
          </svg>
        }
        onClick={() => {
          if (props.btTxCharacteristic === undefined) {
            return;
          }
          sendJsonData({ type: "ryuguLightUp" }, props.btTxCharacteristic);
        }}
        className="top-[calc(10%-1rem)] right-60 w-32 h-24"
      ></ControllerButton>
    </Animator>
  );
}
