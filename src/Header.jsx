import DisplayDate from "./DisplayDate";

export default function Header() {
  return (
    <div>
      <h1 className="text-5xl font-bold leading-normal">Tasks</h1>
      <DisplayDate />
    </div>
  );
}
