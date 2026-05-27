import { ISmartphone } from '@/shared/types/smartphone.types';
import {create} from 'zustand';

interface SmartPhoneStore {
    smartPhones: ISmartphone[];
    setSmartphones: (smartPhones: ISmartphone[]) => void;
}

export const useSmartPhoneStore = create<SmartPhoneStore>(set => ({
    smartPhones: [],
    setSmartphones: (smartPhones: ISmartphone[]) => set({smartPhones: smartPhones})
}))