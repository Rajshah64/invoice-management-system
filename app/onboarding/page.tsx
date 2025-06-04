"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../components/SubmitButton";
import { useActionState } from "react";
import { onboardUser } from "../actions";
import {useForm} from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod";
import { onboardingSChema } from "../utils/zodSchemas";


export default function Onboarding(){
    //> This is the client component that will be used to onboard the user
    //> It will be used to collect the user's information and send it to the server
    //> It will also be used to validate the user's information and send it to the server
    //> It will also be used to redirect the user to the dashboard after onboarding is complete

    const [lastResult,action ]= useActionState(onboardUser,undefined);
    const [form,fields] = useForm({
        lastResult,

        onValidate({formData}){
            return parseWithZod(formData, {
                schema: onboardingSChema,
            });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    })
    
    return (
        <>
            <div className="min-h-screen w-screen flex items-center justify-center bg-gray-50">
                <Card className="max-w-sm mx-auto w-full max-w-md p-6 shadow-lg ">
                    <CardHeader className="space-y-2 ">
                        <CardTitle className="text-xl font-bold text-center"> YOU ARE ALMOST FINISHED!!!!</CardTitle>
                        <CardDescription className="text-center text-gray-600"> Enter your Information to create an account.</CardDescription>

                    </CardHeader>
                    <CardContent>
                        <form 
                            className="grid gap-4" 
                            action={action} 
                            id={form.id}
                            onSubmit={form.onSubmit}
                            noValidate
                            //> This is important for the form to work with the server action
                            //> and the validation to work with the server action

                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-4">
                                    <Label>First Name</Label>
                                    <Input name={fields.firstName.name} key={fields.firstName.key} defaultValue={fields.firstName.initialValue} placeholder="John"/>
                                    <p className="text-red-500 text-sm">
                                        {fields.firstName.errors ? fields.firstName.errors : null}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-4 ">
                                    <Label>Last Name</Label>
                                    <Input name={fields.lastName.name} key={fields.lastName.key} defaultValue={fields.lastName.initialValue} placeholder="Doe"/>
                                    <p className="text-red-500 text-sm">

                                      {fields.lastName.errors ? fields.lastName.errors : null}  
                                    </p>
                                </div>
                            </div>
                            <div className="grid gap-2 ">
                                <Label>Address</Label>
                                <Input name={fields.address.name} key={fields.address.key} defaultValue={fields.address.initialValue} placeholder="123 Main St"/>
                                <p className="text-red-500 text-sm">
                                  {fields.address.errors ? fields.address.errors : null}  
                                </p>
                            </div>
                            <SubmitButton text="Finish onboarding"/>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}