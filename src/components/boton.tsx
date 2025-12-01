export default function Boton(props: BotonProps) {
  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled ?? false}
      className={props.classname ?? 'btn btn-primary'}
    >
      {props.children}
    </button>
  );
}
interface BotonProps {
  children: React.ReactNode;
  onClick?(): void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  classname?: string;
}
