import { useState } from "react";
import { fetchTxCharacteristic, searchDevice as searchBtDevice } from "../logics/bluetooth";

export function useBluetoothConnect() {
  const [bluetoothDevice, setBluetoothDevice] = useState<BluetoothDevice>();
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [bluetoothTxCharacteristic, setBluetoothTxCharacteristic] = useState<BluetoothRemoteGATTCharacteristic>();

  function disconnect() {
    bluetoothDevice?.gatt?.disconnect();
  }

  async function searchDevice() {
    const device = await searchBtDevice().catch((e) => {
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

  return {
    bluetoothDevice,
    deviceConnected,
    bluetoothTxCharacteristic,
    searchDevice,
    disconnect,
  }
}
