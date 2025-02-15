import { useEffect, useRef, useState } from "react";
import { fetchRxCharacteristic, searchDevice } from "./logics/bluetooth";
import Button from "./components/Button";
import { useNavigate } from "react-router";
import JoystickFields from "./components/JoystickFields";
import Title from "./components/Titile";
import Console from "./components/Console";
import SmallButton from "./components/SmallButton";
import Connected from "./components/Connected";

export default function Monitor() {
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

  const [consoleTexts, setConsoleTexts] = useState<Array<string>>([]);
  const [autoScroll, setAutoScroll] = useState(true);
  const consoleRef = useRef<HTMLDivElement>(null);
  const [bluetoothDevice, setBluetoothDevice] = useState<BluetoothDevice>();
  const navigate = useNavigate();

  useEffect(() => {
    if (consoleRef.current && autoScroll) {
      console.log("scroll");
      consoleRef.current.scrollTop =
        consoleRef.current.scrollHeight - consoleRef.current.clientHeight;
    }
  }, [consoleTexts]);

  async function onSearchDeviceButtonClick() {
    const device = await searchDevice();
    setBluetoothDevice(device);
    const server = await device.gatt?.connect();
    if (server === undefined) {
      return;
    }
    const rxCharacteristic = await fetchRxCharacteristic(server);
    rxCharacteristic.addEventListener("characteristicvaluechanged", (event) => {
      const json = new TextDecoder().decode(
        (event.target as BluetoothRemoteGATTCharacteristic).value
      );
      const value = JSON.parse(json);
      onCharacteristicValueChange(value);
      console.log(value);
    });
    rxCharacteristic.startNotifications();
  }

  function onDebugButtonClick() {
    setConsoleTexts((prev) => [...prev, "debug"]);
  }

  function onCharacteristicValueChange(value: any) {
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
    } else if (value.nextLine) {
      setConsoleTexts((prev) => [...prev, value.nextLine]);
    }
  }

  return (
    <div>
      <div className="p-8 bg-radial from-slate-800 to-slate-950 font-[Titillium_Web] font-light min-h-[100vh]">
        <div className="flex flex-col gap-1">
          <Title>MONITOR</Title>
          <Connected connected={bluetoothDevice?.gatt?.connected ?? false} />
        </div>
        <div className="flex gap-4 mt-6">
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
        <div className="mt-6 flex justify-between">
          <div className="p-4 bg-cyberblue/5 w-fit h-fit">
            <div className="text-cyberblue text-center">
              [ joystick fields ]
            </div>
            <div className="flex gap-4 mt-4">
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
          <div className="w-1/2 h-[calc(100vh-16rem)]">
            <Console ref={consoleRef} consoleTexts={consoleTexts} />
            <div className="flex mt-2 gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={autoScroll}
                  onChange={(e) => setAutoScroll(e.target.checked)}
                  className="appearance-none border border-cyberyellow checked:bg-cyberyellow relative w-5 h-5 hover:opacity-90 cursor-pointer"
                />
                <label className="text-cyberblue *:align-middle font-[Titillium_Web] font-light">
                  auto scroll
                </label>
              </div>
              <SmallButton onClick={() => setConsoleTexts([])}>
                clear console
              </SmallButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
