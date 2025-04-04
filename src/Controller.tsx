import { useEffect, useState } from "react";
import JoystickFields from "./components/JoystickFields";
import JoystickController from "joystick-controller";
import { fetchTxCharacteristic, searchDevice, sendJsonData } from "./logics/bluetooth";
import { useJoystickFields } from "./hooks/useJoystickFields";
import Title from "./components/Titile";
import Connected from "./components/Connected";
import { Animated, Animator } from "@arwes/react";
import Background from "./components/Background";
import Buttons from "./components/Buttons";
import ShowButtonsButton from "./features/controller/ShowButtonsButton";
import ControllerButtons from "./features/controller/ControllerButtons";
import { useDisableContextMenu } from "./hooks/useDisableContextMenu";
import { navigateReloading } from "./logics/navigateReloading";
import ResetImuButton from "./features/controller/ResetImuButton";

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
        maxRange: 140,
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
        maxRange: 140,
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
    navigateReloading("/monitor/");
  }

  function onJoystickOnlyModeButtonClick() {
    bluetoothDevice?.gatt?.disconnect();
    navigateReloading("/joystick-only/");
  }

  function onButtonsOnlyModeButtonClick() {
    bluetoothDevice?.gatt?.disconnect();
    navigateReloading("/buttons-only/");
  }

  function onDisconnectButtonClick() {
    bluetoothDevice?.gatt?.disconnect();
  }

  useDisableContextMenu();

  const [bluetoothDevice, setBluetoothDevice] = useState<BluetoothDevice>();
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [bluetoothTxCharacteristic, setBluetoothTxCharacteristic] = useState<BluetoothRemoteGATTCharacteristic>();

  const [showButtons, setShowButtons] = useState(false);
  const [showJoystickFields, setShowJoystickFields] = useState(false);


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
          <path d="m272-440 208 120 208-120-168-97v137h-80v-137l-168 97Zm168-189v-17q-44-13-72-49.5T340-780q0-58 41-99t99-41q58 0 99 41t41 99q0 48-28 84.5T520-646v17l280 161q19 11 29.5 29.5T840-398v76q0 22-10.5 40.5T800-252L520-91q-19 11-40 11t-40-11L160-252q-19-11-29.5-29.5T120-322v-76q0-22 10.5-40.5T160-468l280-161Zm0 378L200-389v67l280 162 280-162v-67L520-251q-19 11-40 11t-40-11Zm40-469q25 0 42.5-17.5T540-780q0-25-17.5-42.5T480-840q-25 0-42.5 17.5T420-780q0 25 17.5 42.5T480-720Zm0 560Z" />
        </svg>
      ),
      children: "joystick only mode",
      onClick: onJoystickOnlyModeButtonClick,
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
          <path d="M480-654Zm174 174Zm-348 0Zm174 174Zm0-234L360-660v-220h240v220L480-540Zm180 180L540-480l120-120h220v240H660Zm-580 0v-240h220l120 120-120 120H80ZM360-80v-220l120-120 120 120v220H360Zm120-574 40-40v-106h-80v106l40 40ZM160-440h106l40-40-40-40H160v80Zm280 280h80v-106l-40-40-40 40v106Zm254-280h106v-80H694l-40 40 40 40Z" />
        </svg>
      ),
      children: "buttons only mode",
      onClick: onButtonsOnlyModeButtonClick,
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
        <ControllerButtons btTxCharacteristic={bluetoothTxCharacteristic} />
        <ResetImuButton btTxCharacteristic={bluetoothTxCharacteristic} />
      </div>
      <Animator>
        <Background />
      </Animator>
    </Animator>
  );
}
