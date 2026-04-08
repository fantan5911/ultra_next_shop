import { RegisterForm } from "@/components/RegisterForm";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Регистрация',
    description: 'A register account on Mono shop'
}


export default function RegisterPage() {
    return <RegisterForm />
}