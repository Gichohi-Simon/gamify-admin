// "use client";

// import { useGetAllUsers } from "@/hooks/user";
// import Link from "next/link";

// export default function UserList() {
//   const { data: users, isLoading, error } = useGetAllUsers();

//   if (isLoading) return <p className="mt-4 text-sm">Loading users…</p>;
//   if (error) return <p className="mt-4 text-sm text-red-500">Failed</p>;

//   return (
//     <div className="relative mt-6 overflow-x-auto rounded-lg border">
//       <table className="font-raleway w-max min-w-full border-collapse text-left">
//         <thead className="bg-gray-100">
//           <tr className="text-xs font-semibold md:text-sm">
//             <th className="px-4 py-3">User</th>
//             <th className="px-4 py-3">Email</th>
//             <th className="px-4 py-3 text-center">Status</th>
//             <th className="px-4 py-3 text-center">Role</th>
//             <th className="px-4 py-3 text-center">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {users?.map((user) => (
//             <tr key={user.id} className="border-b hover:bg-gray-50">
//               <td className="px-4 py-3 text-xs md:text-sm">{user.username}</td>

//               <td className="max-w-[220px] truncate px-4 py-3 text-xs md:text-sm">
//                 {user.email}
//               </td>

//               <td className="px-4 py-3 text-center">
//                 <span
//                   className={`rounded px-2 py-1 text-[10px] md:text-xs ${
//                     user.isActive ? "bg-green-400" : "bg-red-400"
//                   }`}
//                 >
//                   {user.isActive ? "Active" : "Banned"}
//                 </span>
//               </td>

//               <td className="px-4 py-3 text-center">
//                 <span
//                   className={`rounded px-2 py-1 text-[10px] md:text-xs ${
//                     user.role === "ADMIN"
//                       ? "bg-blue-400 text-white"
//                       : "bg-gray-300"
//                   }`}
//                 >
//                   {user.role === "ADMIN" ? "Admin" : "User"}
//                 </span>
//               </td>

//               <td className="px-4 py-3 text-center">
//                 <Link
//                   className="rounded-lg bg-green-600 px-3 py-2 text-xs whitespace-nowrap text-white"
//                   href={`/users/${user.id}`}
//                 >
//                   view
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";

import { useGetAllUsers } from "@/hooks/user";
import Link from "next/link";

export default function UserList() {
  const { data: users, isLoading, error } = useGetAllUsers();

  if (isLoading) return <p className="mt-4 text-sm">Loading users…</p>;
  if (error)
    return <p className="mt-4 text-sm text-red-500">Failed to load users</p>;

  return (
    <div className="relative mt-6 overflow-x-auto rounded-lg border">
      <table className="font-raleway w-full border-collapse text-left">
        <thead className="bg-gray-100">
          <tr className="text-xs font-semibold md:text-sm">
            <th className="px-4 py-3">User</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-center">Role</th>
            <th className="px-4 py-3 text-center">Actions</th>
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
                    user.isActive
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {user.isActive ? "Active" : "Banned"}
                </span>
              </td>

              <td className="px-4 py-3 text-center">
                <span
                  className={`rounded px-2 py-1 text-[10px] md:text-xs ${
                    user.role === "ADMIN"
                      ? "bg-blue-500 text-white"
                      : user.role === "EMPLOYEE"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-300 text-gray-800"
                  }`}
                >
                  {user.role === "ADMIN"
                    ? "Admin"
                    : user.role === "EMPLOYEE"
                      ? "Employee"
                      : "User"}
                </span>
              </td>

              <td className="px-4 py-3 text-center">
                <Link
                  href={`/users/${user.id}`}
                  className="rounded-lg bg-green-600 px-3 py-2 text-xs whitespace-nowrap text-white hover:bg-green-700"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
