import AddTransaction from "@/components/AddTransaction";
import TableTransaction from "@/components/TableTransaction";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <TableTransaction />
    </div>
  );
}
