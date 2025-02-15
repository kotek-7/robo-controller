export default function SmallButton(props: {
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="font-normal border border-cyberblue text-cyberblue py-1 px-4 flex gap-2 hover:bg-cyberblue/10 active:bg-cyberblue/20 cursor-pointer"
      onClick={props.onClick}
    >
      {props.icon}
      <span className="">{props.children}</span>
    </button>
  );
}
