import UserList from "@/components/users-list";
import React from "react";

export default function Users() {
  return (
    <div className="px-5 py-4">
      <p className="font-raleway text-lg font-semibold tracking-wider capitalize">
        user&apos;s list
      </p>
      <UserList />
    </div>
  );
}
