export default function SmallButton(props: {
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="font-normal border border-primary text-primary py-1 px-4 flex gap-2 hover:bg-primary/10 active:bg-primary/20 cursor-pointer"
      onClick={props.onClick}
    >
      {props.icon}
      <span className="">{props.children}</span>
    </button>
  );
}
