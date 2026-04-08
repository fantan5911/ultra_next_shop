import { LoginForm } from "@/components/LoginForm"
import { Metadata } from "next"


export const metadata: Metadata = {
    title: 'Вход',
    description: 'A login account on Mono shop'
}

export default function LoginPage() {
    return <LoginForm />
}