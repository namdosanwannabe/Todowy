export default function Button({ color, background, onClick, children }) {
  return (
    <button
      className={`inline-flex h-3 min-h-3 shrink-0 cursor-pointer select-none items-center justify-center rounded-lg p-6 px-4 duration-200 font-bold ${background} ${color}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
