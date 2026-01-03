import Protected from "@/components/protected";
import UserList from "@/components/users-list";
import SectionTitle from "@/components/section-title";

export default function Users() {
  return (
    <Protected>
      <section className="min-w-0 px-6 py-4">
        <SectionTitle>user&apos;s list</SectionTitle>
        <UserList />
      </section>
    </Protected>
  );
}
