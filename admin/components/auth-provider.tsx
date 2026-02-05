"use client";

import { useEffect } from "react";
import { useCheckAuth } from "@/hooks/auth";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials, setLogout } from "@/store/features/authSlice";

const ALLOWED = new Set(["ADMIN", "EMPLOYEE"]);

export default function AuthProvider() {
  const { data, isLoading } = useCheckAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoading) return;

    const role = data?.user?.role;

    if (role && ALLOWED.has(role)) {
      dispatch(setCredentials({ userInfo: data.user }));
    } else {
      dispatch(setLogout());
      // optional: window.location.href = "https://your-main-site.com";
      // or push("/not-authorized")
    }
  }, [data, dispatch, isLoading]);

  return null;
}
