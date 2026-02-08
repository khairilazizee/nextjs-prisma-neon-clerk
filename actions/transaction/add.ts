"use server";
import { prisma } from "@/lib/db";
import { checkUser } from "@/lib/checkUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { error } from "console";

interface Transaction {
    text: string;
    amount: number;
}

interface TransactionResult {
    data?: Transaction;
    error?: string;
}

export const addTransaction = async (formData: FormData): Promise<TransactionResult> => {
    const user = await checkUser();

    if (!user) {
        return { error: "Unauthorized" };
    }

    const textValue = formData.get("text") as string;
    const amountValue = Number(formData.get("amount"));

    if (!textValue || !amountValue) {
        return { error : "Invalid request" };
    }

    const text: string = textValue.toString();
    const amount: number = parseFloat(amountValue.toString())

    await prisma.transaction.create({
        data: {
            text,
            amount,
            userId: user.clerkUserId
        }
    });

    revalidatePath("/");
    redirect("/");
}
