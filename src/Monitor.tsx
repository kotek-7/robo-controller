import { useEffect, useRef, useState } from "react";
import { fetchRxCharacteristic, searchDevice } from "./logics/bluetooth";
import { useNavigate } from "react-router";
import JoystickFields from "./components/JoystickFields";
import Title from "./components/Titile";
import Console from "./components/Console";
import Connected from "./components/Connected";
import { Animator, Animated } from "@arwes/react";
import Background from "./components/Background";
import Buttons from "./components/Buttons";
import PidFields from "./components/PidFields";
import Section from "./components/Section";
import Feedbacks from "./components/Feedbacks";

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

  const [m3508Feedback, setM3508Feedback] = useState({
    angle: 0,
    rpm: 0,
    amp: 0,
    temp: 0,
  });
  const [m3508PidFields, setM3508PidFields] = useState({
    output: 0,
    p: 0,
    i: 0,
    d: 0,
    targetRpm: 0,
    error: 0,
  });

  const [consoleTexts, setConsoleTexts] = useState<Array<string>>(["console start"]);
  const [autoScroll, setAutoScroll] = useState(true);
  const consoleRef = useRef<HTMLDivElement>(null);
  const [bluetoothDevice, setBluetoothDevice] = useState<BluetoothDevice>();
  const [deviceConnected, setDeviceConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (consoleRef.current && autoScroll) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight - consoleRef.current.clientHeight;
    }
  }, [consoleTexts]);

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
    const rxCharacteristic = await fetchRxCharacteristic(server);
    rxCharacteristic.addEventListener("characteristicvaluechanged", (event) => {
      const json = new TextDecoder().decode((event.target as BluetoothRemoteGATTCharacteristic).value);
      const value = JSON.parse(json);
      onCharacteristicValueChange(value);
    });
    rxCharacteristic.startNotifications();
  }

  function onDebugButtonClick() {
    setConsoleTexts((prev) => [...prev, "debug"]);
  }

  function onControllerButtonClick() {
    bluetoothDevice?.gatt?.disconnect();
    navigate("/");
  }

  function onDisconnectButtonClick() {
    bluetoothDevice?.gatt?.disconnect();
  }

  function onCharacteristicValueChange(value: any) {
    console.log(value);
    switch (value.type) {
      case "joystickInput":
        if (value.side === "l") {
          setJoystickLFields({
            x: value.x,
            y: value.y,
            leveledX: value.leveledX,
            leveledY: value.leveledY,
            distance: value.distance,
            angle: value.angle,
          });
        } else if (value.side === "r") {
          setJoystickRFields({
            x: value.x,
            y: value.y,
            leveledX: value.leveledX,
            leveledY: value.leveledY,
            distance: value.distance,
            angle: value.angle,
          });
        } else {
          console.error("invalid side");
        }
        break;
      case "print":
        setConsoleTexts((prev) => [...prev, value.text]);
        break;
      case "m3508Feedback":
        setM3508Feedback({
          angle: value.angle,
          rpm: value.rpm,
          amp: value.amp,
          temp: value.temp,
        });
        break;
      case "m3508PidFields":
        setM3508PidFields({
          output: value.output,
          p: value.p,
          i: value.i,
          d: value.d,
          targetRpm: value.targetRpm,
          error: value.error,
        });
        break;
      default:
        console.error("invalid type");
        break;
    }
  }

  return (
    <Animator combine>
      <div className="p-8 font-[Titillium_Web] font-light min-h-[100vh]">
        <div className="flex flex-col gap-1">
          <Title>MONITOR</Title>
          <Connected connected={deviceConnected} />
        </div>
        <Animator
          combine
          manager="stagger"
          duration={{ stagger: 0.1 }}
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
                    <path d="M182-200q-51 0-79-35.5T82-322l42-300q9-60 53.5-99T282-760h396q60 0 104.5 39t53.5 99l42 300q7 51-21 86.5T778-200q-21 0-39-7.5T706-230l-90-90H344l-90 90q-15 15-33 22.5t-39 7.5Zm16-86 114-114h336l114 114q2 2 16 6 11 0 17.5-6.5T800-304l-44-308q-4-29-26-48.5T678-680H282q-30 0-52 19.5T204-612l-44 308q-2 11 4.5 17.5T182-280q2 0 16-6Zm482-154q17 0 28.5-11.5T720-480q0-17-11.5-28.5T680-520q-17 0-28.5 11.5T640-480q0 17 11.5 28.5T680-440Zm-80-120q17 0 28.5-11.5T640-600q0-17-11.5-28.5T600-640q-17 0-28.5 11.5T560-600q0 17 11.5 28.5T600-560ZM310-440h60v-70h70v-60h-70v-70h-60v70h-70v60h70v70Zm170-40Z" />
                  </svg>
                ),
                children: "controller",
                onClick: onControllerButtonClick,
              },
            ]}
          />
        </Animator>
        <Animator>
          <div className="mt-6 flex justify-between">
            <div className="flex flex-col gap-6">
              <Section title="M3508 PID fields">
                <Animator>
                  <PidFields
                    p={m3508PidFields.p}
                    i={m3508PidFields.i}
                    d={m3508PidFields.d}
                    output={m3508PidFields.output}
                    targetRpm={m3508PidFields.targetRpm}
                    error={m3508PidFields.error}
                  />
                </Animator>
              </Section>
              <Section title="M3508 feedbacks">
                <Animator>
                  <Feedbacks
                    angle={m3508Feedback.angle}
                    rpm={m3508Feedback.rpm}
                    amp={m3508Feedback.amp}
                    temp={m3508Feedback.temp}
                  />
                </Animator>
              </Section>
              <Section title="joystick fields">
                <Animator>
                  <Animated
                    animated={["fade", "flicker", ["scale", 0.95, 1]]}
                    className="flex gap-4"
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
              </Section>
            </div>
            <div className="w-1/2 h-[calc(100vh-16rem)]">
              <Console
                ref={consoleRef}
                autoScroll={autoScroll}
                setAutoScroll={setAutoScroll}
                consoleTexts={consoleTexts}
                setConsoleTexts={setConsoleTexts}
              />
            </div>
          </div>
        </Animator>
      </div>
      <Animator>
        <Background />
      </Animator>
    </Animator>
  );
}
