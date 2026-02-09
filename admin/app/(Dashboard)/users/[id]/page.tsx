"use client";

import { useParams } from "next/navigation";
import {
  useGetSingleUserById,
  useBanUserFromPlatform,
  useRestoreBannedUser,
  useMakeUserAnAdmin,
  useRevokeUserAsAdmin,
  useMakeUserAnEmployee,
  useRemoveUserAsAnEmployee,
} from "@/hooks/user";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftCircle } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

export default function UserDetails() {
  const currentUser = useAppSelector((state) => state?.auth.userInfo);
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const { data, isLoading, error, refetch } = useGetSingleUserById(id);

  const [adminLoading, setAdminLoading] = useState(false);
  const [banLoading, setBanLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(false);

  const makeAdminMutation = useMakeUserAnAdmin();
  const revokeAdminMutation = useRevokeUserAsAdmin();
  const banUserMutation = useBanUserFromPlatform();
  const restoreUserMutation = useRestoreBannedUser();
  const makeUserEmployeeMutation = useMakeUserAnEmployee();
  const revokeEmployeeMutation = useRemoveUserAsAnEmployee();

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
      if (user.role === "ADMIN") {
        await revokeAdminMutation.mutateAsync(user.id);
      } else {
        await makeAdminMutation.mutateAsync(user.id);
      }
      await refetch();
    } finally {
      setAdminLoading(false);
    }
  };

  const toggleEmployee = async () => {
    setEmployeeLoading(true);
    try {
      if (user.role === "EMPLOYEE") {
        await revokeEmployeeMutation.mutateAsync(user.id);
      } else {
        await makeUserEmployeeMutation.mutateAsync(user.id);
      }
      await refetch();
    } finally {
      setEmployeeLoading(false);
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
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold text-gray-800 sm:text-xl">
          User Details
        </h1>
        <div
          className="hover:bg-primary flex h-8 items-center gap-2 rounded-sm bg-black px-4 hover:cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeftCircle className="h-4 w-4 text-white hover:text-black" />
          <span className="text-xs font-semibold tracking-wider text-white capitalize hover:cursor-pointer hover:text-black">
            back
          </span>
        </div>
      </div>

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
            {user.role === "ADMIN" ? "Yes" : "No"}
            {currentUser?.role === "ADMIN" ? (
              <button
                onClick={toggleAdmin}
                disabled={adminLoading}
                className={`ml-2 rounded-full px-2 py-1 text-xs text-white sm:text-[10px] ${
                  user.role === "ADMIN"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                } transition-colors duration-200`}
              >
                {adminLoading
                  ? "Processing..."
                  : user.role === "ADMIN"
                    ? "Remove Admin"
                    : "Make Admin"}
              </button>
            ) : (
              <></>
            )}
          </p>
          <p className="flex items-center gap-2">
            <span className="font-semibold">Employee:</span>{" "}
            {user.role === "EMPLOYEE" ? "Yes" : "No"}
            {currentUser?.role === "ADMIN" ? (
              <button
                onClick={toggleEmployee}
                disabled={employeeLoading}
                className={`ml-2 rounded-full px-2 py-1 text-xs text-white sm:text-[10px] ${
                  user.role === "EMPLOYEE"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                } transition-colors duration-200`}
              >
                {employeeLoading
                  ? "Processing..."
                  : user.role === "EMPLOYEE"
                    ? "Remove Employee"
                    : "Make Employee"}
              </button>
            ) : (
              <></>
            )}
          </p>
          <p className="flex items-center gap-2">
            <span className="font-semibold">Banned:</span>{" "}
            {user.isBanned ? "Yes" : "No"}
            {currentUser?.role === "ADMIN" ? (
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
            ) : (
              <></>
            )}
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
