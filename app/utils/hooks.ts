import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function requireUser(){
    const session = await auth(); // Assuming you have a session object from NextAuth
        if(!session?.user){
            redirect("/login"); 
        }

    return session;
}

