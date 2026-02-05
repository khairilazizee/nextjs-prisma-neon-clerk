import { NextResponse } from "next/server";
import { checkUser } from "@/lib/checkUser";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
    
    const user = await checkUser();

    if (!user) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    const body = await req.json();
    const { text, amount } = body;

    if (!text || typeof amount !== "number") {
        return NextResponse.json({error: "Invalid request"}, {status: 400})
    }

    const newTransaction = await prisma.transaction.create({
        data: {
            text,
            amount,
            userId: user.clerkUserId
        }
    });

    return NextResponse.json(newTransaction, {status: 201});
}