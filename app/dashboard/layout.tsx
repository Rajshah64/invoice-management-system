import Link from "next/link";
import { requireUser } from "../utils/hooks"
import Logo from "@/public/Logo.png";
import Image from "next/image";
import { DashboardLinks } from "../components/DashboardLinks";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, User2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "../utils/auth";
import { prisma } from "../utils/prisma";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";


async function getUser(userId: string) {
    // here we are getting the user data from the database and if the user data is not found then we are redirecting to the onboarding page.
    // if the user data is found then we are returning the dashboard layout.
    const data = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            firstName: true,
            lastName: true, 
            address: true,
        },

    }); 

    if(!data?.firstName || !data?.lastName || !data?.address) {
        redirect("/onboarding"); 
    }
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await requireUser(); 
    const data = await getUser(session.user?.id as string);
    // here we are getting the user data and if the user data is not found then we are redirecting to the onboarding page.
    // if the user data is found then we are returning the dashboard layout.
    // if the user data is not found then we are redirecting to the onboarding page.
    return (
        <>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="hidden border-r bg-muted/40 md:block">
                    <div className="flex flex-col max-h-screen h-full gap-2">
                        <div className="h-14 flex items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link href="/" className="flex items-center gap-2">
                                <Image src={Logo} alt="logo" className="size-10 "/>
                                <p className="text-2xl font-bold ">
                                    <span className="text-blue-600">Invoice</span>ly
                                </p>
                            </Link>
                            {/* {children} */}
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                <DashboardLinks/>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
{/* //asChild is used to pass the trigger to the button, so that the button can be styled as a child of the sheet trigger as sheet trigger is a button and button can not be rendered inside a button.  */}
                            <Button variant="outline" size={"icon"} className="md:hidden">
                                <Menu className="size-5"/>    
                            </Button>    
                        </SheetTrigger>
                        <SheetContent side="left" >
                            <nav className="grid gap-2 mt-20 px-2 text-lg font-large ">
                                <DashboardLinks/>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="flex items-center ml-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="rounded-full" variant="outline" size="icon">
                                    <User2/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard" className="w-full">Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/invoices" className="w-full">Invoices</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem asChild>
                                    <form className="w-full" action={async () => {
                                        "use server"
                                        await signOut();
                                    }}>
                                        <button type="submit" className="w-full text-left">Log out</button>
                                    </form>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    </header>
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        <Toaster richColors closeButton/>
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}