"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type SignInSchema = {
  email: string;
  password: string;
};

const SignInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver<SignInSchema>(SignInSchema),
  });
  async function SignIn(data: SignInSchema) {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (response?.error) {
        alert("error");
        return;
      }
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  }

  // ...
  return (
    <div className="bg-zinc-700 flex h-screen justify-center items-center">
      <form
        onSubmit={handleSubmit(SignIn)}
        action=""
        className="bg-white flex p-8 rounded-3xl flex-col gap-2 w-full mx-10 md:w-[50%] xl:w-[20%]"
      >
        <h1 className="text-center py-3 text-3xl font-bold underline">
          Fazer Login
        </h1>
        <label htmlFor="">Email</label>
        <input
          type="email"
          maxLength={60}
          className="bg-zinc-500 h-10 rounded-lg px-4 placeholder:text-white text-white border-zinc-950 border-2"
          placeholder="Email..."
          {...register("email")}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          className="bg-zinc-500 h-10 rounded-lg placeholder:text-white px-4 text-white border-zinc-950 border-2"
          placeholder="Password"
          {...register("password")}
        />

        <button
          type="submit"
          className="bg-zinc-600 h-10 rounded-lg text-white my-4 hover:bg-zinc-900 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none ..."
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
