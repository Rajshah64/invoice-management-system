// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { auth, signIn } from "../utils/auth";
// import { SubmitButton } from "../components/SubmitButton";
// import { redirect } from "next/navigation";

// export default async function Login() {
//     const session = await auth();
//     if (session?.user) {
//         // If the user i s already logged in, redirect to the dashboard
//         return redirect("/dashboard");
//     }
//     // If the user is not logged in, show the login form
//   return (
//     <>
//     <div className="flex h-screen w-full items-center justify-center bg-gray-100 px-4  ">
//         <Card className="w-full max-w-sm">
//             <CardHeader >
//                 <CardTitle className="text-2xl">Login</CardTitle>
//                 <CardDescription>Enter your email below to login in to your account</CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <form className="flex flex-col gap-y-4" 
//                     action={async (formData) => {
//                         "use server"
//                         await signIn("nodemailer",formData)
//                     }} 
//                     method="POST">  
//                     <div className="flex flex-col gap-y-2">
//                         <Label>Email</Label>
//                         <Input name="email" type="email" placeholder="hello@hello.com" className="w-full mt-2 mb-4" required />
//                     </div>
//                     <SubmitButton/>
//                 </form>
//             </CardContent>
//         </Card>
//     </div>
//     </>
//   );
// }



import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { auth, signIn } from "../utils/auth";
import { SubmitButton } from "../components/SubmitButton";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await auth();
    if (session?.user) {
        // If the user is already logged in, redirect to the dashboard
        return redirect("/dashboard");
    }
    // If the user is not logged in, show the login form
    return (
        <>
            <div className="flex h-screen w-full items-center justify-center bg-gray-100 px-4  ">
                <Card className="w-full max-w-sm">
                    <CardHeader >
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>Enter your email below to login in to your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="flex flex-col gap-y-4"
                            action={async (formData) => {
                                "use server"
                                await signIn("nodemailer", formData)
                            }}>
                            <div className="flex flex-col gap-y-2">
                                <Label>Email</Label>
                                <Input name="email" type="email" placeholder="hello@hello.com" className="w-full mt-2 mb-4" required />
                            </div>
                            <SubmitButton text="Submit"/>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
