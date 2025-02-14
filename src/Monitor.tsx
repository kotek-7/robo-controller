import { useEffect, useState } from "react";
import {
  fetchRxCharacteristic,
  searchDeviceAndConnect,
} from "./logics/bluetooth";
import Button from "./components/Button";
import { useNavigate } from "react-router";
import JoystickFields from "./components/JoystickFields";

export default function Monitor() {
  useEffect(() => {}, []);

  async function onSearchDeviceButtonClick() {
    const server = await searchDeviceAndConnect();
    if (server === undefined) {
      return;
    }
    const rxCharacteristic = await fetchRxCharacteristic(server);
    rxCharacteristic.addEventListener("characteristicvaluechanged", (event) => {
      const json = new TextDecoder().decode(
        (event.target as BluetoothRemoteGATTCharacteristic).value
      );
      const value = JSON.parse(json);
      console.log(value);

      // 仮の処理
      if (value.side === "l".charCodeAt(0)) { 
        setJoystickLFields({
          x: value.x,
          y: value.y,
          leveledX: value.leveledX,
          leveledY: value.leveledY,
          distance: value.distance,
          angle: value.angle,
        });
      } else if (value.side === "r".charCodeAt(0)) {
        setJoystickRFields({
          x: value.x,
          y: value.y,
          leveledX: value.leveledX,
          leveledY: value.leveledY,
          distance: value.distance,
          angle: value.angle,
        });
      }
    });
    rxCharacteristic.startNotifications();
    setBluetoothRxCharacteristic(rxCharacteristic);
  }

  const [bluetoothRxCharacteristic, setBluetoothRxCharacteristic] =
    useState<BluetoothRemoteGATTCharacteristic>();

  const [joystickLFields, setJoystickLFields] = useState({
    x: 0,
    y: 0,
    leveledX: 0,
    leveledY: 0,
    distance: 0,
    angle: 0,
  });
  const [joystickRFields, setJoystickRFields] = useState({
    x: 0,
    y: 0,
    leveledX: 0,
    leveledY: 0,
    distance: 0,
    angle: 0,
  });
  const navigate = useNavigate();
  return (
    <div>
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
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="M80-600v-160q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v160h-80v-160H160v160H80Zm80 360q-33 0-56.5-23.5T80-320v-200h80v200h640v-200h80v200q0 33-23.5 56.5T800-240H160ZM40-120v-80h880v80H40Zm440-420ZM80-520v-80h240q11 0 21 6t15 16l47 93 123-215q5-9 14-14.5t20-5.5q11 0 21 5.5t15 16.5l49 98h235v80H620q-11 0-21-5.5T584-542l-26-53-123 215q-5 10-15 15t-21 5q-11 0-20.5-6T364-382l-69-138H80Z" />
              </svg>
            }
            onClick={() => {
              console.log("navigate to monitor");
              navigate("/robo-controller");
            }}
          >
            controller
          </Button>
        </div>
        <div className="flex w-full justify-between">
          <JoystickFields
            label="left"
            x={joystickLFields.x.toString()}
            y={joystickLFields.y.toString()}
            leveledX={joystickLFields.leveledX.toString()}
            leveledY={joystickLFields.leveledY.toString()}
            distance={joystickLFields.distance.toString()}
            angle={joystickLFields.angle.toString()}
          />
          <JoystickFields
            label="right"
            x={joystickRFields.x.toString()}
            y={joystickRFields.y.toString()}
            leveledX={joystickRFields.leveledX.toString()}
            leveledY={joystickRFields.leveledY.toString()}
            distance={joystickRFields.distance.toString()}
            angle={joystickRFields.angle.toString()}
          />
        </div>
      </div>
    </div>
  );
}
