"use client";

import { useEffect } from "react";
import { useCheckAuth } from "@/hooks/auth";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials, setLogout } from "@/store/features/authSlice";

export default function AuthProvider() {
  const { data, isLoading } = useCheckAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && data?.user) {
      dispatch(
        setCredentials({
          userInfo: data.user,
        }),
      );
    } else if (!isLoading && !data.user) {
      dispatch(setLogout());
    }
  }, [data?.user, dispatch, isLoading]);
  return null;
}
