import { Chart as ChartJS, registerables, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import { fetchRxCharacteristic, searchDevice } from "./logics/bluetooth";
import { useState } from "react";
import { useHistory } from "./hooks/useHistory";
import "chartjs-adapter-luxon";

ChartJS.register(...registerables);

export default function PidTuning() {
  function build_options(title: string): ChartOptions<"line"> {
    return {
      animation: false,
      scales: {
        x: {
          type: "timeseries",
          time: {
            unit: "second",
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: title,
        },
        legend: {
          display: false,
        },
      },
    };
  }
  function build_data(history: Array<{ value: number; time: number }>): any {
    return {
      labels: history.map((historyFragment) => historyFragment.time),
      datasets: [
        {
          data: history.map((historyFragment) => {
            return { x: historyFragment.time, y: historyFragment.value };
          }),
          borderColor: "rgb(255, 99, 132)",
        },
      ],
    };
  }
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

  async function onCharacteristicValueChange(value: any) {
    console.log(value);
    switch (value.type) {
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

  const [deviceConnected, setDeviceConnected] = useState(false);
  const [bluetoothDevice, setBluetoothDevice] = useState<BluetoothDevice>();
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

  const outputHistory = useHistory(m3508PidFields.output, 100);
  const pHistory = useHistory(m3508PidFields.p, 100);
  const iHistory = useHistory(m3508PidFields.i, 100);
  const dHistory = useHistory(m3508PidFields.d, 100);
  const targetRpmHistory = useHistory(m3508PidFields.targetRpm, 100);
  const errorHistory = useHistory(m3508PidFields.error, 100);

  const chartWidth = 600;
  const chartHeight = 400;

  return (
    <div className="p-4">
      <div>
        <div>device connected: {deviceConnected ? "true" : "false"}</div>
        <div>angle: {m3508Feedback.angle}</div>
        <div>rpm: {m3508Feedback.rpm}</div>
        <div>amp: {m3508Feedback.amp}</div>
        <div>temp: {m3508Feedback.temp}</div>
        <div>output: {m3508PidFields.output}</div>
        <div>p: {m3508PidFields.p}</div>
        <div>i: {m3508PidFields.i}</div>
        <div>d: {m3508PidFields.d}</div>
        <div>targetRpm: {m3508PidFields.targetRpm}</div>
        <div>error: {m3508PidFields.error}</div>
      </div>
      <section>
        <button
          onClick={onSearchDeviceButtonClick}
          className="w-fit p-2 bg-orange-200 rounded"
        >
          search device
        </button>
        <button
          onClick={() => {
            setM3508PidFields((fields) => ({ ...fields, output: Math.random() }));
          }}
          className="w-fit p-2 bg-orange-200 rounded"
        >
          change output
        </button>
      </section>
      <section className="flex flex-wrap gap-6">
        <div>
          <div className="text-center">{m3508PidFields.output}</div>
          <Line
            height={chartHeight}
            width={chartWidth}
            options={build_options("output")}
            data={build_data(outputHistory)}
          />
        </div>
        <div>
          <div className="text-center">{m3508PidFields.p}</div>
          <Line
            height={chartHeight}
            width={chartWidth}
            options={build_options("p")}
            data={build_data(pHistory)}
          />
        </div>
        <div>
          <div className="text-center">{m3508PidFields.i}</div>
          <Line
            height={chartHeight}
            width={chartWidth}
            options={build_options("i")}
            data={build_data(iHistory)}
          />
        </div>
        <div>
          <div className="text-center">{m3508PidFields.d}</div>
          <Line
            height={chartHeight}
            width={chartWidth}
            options={build_options("d")}
            data={build_data(dHistory)}
          />
        </div>
        <div>
          <div className="text-center">{m3508PidFields.targetRpm}</div>
          <Line
            height={chartHeight}
            width={chartWidth}
            options={build_options("targetRpm")}
            data={build_data(targetRpmHistory)}
          />
        </div>
        <div>
          <div className="text-center">{m3508PidFields.error}</div>
          <Line
            height={chartHeight}
            width={chartWidth}
            options={build_options("error")}
            data={build_data(errorHistory)}
          />
        </div>
      </section>
    </div>
  );
}
