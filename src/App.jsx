import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";
import background from "./assets/images/background-image.svg";
import circle from "./assets/images/icons/circle-outlined-icon.svg";
import circleFilled from "./assets/images/icons/circle-filled-icon.svg";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Input from "./Input";

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
      console.log(data);
      fetchTodo();
      setTodo((prevTodos) => [...prevTodos, data[0]]);
    }
  }

  async function handleToggleTodo(id, isDone) {
    const { data, error } = await supabase
      .from("todowy")
      .update({ is_done: !isDone })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error adding todo:", error);
    } else {
      console.log(data);
      setTodo((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, is_done: !isDone } : todo
        )
      );
    }
  }

  return (
    <div className="flex flex-col flex-1 gap-6">
      <Header todo={todo} />
      <TodoList todo={todo} setTodo={setTodo} onToggleTodo={handleToggleTodo} />
      <Input onAddTodo={handleAddTodo} />
    </div>
  );
}

function TodoList({ todo, onToggleTodo }) {
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
          isDone={item.is_done}
          onToggleTodo={onToggleTodo}
        />
      ))}
    </div>
  );
}

function Todo({ id, title, isDone, onToggleTodo }) {
  return (
    <div className="input-field-container w-full py-4 bg-light text-black relative rounded-md pl-14">
      <div
        className="plus-icon-container w-6 h-6 absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer"
        onClick={() => onToggleTodo(id, isDone)}
      >
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
      <span
        className={`${isDone ? "line-through text-primary opacity-75" : ""}`}
      >
        {title}
      </span>
    </div>
  );
}
