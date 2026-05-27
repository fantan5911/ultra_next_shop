'use client';

import Link from "next/link";
import { ChangeEvent } from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
    value: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    formMethods: UseFormReturn<any>;
    registerName: string;
}

export function TermsAccept({formMethods, registerName}: Props) {
    return (
        <div className="w-full text-white/50 items-center justify-center flex mt-2 mb-2">
            <div>
                <input
                {...formMethods.register(registerName, {
                    required: "Вы должны принять условия использования"
                })}
                type="checkbox"
                className="w-4 h-4 cursor-pointer accent-white/70" 
                />&nbsp;

                Я принимаю&nbsp;
                <Link href="/terms" className="text-white/70
                hover:text-white">
                    пользовательское соглашение&nbsp;
                </Link>
                <span>
                и&nbsp;
                </span>
                <Link href="/privacy" className="text-white/70
                hover:text-white">
                    политику конфиденциальности
                </Link>
            </div>
        </div>
    );
}