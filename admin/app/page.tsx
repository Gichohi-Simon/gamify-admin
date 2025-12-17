// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="min-h-screen md:flex">
//       <div className="flex w-full items-center justify-center px-10 text-center md:w-1/2">
//         <div>
//           <h2 className="font-raleway text-4xl font-bold tracking-wider capitalize">
//             Gamify General <span className="text-primary">Supplies</span> and
//             Services
//           </h2>
//           <p className="font-raleway my-8 text-base tracking-wider capitalize">
//             suppliers of materials used in handling{" "}
//             <span className="text-primary"> warehouse</span> products
//           </p>
//           <button className="hover:bg-primary mt-4 w-full cursor-pointer rounded-lg bg-black px-10 py-2 text-sm text-white hover:text-black">
//             <Link href="/login">Sign in</Link>
//           </button>
//         </div>
//       </div>
//       <div
//         className="w-full bg-cover bg-center bg-no-repeat md:w-1/2"
//         style={{ backgroundImage: "url('/warehouse.jpg')" }}
//       ></div>
//     </div>
//   );
// }

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Content */}
      <div className="flex w-full items-center justify-center px-6 text-center md:w-1/2 md:px-12">
        <div className="max-w-lg">
          <h2 className="font-raleway text-2xl font-bold tracking-wider capitalize md:text-4xl">
            Gamify General <span className="text-primary">Supplies</span> and
            Services
          </h2>

          <p className="font-raleway my-6 text-sm tracking-wider capitalize md:my-8 md:text-base">
            suppliers of materials used in handling{" "}
            <span className="text-primary">warehouse</span> products
          </p>

          <Link
            href="/login"
            className="hover:bg-primary mt-4 inline-block w-full rounded-lg bg-black px-10 py-2 text-sm text-white transition hover:text-black md:w-auto"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Image (desktop only) */}
      <div
        className="hidden bg-cover bg-center bg-no-repeat md:block md:w-1/2"
        style={{ backgroundImage: "url('/warehouse.jpg')" }}
      />
    </div>
  );
}
