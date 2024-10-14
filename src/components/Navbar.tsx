import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="shadow-sm">
      <nav className="max-w-5xl m-auto px-3 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="tp chamba logo" width={40} height={40} />
          <span className="text-xl font-bold tracking-tight text-orange-500">
            /tp Chamba
          </span>
        </Link>

        <div className="flex gap-2">
          <Button asChild>
            <Link href="/jobs">Job List</Link>
          </Button>

          <Button asChild>
            <Link href="/jobs/new"> Post a Job</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
