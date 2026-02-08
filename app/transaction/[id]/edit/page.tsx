import { EditTransaction } from "@/components/EditTransaction";
import { prisma } from "@/lib/db";
import { checkUser } from "@/lib/checkUser";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const user = await checkUser();
  const { id } = await params;
  if (!user) {
    return <div>Please login</div>;
  }

  const checkTransaction = await prisma.transaction.findFirst({
    where: {
      id,
      userId: user.clerkUserId,
    },
  });

  // if checkTransaction not found, return null
  if (!checkTransaction) {
    return <div>Not found</div>;
  }

  // if checkTransaction found, pass to EditTransaction

  return (
    <div className="flex  items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <EditTransaction transactions={checkTransaction} />
    </div>
  );
};

export default page;
