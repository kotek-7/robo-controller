import { sendJsonData } from "../../logics/bluetooth";
import ControllerButton from "./ControllerButton";
import ControllerButtonLong from "./ControllerButtonLong";

export default function Cone1DcButtons(props: { btTxCharacteristic: BluetoothRemoteGATTCharacteristic | undefined }) {
  return (
    <div>
      <ControllerButtonLong
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
        onPressStart={() => {
          if (props.btTxCharacteristic === undefined) {
            return;
          }
          sendJsonData({ type: "riseConeHand1" }, props.btTxCharacteristic);
        }}
        onPressEnd={() => {
          if (props.btTxCharacteristic === undefined) {
            return;
          }
          sendJsonData({ type: "stopConeHand1" }, props.btTxCharacteristic);
        }}
        className="bottom-64 right-0 w-32 h-32"
      />
      <ControllerButton
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
          sendJsonData({ type: "stopConeHand1" }, props.btTxCharacteristic);
        }}
        className="bottom-40 right-0 w-32 h-16"
      />
      <ControllerButtonLong
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
        onPressStart={() => {
          if (props.btTxCharacteristic === undefined) {
            return;
          }
          sendJsonData({ type: "declineConeHand1" }, props.btTxCharacteristic);
        }}
        onPressEnd={() => {
          if (props.btTxCharacteristic === undefined) {
            return;
          }
          sendJsonData({ type: "stopConeHand1" }, props.btTxCharacteristic);
        }}
        className="bottom-0 right-0 w-32 h-32"
      />
    </div>
  );
}
