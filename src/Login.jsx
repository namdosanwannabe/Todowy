import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogIn(event) {
    event.preventDefault();

    if (!email || !password) {
      console.error("Email and password are required");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Error logging in:", error.message);
    } else {
      console.log("Log in successful:", data);
      navigate("/home");
    }

    setEmail("");
    setPassword("");
  }

  return (
    <div>
      <p>Login</p>
      <form onSubmit={handleLogIn}>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          name="email"
          id="email"
          className="border-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          className="border-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" className="border-2">
          Login
        </button>
        <p>
          No account yet?{" "}
          <b style={{ cursor: "pointer" }} onClick={() => navigate("/sign-up")}>
            Sign Up
          </b>
        </p>
      </form>
    </div>
  );
}
