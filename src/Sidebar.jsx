import { useState } from "react";
import menu from "./assets/images/icons/menu-icon.svg";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`sidebar h-full rounded-xl p-5 pb-8 transition-width duration-300 ease-in-out 
        ${isOpen ? "w-sidebar" : "w-20"} ${isOpen ? "bg-light" : "bg-inherit"}`}
    >
      <div
        className={`menu-container w-full flex items-center ${
          isOpen ? "justify-between" : "justify-center"
        }`}
      >
        {isOpen && <p className="logo text-xl uppercase font-bold">Todowy</p>}
        <img
          src={menu}
          alt="Menu Icon"
          className="cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    </div>
  );
}
