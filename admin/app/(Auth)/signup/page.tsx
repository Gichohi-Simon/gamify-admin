"use client";

import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { initialFormValuesInterface } from "@/types/types";
import { useSignUp } from "@/hooks/auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function SignUp() {
  const router = useRouter();
  const { mutateAsync, isPending } = useSignUp();

  const initialValues: initialFormValuesInterface = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("email is required"),
      username: Yup.string().required("username is required"),
      password: Yup.string().required("password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("confirm password is required"),
    }),

    onSubmit: async (values) => {
      try {
        await mutateAsync(values);
        toast.success("signup successfull");
        formik.resetForm();
        setTimeout(() => {
          router.push("/login");
        }, 800);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "error signing up";
        toast.error(message);
      }
    },
  });

  return (
    <div className="font-raleway flex min-h-screen items-center justify-center bg-gray-100">
      <form
        className="w-3/4 rounded-xl bg-white px-4 py-6 md:w-4/12 md:px-8"
        onSubmit={formik.handleSubmit}
      >
        <p className="text-center text-2xl font-semibold tracking-wider uppercase">
          Lullites
        </p>
        <p className="text-primary text-center text-xs font-bold">
          gamify general supplies.
        </p>
        <div className="mt-5 mb-3">
          <p className="text-lg font-bold tracking-wider md:text-2xl">
            Register
          </p>
          <p className="text-xs md:text-sm">welcome to gamify, Lullites!</p>
        </div>
        <div>
          <label htmlFor="email" className="text-xs font-semibold md:text-sm">
            email
          </label>
          <br />
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="mt-2 w-full rounded-md border px-2 py-2 text-xs md:text-sm"
          />
          {formik.touched.email && formik.errors.email ? (
            <h4 className="mt-1 text-xs font-bold text-red-500">
              {formik.errors.email}
            </h4>
          ) : null}
        </div>

        <div className="mt-4">
          <label
            htmlFor="username"
            className="text-xs font-semibold md:text-sm"
          >
            username
          </label>
          <br />
          <input
            name="username"
            type="text"
            placeholder="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className="mt-2 w-full rounded-md border px-2 py-2 text-xs md:text-sm"
          />
          {formik.touched.username && formik.errors.username ? (
            <h4 className="mt-1 text-xs font-bold text-red-500">
              {formik.errors.username}
            </h4>
          ) : null}
        </div>

        <div className="mt-4">
          <label
            htmlFor="password"
            className="text-xs font-semibold md:text-sm"
          >
            password
          </label>
          <br />
          <input
            name="password"
            type="password"
            placeholder="password"
            className="mt-2 w-full rounded border px-2 py-2 text-xs md:text-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <h4 className="mt-1 text-xs font-bold text-red-500">
              {formik.errors.password}
            </h4>
          ) : null}
        </div>
        <div className="mt-4">
          <label
            htmlFor="confirmPassword"
            className="text-xs font-semibold lowercase md:text-sm"
          >
            confirm Password
          </label>
          <br />
          <input
            name="confirmPassword"
            type="password"
            placeholder="confirmPassword"
            className="mt-2 w-full rounded-md border px-2 py-2 text-xs md:text-sm"
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <h4 className="mt-1 text-xs font-bold text-red-500">
              {formik.errors.confirmPassword}
            </h4>
          ) : null}
        </div>

        <button
          disabled={isPending}
          className="bg-primary mt-8 mb-5 w-full rounded-md py-2 text-xs lowercase md:text-sm"
          type="submit"
        >
          {isPending ? (
            <div className="flex justify-center">
              <Loader2 className="text-accent h-6 w-6 animate-spin" />
            </div>
          ) : (
            "sign up"
          )}
        </button>
        <Link
          href="/login"
          className="flex items-center justify-center gap-1 text-xs font-semibold lowercase md:text-sm"
        >
          Already have an account?
          <span className="text-blue-400">login</span>
        </Link>
      </form>
    </div>
  );
}
