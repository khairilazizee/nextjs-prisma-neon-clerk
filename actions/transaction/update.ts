"use server";
import { prisma } from "@/lib/db";
import { checkUser } from "@/lib/checkUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface Transaction {
  id: string;
  text: string;
  amount: number;
}

interface TransactionResult {
  data?: Transaction;
  error?: string;
}


export const updateTransaction = async (formData: FormData) : Promise<TransactionResult> => {
  const user = await checkUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const id = formData.get("id") as string;
  const text = formData.get("text") as string;
  const amount = Number(formData.get("amount"));

  if (!id || !text || !amount) {
    return { error: "Invalid request" };
  }

  // check id transaction exists before deleting
  const transactionId = await prisma.transaction.findFirst({
    where: {
      id,
      userId: user.clerkUserId,
    },
  });

  //if transaction not found, return null
  if (!transactionId) {
    return { error: "Not found" };
  }

  // if transaction found, delete it

  await prisma.transaction.update({
    where: {
      id,
      userId: user.clerkUserId,
    },
    data: { text, amount },
  });

  revalidatePath("/");
  redirect("/");
};
