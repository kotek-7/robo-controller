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

export default function Controller() {
  const { joystickLFields, setJoystickLFields, joystickRFields, setJoystickRFields } = useJoystickFields(
    (joystickLFields, joystickRFields) => {
      if (bluetoothTxCharacteristic === undefined) {
        return;
      }

      let txDataL = {
        side: "l",
        ...joystickLFields,
      };
      let txDataR = {
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

  const navigate = useNavigate();
  return (
    <Animator
      combine
      refreshOn={[showButtons]}
    >
      <div className="p-8 font-[Titillium_Web] font-light min-h-[100vh] select-none">
        <ShowButtonsButton
          showButtons={showButtons}
          setShowButtons={setShowButtons}
        >
          <Buttons
            buttons={[
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
            ]}
          />
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
        <Animator duration={{ delay: 0.5 }}>
          <Animated
            as="div"
            animated={[["scale", 0.9, 1], ["opacity", 0, 1], "flicker"]}
            className="flex w-full mt-4 justify-between"
          >
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
          </Animated>
        </Animator>
      </div>
      <Animator>
        <Background />
      </Animator>
    </Animator>
  );
}
