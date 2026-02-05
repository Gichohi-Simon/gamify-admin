"use client";

import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { toast } from "sonner";
import type { User } from "@/types/types";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function GoogleLoginButton({
  onLogin,
}: {
  onLogin: (user: User) => void;
}) {
  return (
    <div className="mt-4 mb-4">
      <div>
        <GoogleLogin
          onSuccess={async (CredentialResponse: CredentialResponse) => {
            try {
              const idToken = CredentialResponse.credential;
              if (!idToken) throw new Error("No Google credential received");

              const res = await fetch(`${API}/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ idToken }),
              });

              if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || "Google login failed");
              }

              const data = await res.json();
              onLogin?.(data.user);
            } catch (error: any) {
              const message =
                error instanceof Error ? error.message : "Google login failed";
              toast.error(message);
            }
          }}
          onError={() => {
            toast.error("Google login failed");
          }}
          theme="outline"
          size="large"
          shape="pill"
          width="100%"
          text="continue_with"
          logo_alignment="center"
        />
        <p className="mt-2 text-center text-[11px] text-gray-500">
          we don&apos;t post anything to your account
        </p>
        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-200">Or</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
