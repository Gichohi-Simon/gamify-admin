"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

type childrenProps = {
  children: React.ReactNode;
};

export default function Protected({ children }: childrenProps) {
  const { userInfo, initialized } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (initialized && !userInfo) {
      router.replace("/login");
    }
  }, [initialized, userInfo, router]);

  if (!initialized) {
    return (
      <div className="flex min-h-[60px] items-center justify-center">
        <p className="text-sm">Checking authentication...</p>
      </div>
    );
  }
  if (!userInfo) {
    return null;
  }
  return <>{children}</>;
}
