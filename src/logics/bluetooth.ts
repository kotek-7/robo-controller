const SERVICE_UUID = "0a133f79-efe1-40c5-b4a5-cba5980d0d0f";
const TX_CHARACTERISTIC_UUID = "8c83ffae-8421-4581-9755-10c5efd53d10";

export async function sendJsonData(
  data: Object,
  txCharacteristic: BluetoothRemoteGATTCharacteristic
) {
  const encoder = new TextEncoder();
  const jsonString = JSON.stringify(data);
  const txBuf = encoder.encode(jsonString);
  console.log("sending: ");
  console.log(txBuf);
  await txCharacteristic.writeValueWithoutResponse(txBuf);
}

export async function searchDeviceAndConnect() {
  const device = await navigator.bluetooth.requestDevice({
    acceptAllDevices: true,
    optionalServices: [SERVICE_UUID],
  });
  return await device.gatt?.connect();
}

export async function fetchTxCharacteristic(server: BluetoothRemoteGATTServer) {
    const service = await server?.getPrimaryService(SERVICE_UUID);
    return await service?.getCharacteristic(
      TX_CHARACTERISTIC_UUID
    );
}