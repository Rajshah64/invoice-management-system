import { Button } from "@/components/ui/button";
import { signOut } from "../utils/auth";
import { requireUser } from "../utils/hooks";

export default async function DashboardRoute() {
    const session = await requireUser();

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-100 px-4  ">       
            <div className="flex flex-col gap-y-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-gray-600">Welcome to the dashboard!</p>
            </div>
            <div>
                <form 
                    action={async () => {
                    "use server"
                    await signOut()
                }}>
                    <Button className="bg-red-500 text-white px-4 py-2 rounded" type="submit">Sign Out</Button>                    
                </form>
            </div>
        </div>
    );          

}