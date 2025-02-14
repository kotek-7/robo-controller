import { useEffect, useState } from "react";
import Button from "./components/Button";
import JoystickParameters from "./components/JoystickParameters";
import JoystickController from "joystick-controller";
import {
  fetchTxCharacteristic,
  searchDeviceAndConnect,
  sendJsonData,
} from "./logics/bluetooth";

export default function App() {
  useEffect(() => {
    const joystickL = new JoystickController(
      {
        maxRange: 80,
        radius: 70,
        joystickRadius: 40,
        hideContextMenu: true,
        distortion: true,
        controllerClass: "border-2 border-cyberblue !bg-none",
        joystickClass: "!bg-blue-200 !bg-none",
        dynamicPosition: true,
        dynamicPositionTarget: document.getElementById("joystick-l-field"),
      },
      (data) => {
        setJoystickLParams({
          x: data.x,
          y: data.y,
          leveledX: data.leveledX,
          leveledY: data.leveledY,
          distance: data.distance,
          angle: data.angle,
        });
      }
    );
    const joystickR = new JoystickController(
      {
        maxRange: 80,
        radius: 70,
        joystickRadius: 40,
        hideContextMenu: true,
        distortion: true,
        controllerClass: "border-2 border-cyberblue !bg-none",
        joystickClass: "!bg-blue-200 !bg-none",
        dynamicPosition: true,
        dynamicPositionTarget: document.getElementById("joystick-r-field"),
      },
      (data) => {
        setJoystickRParams({
          x: data.x,
          y: data.y,
          leveledX: data.leveledX,
          leveledY: data.leveledY,
          distance: data.distance,
          angle: data.angle,
        });
      }
    );
  }, []);

  async function onSearchDeviceButtonClick() {
    const server = await searchDeviceAndConnect();
    setBluetoothServer(server);
    if (server === undefined) {
      return;
    }
    const txCharacteristic = await fetchTxCharacteristic(server);
    setBluetoothTxCharacteristic(txCharacteristic);
  }
  async function onDebugButtonClick() {
    const encoder = new TextEncoder();
    const string = "test";
    const txBuf = encoder.encode(string);
    console.log("sending: ");
    console.log(txBuf);
    await bluetoothTxCharacteristic?.writeValueWithoutResponse(txBuf);
  }

  const [bluetoothServer, setBluetoothServer] =
    useState<BluetoothRemoteGATTServer>();
  const [bluetoothTxCharacteristic, setBluetoothTxCharacteristic] =
    useState<BluetoothRemoteGATTCharacteristic>();

  const [joystickLParams, setJoystickLParams] = useState({
    x: 0,
    y: 0,
    leveledX: 0,
    leveledY: 0,
    distance: 0,
    angle: 0,
  });
  const [joystickRParams, setJoystickRParams] = useState({
    x: 0,
    y: 0,
    leveledX: 0,
    leveledY: 0,
    distance: 0,
    angle: 0,
  });
  useEffect(() => {
    if (bluetoothTxCharacteristic === undefined) {
      return;
    }
    let txData = {
      side: "l",
      ...joystickLParams,
    };
    sendJsonData(txData, bluetoothTxCharacteristic);
  }, [joystickLParams]);
  useEffect(() => {
    if (bluetoothTxCharacteristic === undefined) {
      return;
    }
    let txData = {
      side: "r",
      ...joystickRParams,
    };
    sendJsonData(txData, bluetoothTxCharacteristic);
  }, [joystickRParams]);

  return (
    <div className="p-8 bg-radial from-slate-800 to-slate-950 font-mono h-[100vh] select-none">
      <div
        id="joystick-l-field"
        className="absolute top-0 left-0 w-1/2 h-[100vh] cursor-grab"
      ></div>
      <div
        id="joystick-r-field"
        className="absolute top-0 right-0 w-1/2 h-[100vh] cursor-grab"
      ></div>
      <div className="flex gap-4">
        <Button
          onClick={onSearchDeviceButtonClick}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          }
        >
          search device
        </Button>
        <Button
          onClick={onDebugButtonClick}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="m234-480-12-60q-12-5-22.5-10.5T178-564l-58 18-40-68 46-40q-2-13-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T222-820l12-60h80l12 60q12 5 22.5 10.5T370-796l58-18 40 68-46 40q2 13 2 26t-2 26l46 40-40 68-58-18q-11 8-21.5 13.5T326-540l-12 60h-80Zm40-120q33 0 56.5-23.5T354-680q0-33-23.5-56.5T274-760q-33 0-56.5 23.5T194-680q0 33 23.5 56.5T274-600ZM592-40l-18-84q-17-6-31.5-14.5T514-158l-80 26-56-96 64-56q-2-18-2-36t2-36l-64-56 56-96 80 26q14-11 28.5-19.5T574-516l18-84h112l18 84q17 6 31.5 14.5T782-482l80-26 56 96-64 56q2 18 2 36t-2 36l64 56-56 96-80-26q-14 11-28.5 19.5T722-124l-18 84H592Zm56-160q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" />
            </svg>
          }
        >
          debug
        </Button>
      </div>
      <div className="flex w-full justify-between">
        <JoystickParameters
          label="left"
          x={joystickLParams.x.toString()}
          y={joystickLParams.y.toString()}
          leveledX={joystickLParams.leveledX.toString()}
          leveledY={joystickLParams.leveledY.toString()}
          distance={joystickLParams.distance.toString()}
          angle={joystickLParams.angle.toString()}
        />
        <JoystickParameters
          label="right"
          x={joystickRParams.x.toString()}
          y={joystickRParams.y.toString()}
          leveledX={joystickRParams.leveledX.toString()}
          leveledY={joystickRParams.leveledY.toString()}
          distance={joystickRParams.distance.toString()}
          angle={joystickRParams.angle.toString()}
        />
      </div>
    </div>
  );
}
