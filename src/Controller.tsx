import { useEffect, useState } from "react";
import JoystickFields from "./components/JoystickFields";
import JoystickController from "joystick-controller";
import { fetchTxCharacteristic, searchDevice, sendJsonData } from "./logics/bluetooth";
import { useJoystickFields } from "./hooks/useJoystickFields";
import { useNavigate } from "react-router";
import Title from "./components/Titile";
import Connected from "./components/Connected";
import { Animated, Animator } from "@arwes/react";
import Background from "./components/Background";
import Buttons from "./components/Buttons";
import ShowButtonsButton from "./components/ShowButtonsButton";
import ControllerButton from "./components/ControllerButton";

export default function Controller() {
  const { joystickLFields, setJoystickLFields, joystickRFields, setJoystickRFields } = useJoystickFields(
    (joystickLFields, joystickRFields) => {
      if (bluetoothTxCharacteristic === undefined) {
        return;
      }

      let txDataL = {
        type: "joystick",
        side: "l",
        ...joystickLFields,
      };
      let txDataR = {
        type: "joystick",
        side: "r",
        ...joystickRFields,
      };
      (async () => {
        await sendJsonData(txDataL, bluetoothTxCharacteristic);
        await sendJsonData(txDataR, bluetoothTxCharacteristic);
      })();

      console.log("sent data: ");
      console.log(txDataL);
      console.log(txDataR);
    },
  );
  useEffect(() => {
    const joystickL = new JoystickController(
      {
        maxRange: 80,
        radius: 70,
        joystickRadius: 40,
        hideContextMenu: true,
        distortion: true,
        controllerClass: "border-2 border-primary !bg-none",
        joystickClass: "!bg-primary !bg-none",
        dynamicPosition: true,
        dynamicPositionTarget: document.getElementById("joystick-l-field"),
      },
      (data) => {
        setJoystickLFields({
          x: data.x,
          y: data.y,
          leveledX: data.leveledX,
          leveledY: data.leveledY,
          distance: data.distance,
          angle: data.angle,
        });
      },
    );
    const joystickR = new JoystickController(
      {
        maxRange: 80,
        radius: 70,
        joystickRadius: 40,
        hideContextMenu: true,
        distortion: true,
        controllerClass: "border-2 border-primary !bg-none",
        joystickClass: "!bg-primary !bg-none",
        dynamicPosition: true,
        dynamicPositionTarget: document.getElementById("joystick-r-field"),
      },
      (data) => {
        setJoystickRFields({
          x: data.x,
          y: data.y,
          leveledX: data.leveledX,
          leveledY: data.leveledY,
          distance: data.distance,
          angle: data.angle,
        });
      },
    );
    return () => {
      joystickL.destroy();
      joystickR.destroy();
    };
  }, []);

  async function onSearchDeviceButtonClick() {
    const device = await searchDevice().catch((e) => {
      console.error(e);
      bluetoothDevice?.gatt?.disconnect();
      return undefined;
    });
    if (device === undefined) {
      return;
    }
    setDeviceConnected(true);
    device.addEventListener("gattserverdisconnected", () => {
      setDeviceConnected(false);
    });
    setBluetoothDevice(device);
    const server = await device.gatt?.connect();
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

  function onMonitorButtonClick() {
    bluetoothDevice?.gatt?.disconnect();
    navigate("/monitor/");
  }

  function onDisconnectButtonClick() {
    bluetoothDevice?.gatt?.disconnect();
  }

  const [bluetoothDevice, setBluetoothDevice] = useState<BluetoothDevice>();
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [bluetoothTxCharacteristic, setBluetoothTxCharacteristic] = useState<BluetoothRemoteGATTCharacteristic>();

  const [showButtons, setShowButtons] = useState(false);
  const [showJoystickFields, setShowJoystickFields] = useState(false);

  const navigate = useNavigate();

  const buttons = [
    {
      onClick: onSearchDeviceButtonClick,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
        >
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
        </svg>
      ),
      children: "search device",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
        >
          <path d="M792-56 624-224 480-80h-40v-304L256-200l-56-56 196-196L56-792l56-56 736 736-56 56ZM520-234l46-46-46-46v92Zm44-274-56-56 88-88-76-74v174l-80-80v-248h40l228 228-144 144Z" />
        </svg>
      ),
      children: "disconnect",
      onClick: onDisconnectButtonClick,
    },
    {
      onClick: onDebugButtonClick,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
        >
          <path d="m234-480-12-60q-12-5-22.5-10.5T178-564l-58 18-40-68 46-40q-2-13-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T222-820l12-60h80l12 60q12 5 22.5 10.5T370-796l58-18 40 68-46 40q2 13 2 26t-2 26l46 40-40 68-58-18q-11 8-21.5 13.5T326-540l-12 60h-80Zm40-120q33 0 56.5-23.5T354-680q0-33-23.5-56.5T274-760q-33 0-56.5 23.5T194-680q0 33 23.5 56.5T274-600ZM592-40l-18-84q-17-6-31.5-14.5T514-158l-80 26-56-96 64-56q-2-18-2-36t2-36l-64-56 56-96 80 26q14-11 28.5-19.5T574-516l18-84h112l18 84q17 6 31.5 14.5T782-482l80-26 56 96-64 56q2 18 2 36t-2 36l64 56-56 96-80-26q-14 11-28.5 19.5T722-124l-18 84H592Zm56-160q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" />
        </svg>
      ),
      children: "debug",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
        >
          <path d="M80-600v-160q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v160h-80v-160H160v160H80Zm80 360q-33 0-56.5-23.5T80-320v-200h80v200h640v-200h80v200q0 33-23.5 56.5T800-240H160ZM40-120v-80h880v80H40Zm440-420ZM80-520v-80h240q11 0 21 6t15 16l47 93 123-215q5-9 14-14.5t20-5.5q11 0 21 5.5t15 16.5l49 98h235v80H620q-11 0-21-5.5T584-542l-26-53-123 215q-5 10-15 15t-21 5q-11 0-20.5-6T364-382l-69-138H80Z" />
        </svg>
      ),
      children: "monitor",
      onClick: onMonitorButtonClick,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      ),
      children: "close",
      onClick: () => setShowButtons(false),
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
        >
          <path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z" />
        </svg>
      ),
      children: "show joystick fields",
      onClick: () => setShowJoystickFields(!showJoystickFields),
    },
  ];
  return (
    <Animator
      combine
      refreshOn={[showButtons, showJoystickFields]}
    >
      <div className="p-8 font-[Titillium_Web] font-light min-h-[100vh] select-none">
        <ShowButtonsButton
          showButtons={showButtons}
          setShowButtons={setShowButtons}
        >
          <Buttons buttons={buttons} />
        </ShowButtonsButton>
        <div
          id="joystick-l-field"
          className="absolute top-0 left-0 w-1/2 h-[100vh] cursor-grab z-10"
        ></div>
        <div
          id="joystick-r-field"
          className="absolute top-0 right-0 w-1/2 h-[100vh] cursor-grab z-10"
        ></div>
        <div className="flex flex-col gap-1">
          <Title>CONTROLLER</Title>
          <Connected connected={deviceConnected} />
        </div>
        <Animator
          duration={{ delay: 0.5 }}
          condition={showJoystickFields}
        >
          <Animated
            as="div"
            animated={[["scale", 0.9, 1], ["opacity", 0, 1], "flicker"]}
            className="absolute top-48 left-1/2 -translate-x-1/2"
          >
            <div className="flex justify-between w-[95vw]">
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
          </Animated>
        </Animator>
        <Animator>
          <ControllerButton
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="M480-120q-91 0-158.5-57.5T243-324q-72-14-117.5-70T80-522q0-83 58.5-140.5T280-720h100q8 0 14-6t6-14q0-8-6-14t-14-6h-60q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h60q42 0 71 29t29 71q0 42-29 71t-71 29H280q-50 0-85 34t-35 83q0 40 23 72.5t61 44.5q16-85 81.5-139.5T478-600q20 0 39.5 3t36.5 8q8-3 15.5-5t15.5-3.5q8-1.5 17-2t18-.5q73 0 126 51t53 126q0 9-.5 16t-2.5 11l38 35q23 20 34 46.5t11 55.5q0 58-40.5 98.5T741-120H480Zm0-80h261q24 0 41.5-17.5T800-259q0-13-5-24t-14-19l-75-68q8-11 11-24t3-27q0-42-29-70.5T620-520q-42 0-71 29t-29 71q0 20 7 38.5t22 32.5l-56 56q-28-23-40.5-58T440-423q0-26 7-50t21-46q-60 0-104 47t-44 112q0 33 12.5 62.5t34.5 51q22 21.5 51 34t62 12.5Zm200-40q-17 0-28.5-11.5T640-280q0-17 11.5-28.5T680-320q17 0 28.5 11.5T720-280q0 17-11.5 28.5T680-240ZM560-400Z" />
              </svg>
            }
            onClick={() => console.log("Jump Clicked")}
            className="bottom-100 left-12 w-28 h-16"
          >
            Jump
          </ControllerButton>
          <ControllerButton
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="M480-120q-91 0-158.5-57.5T243-324q-72-14-117.5-70T80-522q0-83 58.5-140.5T280-720h100q8 0 14-6t6-14q0-8-6-14t-14-6h-60q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h60q42 0 71 29t29 71q0 42-29 71t-71 29H280q-50 0-85 34t-35 83q0 40 23 72.5t61 44.5q16-85 81.5-139.5T478-600q20 0 39.5 3t36.5 8q8-3 15.5-5t15.5-3.5q8-1.5 17-2t18-.5q73 0 126 51t53 126q0 9-.5 16t-2.5 11l38 35q23 20 34 46.5t11 55.5q0 58-40.5 98.5T741-120H480Zm0-80h261q24 0 41.5-17.5T800-259q0-13-5-24t-14-19l-75-68q8-11 11-24t3-27q0-42-29-70.5T620-520q-42 0-71 29t-29 71q0 20 7 38.5t22 32.5l-56 56q-28-23-40.5-58T440-423q0-26 7-50t21-46q-60 0-104 47t-44 112q0 33 12.5 62.5t34.5 51q22 21.5 51 34t62 12.5Zm200-40q-17 0-28.5-11.5T640-280q0-17 11.5-28.5T680-320q17 0 28.5 11.5T720-280q0 17-11.5 28.5T680-240ZM560-400Z" />
              </svg>
            }
            onClick={() => console.log("Jump Clicked")}
            className="bottom-100 right-12 w-32 h-24"
          >
          </ControllerButton>
        </Animator>
      </div>
      <Animator>
        <Background />
      </Animator>
    </Animator>
  );
}
