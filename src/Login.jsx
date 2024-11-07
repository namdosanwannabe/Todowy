import React, { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import HeroImage from "./assets/images/hero-sign-in-image.svg";
import { supabase } from "./supabaseClient";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

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
      setShowLabel(true);
    } else {
      console.log("Log in successful:", data);
      navigate("/home");
    }

    setEmail("");
    setPassword("");
  }

  return (
    <div className="h-full lg:h-screen grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5 p-5 relative">
      <div className="pattern"></div>
      <div className="relative h-full rounded-lg bg-primary p-8 flex flex-col items-center justify-center">
        <h1 className="absolute top-3 left-4 sm:top-5 sm:left-5 text-white font-bold text-lg sm:text-4xl md:text-4xl">
          Todowy
        </h1>
        <img
          className="w-full max-w-xs max-h-[200px] sm:max-w-sm md:max-w-lg sm:max-h-[350px] md:max-h-[400px]  object-contain sm:my-10 lg:my-0"
          src={HeroImage}
          alt="Man with Tree"
        />
      </div>

      <div className="h-full rounded-lg border-2 p-8 md:py-24 flex flex-col items-center justify-center">
        <form
          className="w-full md:w-1/2 lg:w-2/3 xl:w-3/5"
          onSubmit={handleLogIn}
        >
          <h2 className="text-black font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
            Sign In
          </h2>
          <div className="flex flex-col gap-5">
            <div>
              <input
                type="email"
                id="UserEmail"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md text-base text-black border-gray-light p-3 shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="UserPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-md text-base text-black border-gray-light p-3 shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute mt-[2px] top-1/2 right-0 -translate-y-1/2 pr-3 text-gray-500"
              >
                {showPassword ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="flex justify-end -mt-3">
              <a
                href="/forgot-password"
                className="text-sm font-bold text-primary"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 text-white font-medium rounded bg-primary mt-8 hover:bg-primary-dark transition-all duration-300"
          >
            Sign in
          </button>

          <p className="text-center text-black mt-6">
            Don’t have an account?{" "}
            <b
              className="font-bold text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/sign-up")}
            >
              Sign up
            </b>
          </p>
        </form>
      </div>
    </div>
  );
}
