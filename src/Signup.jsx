import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import HeroImage from "./assets/images/hero-sign-up-image.svg";
import { supabase } from "./supabaseClient";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSignUp(event) {
    event.preventDefault();

    if (!email || !password || !confirmPassword) {
      console.error("Email and password are required");
      return;
    }

    if (password !== confirmPassword) {
      console.error("Password is not match");
      return;
    }

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
    <div className="h-full lg:h-screen grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5 p-5 relative">
      <div className="pattern"></div>
      <div className="relative h-full rounded-lg bg-primary p-8 flex flex-col items-center justify-center">
        <h1 className="absolute top-3 left-4 sm:top-5 sm:left-5 text-white font-bold text-lg sm:text-4xl md:text-4xl">
          Todowy
        </h1>
        <img
          className="w-full max-w-xs max-h-[200px] sm:max-w-sm md:max-w-lg sm:max-h-[350px] md:max-h-[500px]  object-contain sm:my-10 lg:my-0"
          src={HeroImage}
          alt="Man with Tree"
        />
      </div>

      <div className="h-full rounded-lg p-8 md:py-24 flex flex-col items-center justify-center">
        <form
          className="w-full md:w-1/2 lg:w-2/3 xl:w-3/5"
          onSubmit={handleSignUp}
        >
          <h2 className="text-black font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
            Sign Up
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
                  <HiOutlineEye className="h-5 w-5" />
                ) : (
                  <HiOutlineEyeOff className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="UserConfirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full rounded-md text-base text-black border-gray-light p-3 shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary pr-10"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute mt-[2px] top-1/2 right-0 -translate-y-1/2 pr-3 text-gray-500"
              >
                {showConfirmPassword ? (
                  <HiOutlineEye className="h-5 w-5" />
                ) : (
                  <HiOutlineEyeOff className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 text-white font-medium rounded bg-primary mt-8 hover:bg-primary-dark transition-all duration-300"
          >
            Sign up
          </button>

          <p className="text-center mt-6 text-black">
            Already have an account?{" "}
            <b
              className="font-bold text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Sign in
            </b>
          </p>
        </form>
      </div>
    </div>
  );
}
