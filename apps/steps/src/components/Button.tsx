export default function Button({
  textColor,
  bgColor,
  children,
  previous,
  next,
  onClick,
}: {
  textColor?: string;
  bgColor?: string;
  children?: React.ReactNode;
  previous?: React.ReactNode;
  next?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      style={{
        color: textColor,
        backgroundColor: bgColor,
      }}
      onClick={onClick}
    >
      {previous}
      {children}
      {next}
    </button>
  );
}
