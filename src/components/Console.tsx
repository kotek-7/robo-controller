export default function Console(props: {
  consoleTexts: Array<string>;
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={props.ref} className="font-mono border border-primary text-text py-4 px-6 w-full h-full overflow-y-auto">
      {props.consoleTexts.map((text, index) => {
        return <div key={index}>{text}</div>;
      })}
    </div>
  );
}
