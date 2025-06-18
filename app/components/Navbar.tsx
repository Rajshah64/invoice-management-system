import Image from "next/image";
import Link from "next/link";
import logo from "@/public/Logo.png";
import { buttonVariants } from "@/components/ui/button";

export function Navbar() {
  return (
    <div className="flex justify-between items-center py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={logo} alt="logo image" className="size-10" />
        <h3 className="text-3xl font-semibold">
          <span className="text-blue-600">Invoice</span>ly
        </h3>
      </Link>
      <Link className={buttonVariants()} href="/login">
        Get Started
      </Link>
    </div>
  );
}
