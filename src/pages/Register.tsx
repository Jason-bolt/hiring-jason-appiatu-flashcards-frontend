import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import userMutations from "../graphql/mutations/userMutations";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const { REGISTER_USER } = userMutations;

const Register = () => {
  const [registerUser, { data, loading }] = useMutation(REGISTER_USER);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  useEffect(() => {
    if (data?.registerUser.status === "201") {
      setTimeout(function () {
        navigate("/signin");
      }, 1000);
      toast.success("Account created!");
    }

    if (data?.registerUser.status === "400") {
      toast.error(data.registerUser.message);
    }
  }, [data]);

  function submitForm(formData: {
    username: string;
    password: string;
    passwordConfirmation: string;
  }) {
    registerUser({
      variables: {
        data: formData,
      },
    });
  }

  return (
    <section className="h-screen flex justify-center items-center bg-white">
      <div className="border border-gray-400 rounded-md p-9">
        <form onSubmit={handleSubmit(submitForm)}>
          <h1 className="text-center font-semibold mb-2">
            Join <em>FLASH</em>!
          </h1>
          <label htmlFor="" className="text-sm font-semibold">
            Username
          </label>
          <input
            type="text"
            {...register("username", { required: "This is required!" })}
            className="w-full border rounded-md py-2 px-3 mt-1 text-gray-600 placeholder:text-gray-300 placeholder:text-sm"
            placeholder="Enter username..."
          />
          <p className="text-xs text-red-600">{errors.username?.message}</p>

          <br />

          <label htmlFor="" className="text-sm font-semibold">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "This is required!",
              minLength: {
                value: 8,
                message: "Min length is 8!",
              },
            })}
            className="w-full border rounded-md py-2 px-3 mt-1 text-gray-600 placeholder:text-gray-300 placeholder:text-sm"
            placeholder="Enter password..."
          />
          <p className="text-xs text-red-600 mb-0">
            {errors.password?.message}
          </p>

          <br />

          <label htmlFor="" className="text-sm font-semibold">
            Confirm password
          </label>
          <input
            type="password"
            {...register("passwordConfirmation", {
              required: "This is required!",
              minLength: {
                value: 8,
                message: "Min length is 8!",
              },
            })}
            className="w-full border rounded-md py-2 px-3 mt-1 text-gray-600 placeholder:text-gray-300 placeholder:text-sm"
            placeholder="Confirm password..."
          />
          <p className="text-xs text-red-600">
            {errors.passwordConfirmation?.message}
          </p>

          <div className="flex flex-col justify-center text-xs text-center mt-5 gap-2">
            <button
              type="submit"
              className="btn text-black border border-black px-3 py-1 rounded-md flex items-center justify-center gap-2 hover:cursor-pointer hover:text-white hover:bg-black"
              disabled={loading}
            >
              {loading && <span className="loader"></span>}
              Register
            </button>
            <Link
              to="/"
              className="btn text-black px-3 py-1 rounded-md underline hover:cursor-pointer"
            >
              Back to home
            </Link>
            <Link
              to="/signin"
              className="btn text-black px-3 py-1 rounded-md underline hover:cursor-pointer"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
