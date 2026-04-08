'use client'

import { AuthorizationButton } from "@/components/UI/AuthorizationButton";
import { AuthorizationInput } from "@/components/UI/AuthorizationInput";
import { FormError } from "@/components/UI/FormError";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import authService from "@/service/auth.service";
import { useRouter } from "next/navigation";
import { PAGES } from "@/config/pages.config";
import { useAuthStore } from "@/store/auth.store";
import { Auth } from "./UI/Auth";
import { TermsAccept } from "./TermsAccept";

export interface RegisterFormData {
    email: string;
    username: string;
    password: string;
    acceptedTerms: boolean;
    authError: string;
}

export function RegisterForm() {
    const setIsAuth = useAuthStore(state => state.setIsAuth);

    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

    const router = useRouter();

    const formMethods = useForm<RegisterFormData>({
        mode: 'onSubmit'
    });

    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
        formMethods.clearErrors();
        const response = await authService.Register
        (data.email, data.username, data.password, data.acceptedTerms);

        if (response?.status === 200) {
            setIsAuth(true);
            router.push(PAGES.HOME);
        }
        else if (response?.status === 400) {
            if (response?.data?.message === "Вы должны принять условия использования") {
                formMethods.setError("acceptedTerms", {message: "Вы должны принять условия использования"});
            }
            else {
                formMethods.setError("authError", {message: response.data?.message});
            }
        }
    }

    const EmailError = formMethods.formState.errors.email;
    const UsernameError = formMethods.formState.errors.username;
    const PasswordError = formMethods.formState.errors.password;
    const AcceptedTermsError = formMethods.formState.errors.acceptedTerms;
    const authError = formMethods.formState.errors.authError;

    return (
        <div className="flex items-center justify-center w-full min-h-[75vh]">
            <form onSubmit={formMethods.handleSubmit(onSubmit)}
             className="flex w-[28%] min-h-[120%] flex-col items-center gap-2 px-9 py-20">
                <h1 className="text-5xl font-black uppercase mb-10 tracking-tighter text-center">Регистрация</h1>
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
                registerName="username"
                formMethods={formMethods}
                type="text"
                placeholder="Введите никнейм"
                required="Обязательное поле"
                minLength={3}
                minLenghtMessage="Никнейм должен быть не менее 3 символов"
                maxLength={20}
                maxLengthMessage="Никнейм должен быть не более 20 символов"
                value={username}
                onChange={e => {
                    setUsername(e.target.value);
                    formMethods.clearErrors('authError');
                }}
                />

                {UsernameError && <FormError error={UsernameError} />}

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
                {AcceptedTermsError && <FormError error={AcceptedTermsError} />}
                <TermsAccept
                value={acceptedTerms}
                onChange={e => setAcceptedTerms(e.target.checked)}
                formMethods={formMethods}
                registerName="acceptedTerms"
                />
                
                <AuthorizationButton>
                    Создать аккаунт
                </AuthorizationButton>
                <Auth text="Уже есть аккаунт?" link={PAGES.LOGIN} />

            </form>
        </div>
    )
}