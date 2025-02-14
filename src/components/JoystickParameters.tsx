function JoystickParameters(props: {label: string, x: string, y: string, leveledX: string, leveledY: string, distance: string, angle: string}) {
  return (
    <div>
      <div className="text-cyberblue mt-4 border border-blue-200 py-4 px-6 w-fit">
        <div>[{props.label}]</div>
        <div>
          x: {props.x}
        </div>
        <div>
          y: {props.y}
        </div>
        <div>
          leveled x: {props.leveledX}
        </div>
        <div>
          leveled y: {props.leveledY}
        </div>
        <div>
          distance: {props.distance}
        </div>
        <div>
          angle: {props.angle}
        </div>
      </div>
    </div>
  );
}

export default JoystickParameters;
