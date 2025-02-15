export default function Connected(props: { connected: boolean }) {
  return props.connected ? (
    <div className="text-cyberyellow text-center">
      <div>[ Connected ]</div>
    </div>
  ) : (
    <div className="text-cyberblue text-center">
      <div>[ Disconnected ]</div>
    </div>
  );
}
