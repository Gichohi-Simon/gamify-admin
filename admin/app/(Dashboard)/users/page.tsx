import Protected from "@/components/protected";
import UserList from "@/components/users-list";

export default function Users() {
  return (
    <Protected>
      <section className="min-w-0 px-6 py-4">
        <p className="font-raleway text-lg font-semibold tracking-wider capitalize">
          user&apos;s list
        </p>

        <UserList />
      </section>
    </Protected>
  );
}
