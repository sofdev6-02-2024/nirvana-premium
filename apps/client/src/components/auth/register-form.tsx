"use client"

import { useForm } from "react-hook-form"
import { useTransition, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { RegisterSchema, RegisterValues } from "@/lib/validation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { register } from "@/actions/register"
import Select from "../ui/select"
import { roles } from "@/lib/types"

export const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSucess] = useState<string | undefined>("")

    const [isPending, startTransition] = useTransition();
    const form = useForm<RegisterValues>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            role: ""

        }
    });


    async function onSubmit(values: RegisterValues) {
        setError("");
        setSucess("");
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (value) {
            formData.append(key, value);
          }
        });
        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error);
                    setSucess(data.success);
                });

        })
    }
    return (
        <CardWrapper
            title="Sign In"
            headerLabel="Create an Account"
            backButtonLabel="Already have an Account?"
            backButtonHref="/auth/login"
            showSocial>
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                        <FormField 
                                control={form.control}
                                name="firstName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                placeholder="Jonh"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} 
                            />
                            <FormField 
                                control={form.control}
                                name="lastName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                placeholder="Doe"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} 
                            />
                            <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>What do you want to  do?</FormLabel>
                                        <FormControl>
                                            <Select {...field} defaultValue="">
                                            <option value="" hidden>
                                                Select an option
                                            </option>
                                            {roles.map((roles) => (
                                                <option key={roles} value={roles}>
                                                {roles}
                                                </option>
                                            ))}
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                            <FormField 
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                placeholder="john.ea@example.com"
                                                type="email"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} 
                            />
                            <FormField 
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                placeholder="*******"
                                                type="password"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} 
                            />
                        </div>
                        <FormError message={error}/>
                        <FormSuccess message={success}/>

                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full"
                        >
                            Register
                        </Button>
                    </form>
                </Form>
        </CardWrapper>
    )
}