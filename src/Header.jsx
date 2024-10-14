import DisplayDate from "./DisplayDate";

export default function Header({ todo }) {
  return (
    <div>
      <div className="flex items-center gap-5">
        <h1 className="text-5xl font-bold leading-normal">Tasks</h1>
        <p className="inline-flex justify-center items-center p-3 w-12 h-12 rounded-xl border-2 text-3xl border-light">
          {todo.length}
        </p>
      </div>
      <DisplayDate />
    </div>
  );
}
