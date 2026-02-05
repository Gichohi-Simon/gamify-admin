"use client";

import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { loginInitialValues, User } from "@/types/types";
import { setCredentials } from "@/store/features/authSlice";
import { useSignIn } from "@/hooks/auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import GoogleLoginButton from "@/components/GoogleLoginButton";

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutateAsync, isPending } = useSignIn();

  const initialValues: loginInitialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("email is required"),
      password: Yup.string().required("password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const data = await mutateAsync(values);
        dispatch(setCredentials({ userInfo: data.user }));
        toast.success("login successful");
        formik.resetForm();
        setTimeout(() => {
          router.push("/dashboard");
        }, 800);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "login failed";
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
        <p className="text-center text-2xl font-semibold tracking-wider capitalize">
          Lullites
        </p>
        <p className="text-primary text-center text-xs font-bold">
          Gamify general supplies.
        </p>
        <div className="mt-5 mb-3">
          <p className="text-lg font-bold tracking-wider md:text-2xl">login</p>
          <p className="text-xs md:text-sm">
            welcome to gamify store, login to continue.
          </p>
        </div>
        <GoogleLoginButton
          onLogin={(user: User) => {
            dispatch(setCredentials({ userInfo: user }));
            toast.success("Google login successful");
            router.push("/dashboard");
          }}
        />
        <div>
          <label htmlFor="email" className="text-xs font-semibold md:text-sm">
            email
          </label>
          <br />
          <input
            type="text"
            placeholder="email"
            name="email"
            className="mt-2 w-full rounded-md border px-2 py-2 text-xs md:text-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <h4 className="mt-1 text-xs font-bold text-red-500">
              {formik.errors.email}
            </h4>
          ) : null}
        </div>
        <div className="mt-2">
          <label
            htmlFor="password"
            className="text-xs font-semibold md:text-sm"
          >
            password
          </label>
          <br />
          <input
            type="password"
            placeholder="password"
            name="password"
            className="mt-2 w-full rounded-md border px-2 py-2 text-xs md:text-sm"
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
            "login"
          )}
        </button>
        <Link
          href="/signup"
          className="flex items-center justify-center gap-1 text-xs font-semibold lowercase md:text-sm"
        >
          Don&apos;t have an account ?{" "}
          <span className="text-blue-500">sign up</span>
        </Link>
      </form>
    </div>
  );
}
