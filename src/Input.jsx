import { useState } from "react";
import circle from "./assets/images/icons/circle-outlined-icon.svg";
import plus from "./assets/images/icons/plus-icon.svg";

export default function Input({ onAddTodo, users }) {
  const [isFocused, setIsFocused] = useState(false);
  const [placeholder, setPlaceholder] = useState("Add Task");
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(event) {
    if (event.key === "Enter" && inputValue.trim()) {
      if (users) {
        const newTodo = {
          title: inputValue,
          is_done: false,
          user_id: users.id,
        };
        onAddTodo(newTodo);
        setInputValue("");
      }
    }
  }

  return (
    <div
      className="input-field-container w-full py-4 bg-light text-black relative rounded-md pl-16 "
      onFocus={() => {
        setIsFocused(true);
        setPlaceholder(`Try typing "Design a website."`);
      }}
      onBlur={() => {
        setIsFocused(false);
        setPlaceholder("Add Task");
      }}
    >
      <div className="plus-icon-container w-7 h-7 absolute top-1/2 left-4 transform -translate-y-1/2">
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
        value={inputValue}
        onKeyDown={handleSubmit}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full text-lg placeholder:text-primary outline-none border-none bg-inherit focus:outline-none focus:box-shadow-none"
        placeholder={placeholder}
      />
    </div>
  );
}
