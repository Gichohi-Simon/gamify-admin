"use client";

import { useParams } from "next/navigation";
import {
  useGetSingleUserById,
  useBanUserFromPlatform,
  useRestoreBannedUser,
  useMakeUserAnAdmin,
  useRevokeUserAsAdmin,
} from "@/hooks/user";
import { useState } from "react";

export default function UserDetails() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, error, refetch } = useGetSingleUserById(id);

  const [adminLoading, setAdminLoading] = useState(false);
  const [banLoading, setBanLoading] = useState(false);

  const makeAdminMutation = useMakeUserAnAdmin();
  const revokeAdminMutation = useRevokeUserAsAdmin();
  const banUserMutation = useBanUserFromPlatform();
  const restoreUserMutation = useRestoreBannedUser();

  if (isLoading)
    return (
      <p className="font-raleway mt-10 text-center text-sm text-gray-500 sm:text-xs">
        Loading user details...
      </p>
    );

  if (error)
    return (
      <p className="font-raleway mt-10 text-center text-sm text-red-500 sm:text-xs">
        Error: {(error as Error).message}
      </p>
    );

  if (!data || !data.user)
    return (
      <p className="font-raleway mt-10 text-center text-sm text-gray-500 sm:text-xs">
        No user data found
      </p>
    );

  const { user } = data;

  const toggleAdmin = async () => {
    setAdminLoading(true);
    try {
      if (user.isAdmin) {
        await revokeAdminMutation.mutateAsync(user.id);
      } else {
        await makeAdminMutation.mutateAsync(user.id);
      }
      await refetch();
    } finally {
      setAdminLoading(false);
    }
  };

  const toggleBan = async () => {
    setBanLoading(true);
    try {
      if (user.isBanned) {
        await restoreUserMutation.mutateAsync(user.id);
      } else {
        await banUserMutation.mutateAsync(user.id);
      }
      await refetch();
    } finally {
      setBanLoading(false);
    }
  };

  return (
    <div className="font-raleway mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="mb-4 text-2xl font-bold text-gray-800 sm:text-xl">
        User Details
      </h1>

      {/* User Info Card */}
      <div className="space-y-2 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-700 sm:text-lg">
          Account Info
        </h2>
        <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 sm:text-xs md:grid-cols-2">
          <p>
            <span className="font-semibold">ID:</span> {user.id}
          </p>
          <p>
            <span className="font-semibold">Username:</span> {user.username}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="flex items-center gap-2">
            <span className="font-semibold">Admin:</span>{" "}
            {user.isAdmin ? "Yes" : "No"}
            <button
              onClick={toggleAdmin}
              disabled={adminLoading}
              className={`ml-2 rounded-full px-2 py-1 text-xs text-white sm:text-[10px] ${
                user.isAdmin
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              } transition-colors duration-200`}
            >
              {adminLoading
                ? "Processing..."
                : user.isAdmin
                  ? "Remove Admin"
                  : "Make Admin"}
            </button>
          </p>
          <p className="flex items-center gap-2">
            <span className="font-semibold">Banned:</span>{" "}
            {user.isBanned ? "Yes" : "No"}
            <button
              onClick={toggleBan}
              disabled={banLoading}
              className={`ml-2 rounded-full px-2 py-1 text-xs text-white sm:text-[10px] ${
                user.isBanned
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              } transition-colors duration-200`}
            >
              {banLoading ? "Processing..." : user.isBanned ? "Unban" : "Ban"}
            </button>
          </p>
          <p>
            <span className="font-semibold">Active:</span>{" "}
            {user.isActive ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-semibold">Created:</span>{" "}
            {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Delivery Address Card */}
      {user.deliveryAddress ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm shadow-md sm:text-xs">
          <h2 className="mb-4 text-xl font-semibold text-gray-700 sm:text-lg">
            Delivery Address
          </h2>
          <div className="grid grid-cols-1 gap-4 text-gray-600 md:grid-cols-2">
            <p>
              <span className="font-semibold">Company:</span>{" "}
              {user.deliveryAddress.companyName}
            </p>
            <p>
              <span className="font-semibold">Street:</span>{" "}
              {user.deliveryAddress.street}
            </p>
            <p>
              <span className="font-semibold">Floor:</span>{" "}
              {user.deliveryAddress.floorNumber ?? "-"}
            </p>
            <p>
              <span className="font-semibold">City:</span>{" "}
              {user.deliveryAddress.city ?? "-"}
            </p>
            <p>
              <span className="font-semibold">Postal Code:</span>{" "}
              {user.deliveryAddress.postalCode}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {user.deliveryAddress.phoneNumber ?? "-"}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500 sm:text-xs">
          No delivery address available
        </p>
      )}
    </div>
  );
}
