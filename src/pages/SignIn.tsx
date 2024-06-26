import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import userMutations from "../graphql/mutations/userMutations";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";

const { SIGNIN } = userMutations;

const SignIn = () => {
  const { persistUserToken } = useAuth();
  const [signin, { data, loading }] = useMutation(SIGNIN);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (data?.login.status === "200") {
      persistUserToken(data.login.data.token);
      navigate("/cards");
    }

    if (data?.login.status === "400") {
      toast.error(data.login.message);
    }
  }, [data]);

  function submitForm(formData: { username: string; password: string }) {
    signin({
      variables: {
        data: formData,
      },
    });
  }

  return (
    <section className="h-screen flex justify-center items-center bg-white">
      <div className="border border-gray-400 rounded-md p-9">
        <form onSubmit={handleSubmit(submitForm)} className="mb-3">
          <h1 className="text-center font-semibold mb-2">Sign in</h1>
          <label htmlFor="" className="text-sm font-semibold">
            Username
          </label>
          <input
            type="text"
            {...register("username", {
              required: "This is required!",
            })}
            className="w-full border rounded-md py-2 px-3 mt-1 text-gray-600 placeholder:text-gray-300 placeholder:text-sm"
            placeholder="Enter username..."
          />
          <p className="text-xs text-red-600">{errors.username?.message}</p>

          <br />

          <label htmlFor="" className="text-sm font-semibold">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "This is required!",
              })}
              className="w-full border rounded-md py-2 px-3 mt-1 text-gray-600 placeholder:text-gray-300 placeholder:text-sm"
              placeholder="Enter password..."
            />
            <p className="text-xs text-red-600">{errors.password?.message}</p>
            <span
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <AiOutlineEye className="text-2xl text-gray-500" />
              ) : (
                <AiOutlineEyeInvisible className="text-2xl text-gray-500" />
              )}
            </span>
          </div>

          <div className="flex flex-col justify-center text-xs text-center mt-5 gap-2">
            <button
              type="submit"
              className="btn text-black border border-black px-3 py-1 rounded-md flex items-center justify-center gap-2 hover:cursor-pointer hover:text-white hover:bg-black"
              disabled={loading}
            >
              {loading && (
                <span className="loader border border-black hover:border-white"></span>
              )}
              Sign in
            </button>
            <Link
              to="/"
              className="btn text-black px-3 py-1 rounded-md underline hover:cursor-pointer"
            >
              Back to home
            </Link>
          </div>
        </form>
        <div className="flex flex-row w-full items-center justify-center">
          <Link
            to="/register"
            className="btn px-3 py-1 text-sm rounded-md bg-black text-white hover:cursor-pointer hover:bg-gray-600 thover:text-black"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
