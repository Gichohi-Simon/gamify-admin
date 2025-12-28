"use client";

import { useGetAllUsers } from "@/hooks/user";

export default function UserList() {
  const { data: users, isLoading, error } = useGetAllUsers();

  if (isLoading) return <p className="mt-4 text-sm">Loading users…</p>;
  if (error) return <p className="mt-4 text-sm text-red-500">Failed</p>;

  return (
    <div className="relative mt-6 overflow-x-auto rounded-lg border">
      <table className="font-raleway w-max min-w-full border-collapse text-left">
        <thead className="bg-gray-100">
          <tr className="text-xs font-semibold md:text-sm">
            <th className="px-4 py-3">User</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-center">Role</th>
            <th className="px-4 py-3 text-center">Ban</th>
            <th className="px-4 py-3 text-center">Admin</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 text-xs md:text-sm">{user.username}</td>

              <td className="max-w-[220px] truncate px-4 py-3 text-xs md:text-sm">
                {user.email}
              </td>

              <td className="px-4 py-3 text-center">
                <span
                  className={`rounded px-2 py-1 text-[10px] md:text-xs ${
                    user.isActive ? "bg-green-400" : "bg-red-400"
                  }`}
                >
                  {user.isActive ? "Active" : "Banned"}
                </span>
              </td>

              <td className="px-4 py-3 text-center">
                <span
                  className={`rounded px-2 py-1 text-[10px] md:text-xs ${
                    user.isAdmin ? "bg-blue-400 text-white" : "bg-gray-300"
                  }`}
                >
                  {user.isAdmin ? "Admin" : "User"}
                </span>
              </td>

              <td className="px-4 py-3 text-center">
                <button className="rounded-full bg-red-500 px-3 py-1 text-[10px] whitespace-nowrap text-white">
                  {user.isActive ? "Ban" : "Unban"}
                </button>
              </td>

              <td className="px-4 py-3 text-center">
                <button className="bg-primary rounded-full px-3 py-1 text-[10px] whitespace-nowrap text-white">
                  {user.isAdmin ? "Remove" : "Make"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
