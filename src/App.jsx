import { useEffect, useState } from "react";
import "./App.css";
import background from "./assets/images/background-image.svg";
import plus from "./assets/images/icons/plus-icon.svg";
import circle from "./assets/images/icons/circle-outlined-icon.svg";
import circleFilled from "./assets/images/icons/circle-filled-icon.svg";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { supabase } from "./supabaseClient";

const initialData = [
  { id: 1, title: "Do Something", done: false },
  { id: 2, title: "Design the wireframe", done: false },
  { id: 3, title: "Code the website", done: true },
];

export default function App() {
  return (
    <div className="app bg-white h-screen w-full text-black flex p-5 gap-5">
      <Sidebar />
      <Main />
    </div>
  );
}

function Main() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    fetchTodo();
  }, []);

  async function fetchTodo() {
    const { data } = await supabase.from("todowy").select("*");
    setTodo(data);
  }

  async function handleAddTodo(item) {
    const { data, error } = await supabase
      .from("todowy")
      .insert([item])
      .select();

    if (error) {
      console.error("Error adding todo:", error);
    } else {
      fetchTodo();
    }
  }

  return (
    <div className="flex flex-col flex-1 gap-6">
      <Header todo={todo} />
      <TodoList todo={todo} />
      <Input onAddTodo={handleAddTodo} />
    </div>
  );
}

function TodoList({ todo }) {
  if (!todo.length)
    return (
      <div className="empty-holder w-full h-full flex flex-col justify-center items-center gap-6">
        <img
          src={background}
          alt="Woman with Paper"
          className="w-full h-full max-h-72"
        />
        <div className="text-center flex flex-col items-center gap-1">
          <h3 className="text-2xl font-black">Nothing here yet!</h3>
          <p className="text-gray text-sm w-8/12 text-center">
            No tasks at the moment. Enjoy your free time or plan your next
            steps.
          </p>
        </div>
      </div>
    );

  return (
    <div className="w-full h-full flex flex-col gap-3">
      {todo.map((item) => (
        <Todo
          key={item.id}
          id={item.id}
          title={item.title}
          isDone={item.done}
        />
      ))}
    </div>
  );
}

function Input({ onAddTodo }) {
  const [isFocused, setIsFocused] = useState(false);
  const [placeholder, setPlaceholder] = useState("Add Task");
  const [inputValue, setInputValue] = useState("");

  const newTodo = { title: inputValue, is_done: false };

  function handleSubmit(event) {
    if (event.key === "Enter" && inputValue.trim()) {
      onAddTodo(newTodo);
      setInputValue("");
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
        className="w-full text-lg placeholder:text-primary outline-none border-none bg-inherit"
        placeholder={placeholder}
      />
    </div>
  );
}

function Todo({ id, title, isDone }) {
  return (
    <div className="input-field-container w-full py-4 bg-light text-black relative rounded-md pl-14">
      <div className="plus-icon-container w-6 h-6 absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer">
        <img
          className={`transition-opacity duration-300 ease-in-out top-0 left-0 ${
            isDone ? "opacity-0" : "opacity-100"
          }`}
          src={circle}
          alt="Circle Icon"
        />
        <img
          className={`transition-opacity duration-300 ease-in-out absolute top-0 left-0 ${
            isDone ? "opacity-100" : "opacity-0"
          }`}
          src={circleFilled}
          alt="Circle Icon"
        />
      </div>
      <span className={`${isDone ? "line-through text-primary" : null}`}>
        {title}
      </span>
    </div>
  );
}
