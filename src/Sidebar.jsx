import { useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import menu from "./assets/images/icons/menu-icon.svg";

export default function Sidebar({ users }) {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  async function handleSignOutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      console.log("Log out successful");
      navigate("/");
    }
  }

  return (
    <div
      className={`sidebar h-full flex flex-col rounded-xl p-5 pb-8 transition-width duration-300 ease-in-out 
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
      {/* <h1 className="mt-5 text-center font-semibold">{users && users.email}</h1> */}
      {/* <button
        className="mt-auto bg-red p-2 rounded text-white"
        onClick={() => handleSignOutUser()}
      >
        Log Out
      </button> */}
    </div>
  );
}
