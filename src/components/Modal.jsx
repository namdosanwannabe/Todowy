export function Modal({ children, title }) {
  return (
    <dialog id="delete_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-white text-black">
        <h3 className="text-2xl font-bold">Delete task</h3>
        <p className="text-lg py-4">{title}</p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-4">
            {children}
          </form>
        </div>
      </div>
    </dialog>
  );
}
