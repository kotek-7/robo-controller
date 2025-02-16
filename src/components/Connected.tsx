export default function Connected(props: { connected: boolean }) {
  return props.connected ? (
    <div className="text-accent text-center">
      <div>[ Connected ]</div>
    </div>
  ) : (
    <div className="text-primary text-center">
      <div>[ Disconnected ]</div>
    </div>
  );
}
