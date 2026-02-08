"use server"
import { prisma } from "@/lib/db";
import { checkUser } from "@/lib/checkUser";
import { revalidatePath } from "next/cache";

export const deleteTransaction = async (id: string) => {
    const user = await checkUser();

    if (!user) {
        return null;
    }

    // check id transaction exists before deleting
    const transactionId = await prisma.transaction.findUnique({
        where: {
            id,
            userId: user.clerkUserId
        }
    });

    //if transaction not found, return null
    if (!transactionId) {
        return null;
    }

    // if transaction found, delete it

    await prisma.transaction.deleteMany({
        where: {
            id,
            userId: user.clerkUserId
        }
    })

    revalidatePath("/")
}