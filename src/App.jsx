import { useState } from "react";
import "./App.css";
import menu from "./assets/images/icons/menu-icon.svg";
import background from "./assets/images/background-image.svg";
import plus from "./assets/images/icons/plus-icon.svg";
import circle from "./assets/images/icons/circle-outlined-icon.svg";
import Header from "./Header";

export default function App() {
  return (
    <div className="app bg-white h-screen w-full text-black flex p-5 gap-5">
      <Sidebar />
      <Main />
    </div>
  );
}

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`sidebar h-full bg-light rounded-xl p-5 pb-8 transition-width duration-300 ease-in-out ${
        isOpen ? "w-sidebar" : "w-20"
      }`}
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

function Main() {
  //Add the state here

  return (
    <div className="flex flex-col flex-1 gap-6">
      <Header />
      <TodoList />
      <Input />
    </div>
  );
}

function TodoList() {
  return (
    <div className="w-full h-4/6">
      <div className="empty-holder h-full flex flex-col justify-center items-center gap-6">
        <img
          src={background}
          alt="Woman with Paper"
          className="w-full h-full max-h-72"
        />
        <div className="text-center flex flex-col items-center gap-2">
          <h3 className="text-2xl font-black">Nothing here yet!</h3>
          <p className="text-gray text-sm w-8/12 text-center">
            No tasks at the moment. Enjoy your free time or plan your next
            steps.
          </p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  const [isFocused, setIsFocused] = useState(false);
  const [placeholder, setPlaceholder] = useState("Add Task");

  return (
    <div
      className="input-field-container w-full p-5 bg-light text-black relative rounded-md pl-16 "
      onFocus={() => {
        setIsFocused(true);
        setPlaceholder(`Try typing "Design a website."`);
      }}
      onBlur={() => {
        setIsFocused(false);
        setPlaceholder("Add Task");
      }}
    >
      <div className="plus-icon-container absolute top-1/2 left-4 transform -translate-y-1/2">
        <img
          className={`transition-opacity duration-300 ease-in-out top-0 left-0 ${
            isFocused ? "opacity-0" : "opacity-100"
          }`}
          src={plus}
          alt="Plus Icon"
        />
        <img
          className={`transition-opacity duration-300 ease-in-out absolute top-0 left-0 ${
            isFocused ? "opacity-100" : "opacity-0"
          }`}
          src={circle}
          alt="Circle Icon"
        />
      </div>

      <input
        type="text"
        name="todo"
        id="todo-input-field"
        className="w-full text-lg placeholder:text-primary outline-none border-none bg-inherit"
        placeholder={placeholder}
      />
    </div>
  );
}
