import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp(event) {
    event.preventDefault();

    if (!email || !password) return;

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Error signing up:", error.message);
    } else {
      console.log("Sign up successful:", data);

      const { user } = data;
      const { error: insertError } = await supabase
        .from("users")
        .insert({ id: user.id, email: user.email });

      if (insertError) {
        console.error("Error inserting user data:", insertError.message);
      } else {
        console.log("User data inserted successfully");
        navigate("/");
        setEmail("");
        setPassword("");
      }
    }
  }

  return (
    <div>
      <p>Sign Up</p>
      <form onSubmit={handleSignUp}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
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
        <button type="submit">Sign Up</button>
        <p>
          Already have account?{" "}
          <b style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            Login
          </b>
        </p>
      </form>
    </div>
  );
}
