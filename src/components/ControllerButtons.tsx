import { Animator } from "@arwes/react";
import ControllerButton from "./ControllerButton";
import { sendJsonData } from "../logics/bluetooth";

export default function ControllerButtons(props: {
  btTxCharacteristic: BluetoothRemoteGATTCharacteristic | undefined;
}) {
  return (
    <Animator
      duration={{ stagger: 0.1, delay: 0.25 }}
      manager="stagger"
      combine
    >
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
        className="bottom-[60%] left-12 w-28 h-16"
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
        className="bottom-[calc(60%-5rem)] left-12 w-28 h-16"
      >
        Close 0
      </ControllerButton>
      <ControllerButton
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="var(--color-primary)"
          >
            <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
          </svg>
        }
        onClick={() => {
          if (props.btTxCharacteristic === undefined) {
            return;
          }
          sendJsonData({ type: "riseConeHand0" }, props.btTxCharacteristic);
        }}
        className="bottom-[calc(60%+2rem)] left-42 w-16 h-16"
      />
      <ControllerButton
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="var(--color-primary)"
          >
            <path d="M320-640v320-320Zm-80 400v-480h480v480H240Zm80-80h320v-320H320v320Z" />
          </svg>
        }
        onClick={() => {
          if (props.btTxCharacteristic === undefined) {
            return;
          }
          sendJsonData({ type: "stopConeHand0" }, props.btTxCharacteristic);
        }}
        className="bottom-[calc(60%-3rem)] left-42 w-16 h-16"
      />
      <ControllerButton
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="var(--color-primary)"
          >
            <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
          </svg>
        }
        onClick={() => {
          if (props.btTxCharacteristic === undefined) {
            return;
          }
          sendJsonData({ type: "declineConeHand0" }, props.btTxCharacteristic);
        }}
        className="bottom-[calc(60%-8rem)] left-42 w-16 h-16"
      />
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
          sendJsonData({ type: "openConeHand1" }, props.btTxCharacteristic);
        }}
        className="bottom-[calc(60%-2rem)] left-60 w-28 h-16"
      >
        Open 1
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
          sendJsonData({ type: "closeConeHand1" }, props.btTxCharacteristic);
        }}
        className="bottom-[calc(60%-7rem)] left-60 w-28 h-16"
      >
        Close 1
      </ControllerButton>
      <ControllerButton
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="var(--color-primary)"
          >
            <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
          </svg>
        }
        onClick={() => {
          if (props.btTxCharacteristic === undefined) {
            return;
          }
          sendJsonData({ type: "riseConeHand1" }, props.btTxCharacteristic);
        }}
        className="bottom-[calc(60%)] left-92 w-16 h-16"
      />
      <ControllerButton
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="var(--color-primary)"
          >
            <path d="M320-640v320-320Zm-80 400v-480h480v480H240Zm80-80h320v-320H320v320Z" />
          </svg>
        }
        onClick={() => {
          if (props.btTxCharacteristic === undefined) {
            return;
          }
          sendJsonData({ type: "stopConeHand1" }, props.btTxCharacteristic);
        }}
        className="bottom-[calc(60%-5rem)] left-92 w-16 h-16"
      />
      <ControllerButton
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="var(--color-primary)"
          >
            <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
          </svg>
        }
        onClick={() => {
          if (props.btTxCharacteristic === undefined) {
            return;
          }
          sendJsonData({ type: "declineConeHand1" }, props.btTxCharacteristic);
        }}
        className="bottom-[calc(60%-10rem)] left-92 w-16 h-16"
      />
      <ControllerButton
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="var(--color-primary)"
          >
            <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
          </svg>
        }
        onClick={() => {
          if (props.btTxCharacteristic === undefined) {
            return;
          }
          sendJsonData({ type: "riseConeHand2" }, props.btTxCharacteristic);
        }}
        className="bottom-[calc(60%+2rem)] right-78 w-16 h-16"
      ></ControllerButton>
      <ControllerButton
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="var(--color-primary)"
          >
            <path d="M320-640v320-320Zm-80 400v-480h480v480H240Zm80-80h320v-320H320v320Z" />
          </svg>
        }
        onClick={() => {
          if (props.btTxCharacteristic === undefined) {
            return;
          }
          sendJsonData({ type: "stopConeHand2" }, props.btTxCharacteristic);
        }}
        className="bottom-[calc(60%-3rem)] right-78 w-16 h-16"
      ></ControllerButton>
      <ControllerButton
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="var(--color-primary)"
          >
            <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
          </svg>
        }
        onClick={() => {
          if (props.btTxCharacteristic === undefined) {
            return;
          }
          sendJsonData({ type: "declineConeHand2" }, props.btTxCharacteristic);
        }}
        className="bottom-[calc(60%-8rem)] right-78 w-16 h-16"
      ></ControllerButton>
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
          sendJsonData({ type: "releaseBall" }, props.btTxCharacteristic);
        }}
        className="bottom-[calc(60%)] right-48 w-28 h-16"
      >
        Release
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
          sendJsonData({ type: "grabBall" }, props.btTxCharacteristic);
        }}
        className="bottom-[calc(60%-5rem)] right-48 w-28 h-16"
      >
        Grab
      </ControllerButton>
      <ControllerButton
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48px"
            viewBox="0 -960 960 960"
            width="48px"
            fill="#5f6368"
          >
            <path d="M166-120v-94h127L187-576q-32-15-50-40.5T119-684q0-47 34.5-81.5T235-800q44 0 73 23.5t39 62.5h146v-59q0-12 9-21t21-9q11 0 18.5 8.5T549-775l75-72q8-8 20.5-10.5T670-854l158 76q9 5 12.5 14t-1.5 19q-5 10-14.5 12t-18.5-3l-155-75-98 99v52l98 103 155-76q10-5 19-2.5t14 12.5q5 10 1.5 20T827-588l-153 72q-14 7-27 6.5T624-520l-75-72q0 14-7.5 21t-18.5 7q-12 0-21-9t-9-21v-60H345q0 12-6.5 24.5T323-609l205 395h158v94H166Zm69-508q24 0 40-16t16-40q0-24-16-40t-40-16q-24 0-40 16t-16 40q0 24 16 40t40 16Zm124 414h102L272-581q-3 2-10 4t-11 3l108 360Zm102 0Z" />
          </svg>
        }
        onClick={() => {
          if (props.btTxCharacteristic === undefined) {
            return;
          }
          sendJsonData({ type: "throwBall" }, props.btTxCharacteristic);
        }}
        className="bottom-[calc(60%-1rem)] right-12 w-32 h-24"
      ></ControllerButton>
    </Animator>
  );
}
