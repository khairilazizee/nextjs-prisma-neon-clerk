import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { log } from "console";

export const checkUser = async () => {
    const user = await currentUser();
    console.log(user);
    

    // check for current log in clerk user
    if (!user) {
        return null;
    }

    // check if user exists in database
    const loggedInUser = await prisma.user.findUnique({
        where: {
            clerkUserId: user.id
        }
    });

    // check if user exists in database, return user
    if(loggedInUser) {
        return loggedInUser;
    }

    // if user doesn't exist in database, create user
    const newUser = await prisma.user.create({
        data: {
            clerkUserId: user.id,
            email: user.emailAddresses[0].emailAddress,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl
        }
    });

    return newUser;
}