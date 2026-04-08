'use client'
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthorizationInput } from "./UI/AuthorizationInput";
import { FormError } from "./UI/FormError";
import { useState } from "react";
import authService from "@/service/auth.service";
import { useRouter } from "next/navigation";
import { PAGES } from "@/config/pages.config";
import { AuthorizationButton } from "./UI/AuthorizationButton";
import { useAuthStore } from "@/store/auth.store";
import { Auth } from "./UI/Auth";

interface LoginFormData {
    email: string;
    password: string;
    authError: string;
}

export function LoginForm() {
    const setIsAuth = useAuthStore(state => state.setIsAuth);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const router = useRouter();

    const formMethods = useForm<LoginFormData>({
        mode: 'onSubmit'
    });

    const onSubmit: SubmitHandler<LoginFormData> = async data => {
        const response = await authService.Login(data.email, data.password);
        if (response?.status === 200) {
            setIsAuth(true);
            router.push(PAGES.HOME);
        }
        else if (response?.status === 400) {
            formMethods.setError('authError', {message: response.data?.message});
        }
    }

    const EmailError = formMethods.formState.errors.email;
    const PasswordError = formMethods.formState.errors.password;
    const authError = formMethods.formState.errors.authError;

    return (
        <div className="flex items-center justify-center w-full min-h-[75vh]">
            <form onSubmit={formMethods.handleSubmit(onSubmit)} className="flex w-[28%] min-h-[120%] flex-col items-center gap-2 px-9 py-20">
                <h1 className="text-5xl font-black uppercase mb-10 tracking-tighter text-center">Вход</h1>
                <AuthorizationInput
                registerName="email"
                formMethods={formMethods}
                type="email"
                placeholder="Введите email"
                required="Обязательное поле"
                minLength={5}
                minLenghtMessage="Почта должна быть не менее 5 символов"
                maxLength={40}
                maxLengthMessage="Почта должна быть не более 40 символов"
                value={email}
                onChange={e => {
                    setEmail(e.target.value);
                    formMethods.clearErrors('authError');
                }}
                />                
                {EmailError && <FormError error={EmailError} />}

                <AuthorizationInput
                registerName="password"
                formMethods={formMethods}
                type="password"
                placeholder="Введите пароль"
                required="Обязательное поле"
                minLength={8}
                minLenghtMessage="Пароль должен быть не менее 8 символов"
                maxLength={45}
                maxLengthMessage="Пароль должен быть не более 45 символов"
                value={password}
                onChange={e => {
                    setPassword(e.target.value);
                    formMethods.clearErrors('authError');
                }}
                />
                {PasswordError && <FormError error={PasswordError} />}
                {authError && <FormError error={authError} />}
                
                <AuthorizationButton>
                    Войти
                </AuthorizationButton>
                <Auth text="Еще нет аккаунта?" link={PAGES.REGISTER} />
            </form>
        </div>
    )
}