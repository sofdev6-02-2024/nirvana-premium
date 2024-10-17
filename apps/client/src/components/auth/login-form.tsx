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
import { LoginSchema, LoginValues } from "@/lib/validation"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { login } from "@/actions/login"

export const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSucess] = useState<string | undefined>("")

    const [isPending, startTransition] = useTransition();
    const form = useForm<LoginValues>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });


    async function onSubmit(values: LoginValues) {
        setError("");
        setSucess("");
        startTransition(() => {
            login(values)
                .then((data) => {
                    setError(data.error);
                    setSucess(data.success);
                });

        })
    }
    return (
        <CardWrapper
            title="Login"
            headerLabel="Welcome Back"
            backButtonLabel="Don't have an Account?"
            backButtonHref="/auth/register"
            showSocial>
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
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
                            Login
                        </Button>
                    </form>
                </Form>
        </CardWrapper>
    )
}