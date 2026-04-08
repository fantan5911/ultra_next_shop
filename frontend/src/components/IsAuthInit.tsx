'use client'

import Cookies from 'js-cookie';
import { useEffect } from 'react';

export function IsAuthInit() {
    useEffect(() => {
        const auth = Cookies.get('auth');
        
        if (auth === null) {
            Cookies.set('auth', 'false');
        }
    }, []);
    
    return null;
}