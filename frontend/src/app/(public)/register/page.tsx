import { Metadata } from "next";
import { RegisterForm } from "../../../components/RegisterForm";


export const metadata: Metadata = {
    title: 'Регистрация',
    description: 'A register account on Mono shop'
}


export default function RegisterPage() {
    return <RegisterForm />
}