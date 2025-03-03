import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import background from "./assets/images/background-image.svg";
import circle from "./assets/images/icons/circle-outlined-icon.svg";
import deleteIcon from "./assets/images/icons/delete-icon.svg";
import circleFilled from "./assets/images/icons/circle-filled-icon.svg";
import { HiStar, HiOutlineStar } from "react-icons/hi2";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Input from "./Input";
import Button from "./components/Button";
import { Modal } from "./components/Modal";

export default function Home() {
  const [users, setUsers] = useState(null);
  const [emails, setEmail] = useState("");

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUsers(session.user);
        setEmail(session.user.email);
      } else {
        console.log("User not signed in");
        setUsers(null);
      }
    });
    return () => subscription?.unsubscribe();
  }, []);

  return (
    <div className="app bg-white h-screen w-full text-black flex p-5 gap-5">
      <Sidebar users={users} />
      <Main users={users} />
    </div>
  );
}

function Main({ users }) {
  const [todo, setTodo] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    if (users) {
      fetchTodo();
    }
  }, [users]);

  async function fetchTodo() {
    if (!users) return;

    const { data, error } = await supabase
      .from("todowy")
      .select("*")
      .eq("user_id", users.id);

    if (error) {
      console.error("Error fetching todos:", error);
    } else {
      setTodo(data);
    }
  }

  async function handleAddTodo(item) {
    const { data, error } = await supabase
      .from("todowy")
      .insert([item])
      .select();

    if (error) {
      console.error("Error adding todo:", error);
    } else {
      setTodo((prevTodos) => [...prevTodos, data[0]]);
    }
  }

  async function handleDeleteTodo(id, userId) {
    const { error } = await supabase
      .from("todowy")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      console.error("Error deleting todo:", error);
    } else {
      setTodo((todos) => todos.filter((todo) => todo.id !== id));
      document.getElementById("todo-drawer").checked = false;
      document.getElementById("delete_modal").close();
    }
  }

  async function handleToggleTodo(id, isDone) {
    const { data, error } = await supabase
      .from("todowy")
      .update({ is_done: !isDone })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error:", error);
    } else {
      console.log(data);
      setTodo((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, is_done: !isDone } : todo
        )
      );
    }
  }

  async function handleOpenDrawer(id) {
    document.getElementById("todo-drawer").checked = true;

    const { data, error } = await supabase
      .from("todowy")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching todo:", error);
    } else {
      setSelectedTodo(data);
    }
  }

  return (
    <div className="flex flex-col flex-1 gap-6">
      <Header todo={todo} />
      <Drawer selectedTodo={selectedTodo} />
      <TodoList
        todo={todo}
        setTodo={setTodo}
        onToggleTodo={handleToggleTodo}
        onOpenDrawer={handleOpenDrawer}
      />
      <Input onAddTodo={handleAddTodo} users={users} />
      <Modal
        title={
          selectedTodo && `"${selectedTodo.title}" will permanently deleted.`
        }
      >
        <Button
          color="text-white"
          background="bg-red"
          onClick={(event) => {
            event.preventDefault();
            handleDeleteTodo(selectedTodo.id, users.id);
          }}
        >
          Delete
        </Button>
        <Button color="text-black" background="bg-gray-light">
          Cancel
        </Button>
      </Modal>
    </div>
  );
}

function TodoList({ todo, onToggleTodo, onOpenDrawer }) {
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
          onOpenDrawer={onOpenDrawer}
        />
      ))}
    </div>
  );
}

function Todo({ id, title, isDone, onToggleTodo, onOpenDrawer }) {
  const [isImportant, setIsImportant] = useState(true);

  return (
    <div
      className="input-field-container w-full p-4 bg-light text-black relative rounded-md pl-14 flex justify-between items-center"
      onClick={() => onOpenDrawer(id)}
    >
      <div>
        <div
          className="plus-icon-container w-6 h-6 absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer"
          onClick={(event) => {
            event.stopPropagation();
            onToggleTodo(id, isDone);
          }}
        >
          <img
            className={`transition-opacity duration-300 ease-in-out top-0 left-0 ${isDone ? "opacity-0" : "opacity-100"
              }`}
            src={circle}
            alt="Circle Icon"
          />
          <img
            className={`transition-opacity duration-300 ease-in-out absolute top-0 left-0 ${isDone ? "opacity-100" : "opacity-0"
              }`}
            src={circleFilled}
            alt="Circle Icon"
          />
        </div>
        <span
          className={`${isDone ? "line-through text-primary opacity-75" : ""
            } text-base`}
        >
          {title}
        </span>
      </div>
      <div className="flex">
        <div
          className="btn-star"
          onClick={(e) => {
            setIsImportant(!isImportant);
            e.stopPropagation();
          }}
        >
          {isImportant ? (
            <HiStar className="w-6 h-6 text-primary cursor-pointer container object-fill" />
          ) : (
            <HiOutlineStar className="w-6 h-6 text-primary cursor-pointer object-contain" />
          )}
        </div>
      </div>
    </div>
  );
}

function Drawer({ selectedTodo }) {
  return (
    <div className="drawer drawer-end">
      <input id="todo-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side z-50">
        <label
          htmlFor="todo-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu flex flex-col bg-light text-neutral min-h-full w-96 p-0">
          <div className="menu-wrapper p-6">
            {selectedTodo ? (
              <div>
                <h1 className="text-2xl font-bold text-wrap break-all">
                  {selectedTodo.title}
                </h1>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            )}
          </div>
          <div className="p-6 border-t-2 mt-auto text-center relative">
            {selectedTodo && (
              <p className="text-black font-semibold">
                Created on{" "}
                {new Intl.DateTimeFormat("en-US", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                }).format(new Date(selectedTodo.created_at))}
              </p>
            )}
            <img
              src={deleteIcon}
              alt="Delete Icon"
              className="w-4 h-4 absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-12 cursor-pointer select-none"
              onClick={() =>
                document.getElementById("delete_modal").showModal()
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
