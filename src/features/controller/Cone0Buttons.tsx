import { sendJsonData } from "../../logics/bluetooth";
import ControllerButton from "./ControllerButton";

export default function Cone0Buttons(props: { btTxCharacteristic: BluetoothRemoteGATTCharacteristic | undefined }) {
  return (
    <div>
      <ControllerButton
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 -960 960 960"
            width="32px"
            fill="#5f6368"
          >
            <path d="M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z" />
          </svg>
        }
        onClick={() => {
          if (props.btTxCharacteristic === undefined) {
            return;
          }
          sendJsonData({ type: "openConeHand0" }, props.btTxCharacteristic);
        }}
        className="bottom-40 left-0 w-28 h-32"
      >
        Open 0
      </ControllerButton>
      <ControllerButton
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 -960 960 960"
            width="32px"
            fill="#5f6368"
          >
            <path d="M440-440v240h-80v-160H200v-80h240Zm160-320v160h160v80H520v-240h80Z" />
          </svg>
        }
        onClick={() => {
          if (props.btTxCharacteristic === undefined) {
            return;
          }
          sendJsonData({ type: "closeConeHand0" }, props.btTxCharacteristic);
        }}
        className="bottom-0 left-0 w-28 h-32"
      >
        Close 0
      </ControllerButton>
    </div>
  );
}
