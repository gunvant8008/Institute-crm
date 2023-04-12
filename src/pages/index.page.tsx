// const inter = Inter({ subsets: ["latin"] })

import Link from "next/link";

export default function Home() {
  return (
    <div className=" mt-10 text-center">
      <Link className="p-4 text-2xl bg-teal-900" href="/list">
        Go to photos list 🔗
      </Link>
    </div>
  );
}
