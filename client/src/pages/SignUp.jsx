import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";

const SignUp = () => {
  const [formData, setFormdata] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData
      );
      console.log(res);
      if (res.data.success === true) {
        toast.success(res.data.message);
        setLoading(false);
        navigate("/signin");
      }
      if (res.data.success === false) {
        toast.error("Something went wrong !!");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong !!");
    }
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col">
      <h1 className="text-4xl text-center font-semibold my-8">Sign Up</h1>
      <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-2 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-2 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-2 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-blue-800 text-white rounded-lg p-2 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading...." : "Sign up"}
        </button>
        <Oauth />
      </form>
      <div className="flex p-4 gap-2">
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-800">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
