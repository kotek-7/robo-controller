import { Chart as ChartJS, registerables, ChartOptions, ChartData } from "chart.js";
import { Line } from "react-chartjs-2";
import { fetchRxCharacteristic, fetchTxCharacteristic, searchDevice } from "./logics/bluetooth";
import { useCallback, useRef, useState } from "react";
import { useHistory } from "./hooks/useHistory";
import "chartjs-adapter-luxon";
import { useGroupHistory } from "./hooks/useGroupHistory";

ChartJS.register(...registerables);

export default function PidTuning() {
  function buildOptions(title: string): ChartOptions<"line"> {
    return {
      animation: false,
      responsive: true,
      scales: {
        x: {
          type: "time",
          time: {
            unit: "second",
            tooltipFormat: "hh:mm:ss",
            displayFormats: {
              second: "mm'm' ss's'",
            },
          },
        },
        y: {
          suggestedMax: 1,
          suggestedMin: -1,
        },
      },
      elements: {
        point: {
          radius: 0,
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

  function buildData(history: Array<{ value: number; time: number }>): ChartData<"line"> {
    return {
      labels: history.map((historyFragment) => historyFragment.time),
      datasets: [
        {
          data: history.map((historyFragment) => {
            return { x: historyFragment.time, y: historyFragment.value };
          }),
          borderColor: "rgb(255, 99, 132)",
          tension: 0.4,
        },
      ],
    };
  }

  const [deviceConnected, setDeviceConnected] = useState(false);
  const bluetoothDeviceRef = useRef<BluetoothDevice>(null);

  const [inspectingId, setInspectingId] = useState<number>(1);
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

  const historyLength = 500;
  const outputHistory = useHistory(m3508PidFields.output, historyLength);
  const pHistory = useHistory(m3508PidFields.p, historyLength);
  const iHistory = useHistory(m3508PidFields.i, historyLength);
  const dHistory = useHistory(m3508PidFields.d, historyLength);
  const targetRpmHistory = useHistory(m3508PidFields.targetRpm, historyLength);
  const errorHistory = useHistory(m3508PidFields.error, historyLength);

  const {
    value1GroupHistory: pGroupHistory,
    value2GroupHistory: iGroupHistory,
    value3GroupHistory: dGroupHistory,
  } = useGroupHistory(m3508PidFields.p, m3508PidFields.i, m3508PidFields.d, historyLength);

  const {
    value1GroupHistory: targetRpmGroupHistory,
    value2GroupHistory: rpmGroupHistory,
    value3GroupHistory: _errorGroupHistory,
  } = useGroupHistory(m3508PidFields.targetRpm, m3508Feedback.rpm, m3508PidFields.error, historyLength);

  const [inputInspectingId, setInputInspectingId] = useState<string>("1");
  const [inputTargetRpm, setInputTargetRpm] = useState<string>("0");
  const [inputKp, setInputKp] = useState<string>("0");
  const [inputKi, setInputKi] = useState<string>("0");
  const [inputKd, setInputKd] = useState<string>("0");

  const [currentKp, setCurrentKp] = useState<number>();
  const [currentKi, setCurrentKi] = useState<number>();
  const [currentKd, setCurrentKd] = useState<number>();

  const chartWidth = document.body.clientWidth / 3 - 60;
  const chartHeight = 500;

  const pidBreakDownOptions: ChartOptions<"line"> = {
    animation: false,
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "second",
          tooltipFormat: "hh:mm:ss",
          displayFormats: {
            second: "mm'm' ss's'",
          },
        },
      },
      y: {
        suggestedMax: 1,
        suggestedMin: -1,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "PID breakdown",
      },
    },
  };

  const rpmBreakdownOptions: ChartOptions<"line"> = {
    animation: false,
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "second",
          tooltipFormat: "hh:mm:ss",
          displayFormats: {
            second: "mm'm' ss's'",
          },
        },
      },
      y: {
        suggestedMax: 1,
        suggestedMin: -1,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "RPM breakdown",
      },
    },
  };


  function buildPidBreakdownData(
    pHistory: Array<{ value: number; time: number }>,
    iHistory: Array<{ value: number; time: number }>,
    dHistory: Array<{ value: number; time: number }>,
  ): ChartData<"line"> {
    return {
      labels: pHistory.map((historyFragment) => historyFragment.time),
      datasets: [
        {
          label: "P",
          data: pHistory.map((historyFragment) => {
            return { x: historyFragment.time, y: historyFragment.value };
          }),
          borderColor: "rgb(255, 99, 132)",
          tension: 0.4,
        },
        {
          label: "I",
          data: iHistory.map((historyFragment) => {
            return { x: historyFragment.time, y: historyFragment.value };
          }),
          borderColor: "rgb(54, 162, 235)",
          tension: 0.4,
        },
        {
          label: "D",
          data: dHistory.map((historyFragment) => {
            return { x: historyFragment.time, y: historyFragment.value };
          }),
          borderColor: "rgb(75, 192, 192)",
          tension: 0.4,
        },
      ],
    };
  }

  function buildRpmBreakdownData(
    targetRpmHistory: Array<{ value: number; time: number }>,
    rpmHistory: Array<{ value: number; time: number }>,
  ): ChartData<"line"> {
    return {
      labels: targetRpmHistory.map((historyFragment) => historyFragment.time),
      datasets: [
        {
          label: "target rpm",
          data: targetRpmHistory.map((historyFragment) => {
            return { x: historyFragment.time, y: historyFragment.value };
          }),
          borderColor: "rgb(255, 99, 132)",
          tension: 0.4,
        },
        {
          label: "rpm",
          data: rpmHistory.map((historyFragment) => {
            return { x: historyFragment.time, y: historyFragment.value };
          }),
          borderColor: "rgb(54, 162, 235)",
          tension: 0.4,
        },
      ],
    };
  }

  async function onSearchDeviceButtonClick() {
    const device = await searchDevice().catch((e) => {
      console.error(e);
      bluetoothDeviceRef.current?.gatt?.disconnect();
      return undefined;
    });
    if (device === undefined) {
      return;
    }
    setDeviceConnected(true);
    device.addEventListener("gattserverdisconnected", () => {
      setDeviceConnected(false);
    });
    bluetoothDeviceRef.current = device;
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

  const onCharacteristicValueChange = useCallback((value: any) => {
    switch (value.type) {
      case "m3508Feedback":
        if (value.c620Id !== inspectingId) {
          break;
        }
        setM3508Feedback({
          angle: value.angle,
          rpm: value.rpm,
          amp: value.amp,
          temp: value.temp,
        });
        break;
      case "m3508PidFields":
        console.log("m3508PidFields received: ");
        console.log(value);
        console.log(value.c620Id);
        console.log(inspectingId);
        if (value.c620Id !== inspectingId) {
          break;
        }
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
        console.error("invalid type: " + value.type);
        break;
    }
  }, [inspectingId]);

  async function onPidSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const server = bluetoothDeviceRef.current?.gatt;
    if (server === undefined) {
      console.log("not connected to device!");
      alert("not connected to device!");
      return;
    }
    const txCharacteristic = await fetchTxCharacteristic(server);
    await txCharacteristic.writeValue(
      new TextEncoder().encode(JSON.stringify({ type: "setPidGains", kp: inputKp, ki: inputKi, kd: inputKd })),
    );
    setCurrentKp(parseFloat(inputKp));
    setCurrentKi(parseFloat(inputKi));
    setCurrentKd(parseFloat(inputKd));
    console.log("(pid submitted) " + "kp: " + inputKp + "ki: " + inputKi + "kd: " + inputKd);
    alert("set pid gains to: " + "kp: " + inputKp + "ki: " + inputKi + "kd: " + inputKd);
  }

  async function onInspectingIdSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setInspectingId(parseInt(inputInspectingId));
    alert("set inspecting c620 id to: " + inputInspectingId);
  }

  async function onTargetRpmSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const server = bluetoothDeviceRef.current?.gatt;
    if (server === undefined) {
      console.log("not connected to device!");
      alert("not connected to device!");
      return;
    }
    const txCharacteristic = await fetchTxCharacteristic(server);
    await txCharacteristic.writeValue(
      new TextEncoder().encode(JSON.stringify({ type: "setTargetRpm", targetRpm: inputTargetRpm })),
    );
    console.log("(target rpm submitted) " + "target rpm: " + inputTargetRpm);
    alert("set target rpm to: " + inputTargetRpm);
  }
  return (
    <div className="p-4">
      <div>device connected: {deviceConnected ? "true" : "false"}</div>
      <section className="mt-4">
        <h3>[ feedback ]</h3>
        <div className="flex gap-4">
          <div>angle: {m3508Feedback.angle}</div>
          <div>rpm: {m3508Feedback.rpm}</div>
          <div>amp: {m3508Feedback.amp}</div>
          <div>temp: {m3508Feedback.temp}</div>
          <div>output: {m3508PidFields.output}</div>
        </div>
      </section>
      <section className="mt-4">
        <h3>[ pid values ]</h3>
        <div className="flex gap-4">
          <div>p: {m3508PidFields.p}</div>
          <div>i: {m3508PidFields.i}</div>
          <div>d: {m3508PidFields.d}</div>
          <div>targetRpm: {m3508PidFields.targetRpm}</div>
          <div>error: {m3508PidFields.error}</div>
        </div>
      </section>
      <section className="mt-4">
        <h3>[ current pid gains (not sure) ]</h3>
        <div className="flex gap-4">
          <div>kp: {currentKp ?? "unknown"}</div>
          <div>ki: {currentKi ?? "unknown"}</div>
          <div>kd: {currentKd ?? "unknown"}</div>
        </div>
      </section>
      <section className="mt-4">
        <form
          onSubmit={onInspectingIdSubmit}
          className="shadow bg-slate-100 rounded p-4 w-fit"
        >
          <label className="ml-4">
            inspecting c620 id:
            <input
              type="number"
              value={inputInspectingId}
              onChange={(event) => setInputInspectingId(event.currentTarget.value)}
              className="ml-2 border-1 rounded w-24 bg-white px-2"
            />
          </label>
          <button className="ml-4 bg-green-200 p-2 rounded text-green-700">Submit</button>
        </form>
      </section>
      <section className="mt-4">
        <div>inspect c620 id: {inspectingId}</div>
      </section>
      <section className="mt-4">
        <form
          onSubmit={onTargetRpmSubmit}
          className="shadow bg-slate-100 rounded p-4 w-fit"
        >
          <label className="ml-4">
            target rpm:
            <input
              type="number"
              value={inputTargetRpm}
              onChange={(event) => setInputTargetRpm(event.currentTarget.value)}
              className="ml-2 border-1 rounded w-24 bg-white px-2"
            />
          </label>
          <button className="ml-4 bg-green-200 p-2 rounded text-green-700">Submit</button>
        </form>
      </section>
      <section className="mt-4">
        <form
          onSubmit={onPidSubmit}
          className="shadow bg-slate-100 rounded p-4 w-fit"
        >
          <label>
            kp:
            <input
              type="number"
              step={0.000001}
              value={inputKp}
              onChange={(event) => setInputKp(event.currentTarget.value)}
              className="ml-2 border-1 rounded w-24 bg-white px-2"
            />
          </label>
          <label className="ml-4">
            ki:
            <input
              type="number"
              step={0.000001}
              value={inputKi}
              onChange={(event) => setInputKi(event.currentTarget.value)}
              className="ml-2 border-1 rounded w-24 bg-white px-2"
            />
          </label>
          <label className="ml-4">
            kd:
            <input
              type="number"
              step={0.000001}
              value={inputKd}
              onChange={(event) => setInputKd(event.currentTarget.value)}
              className="ml-2 border-1 rounded w-24 bg-white px-2"
            />
          </label>
          <button className="ml-4 bg-green-200 p-2 rounded text-green-700">Submit</button>
        </form>
      </section>
      <section className="mt-4 flex gap-4">
        <button
          onClick={onSearchDeviceButtonClick}
          className="w-fit p-2 bg-orange-200 text-orange-700 rounded"
        >
          search device
        </button>
        <button
          onClick={() => {
            setM3508PidFields((fields) => ({ ...fields, output: Math.random() }));
          }}
          className="w-fit p-2 bg-orange-200 text-orange-700 rounded"
        >
          change output
        </button>
      </section>
      <section>
        <div className="text-center">output: {m3508PidFields.output}</div>
        <Line
          height={"260"}
          width={"900"}
          options={pidBreakDownOptions}
          data={buildPidBreakdownData(pGroupHistory, iGroupHistory, dGroupHistory)}
        />
      </section>
      <section>
        <div className="text-center">rpm: {m3508Feedback.rpm}</div>
        <Line
          height={"260"}
          width={"900"}
          options={rpmBreakdownOptions}
          data={buildRpmBreakdownData(targetRpmGroupHistory, rpmGroupHistory)}
        />
      </section>
      <section className="mt-4 flex flex-wrap gap-x-6">
        <div>
          <div className="text-center">{m3508PidFields.p}</div>
          <Line
            height={chartHeight}
            width={chartWidth}
            options={buildOptions("p")}
            data={buildData(pHistory)}
          />
        </div>
        <div>
          <div className="text-center">{m3508PidFields.i}</div>
          <Line
            height={chartHeight}
            width={chartWidth}
            options={buildOptions("i")}
            data={buildData(iHistory)}
          />
        </div>
        <div>
          <div className="text-center">{m3508PidFields.d}</div>
          <Line
            height={chartHeight}
            width={chartWidth}
            options={buildOptions("d")}
            data={buildData(dHistory)}
          />
        </div>
        <div>
          <div className="text-center">{m3508PidFields.output}</div>
          <Line
            height={chartHeight}
            width={chartWidth}
            options={buildOptions("output")}
            data={buildData(outputHistory)}
          />
        </div>
        <div>
          <div className="text-center">{m3508PidFields.targetRpm}</div>
          <Line
            height={chartHeight}
            width={chartWidth}
            options={buildOptions("targetRpm")}
            data={buildData(targetRpmHistory)}
          />
        </div>
        <div>
          <div className="text-center">{m3508PidFields.error}</div>
          <Line
            height={chartHeight}
            width={chartWidth}
            options={buildOptions("error")}
            data={buildData(errorHistory)}
          />
        </div>
      </section>
    </div>
  );
}
