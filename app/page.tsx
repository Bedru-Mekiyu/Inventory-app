import Sidebar from "@/components/sidebar";
import Link from "next/link";

export default function HomePage() {
  return (
    <div  className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-purple-50 bg-purple-100">
      <Sidebar currentPath="/" />
      <main className="ml-64 flex flex-col items-center justify-center w-full gap-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to Inventory
        </h1>
        <div className="flex gap-4">
          <Link
            href="/sign-in"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Sign In
          </Link>
          <Link
            href="/learn-more"
            className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition"
          >
            Learn More
          </Link>
        </div>
      </main>
    </div>
  );
}
