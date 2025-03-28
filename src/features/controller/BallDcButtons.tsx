import { sendJsonData } from "../../logics/bluetooth";
import ControllerButton from "./ControllerButton";

export default function BallDcButtons(props: { btTxCharacteristic: BluetoothRemoteGATTCharacteristic | undefined }) {
  return (
    <div>
      <ControllerButton
        accent={true}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 -960 960 960"
            width="32px"
            fill="var(--color-primary)"
          >
            <path d="M480-528 296-344l-56-56 320-320 320 320-56 56-184-184Z" />
          </svg>
        }
        onClick={() => {
          if (props.btTxCharacteristic === undefined) {
            return;
          }
          sendJsonData({ type: "riseConeHand2" }, props.btTxCharacteristic);
        }}
        className="bottom-64 right-0 w-32 h-32"
      ></ControllerButton>
      <ControllerButton
        accent={true}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 -960 960 960"
            width="32px"
            fill="var(--color-primary)"
          >
            <path d="M320-640v320-320Zm-80 400v-480h480v480H320Zm80-80h320v-320H320v320Z" />
          </svg>
        }
        onClick={() => {
          if (props.btTxCharacteristic === undefined) {
            return;
          }
          sendJsonData({ type: "stopConeHand2" }, props.btTxCharacteristic);
        }}
        className="bottom-40 right-0 w-32 h-16"
      ></ControllerButton>
      <ControllerButton
        accent={true}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 -960 960 960"
            width="32px"
            fill="var(--color-primary)"
          >
            <path d="M480-344 320-584l56-56 184 184 184-184 56 56-320 320Z" />
          </svg>
        }
        onClick={() => {
          if (props.btTxCharacteristic === undefined) {
            return;
          }
          sendJsonData({ type: "declineConeHand2" }, props.btTxCharacteristic);
        }}
        className="bottom-0 right-0 w-32 h-32"
      ></ControllerButton>
    </div>
  );
}
