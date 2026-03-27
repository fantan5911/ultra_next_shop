import { SmartPhoneListClient } from "./SmartPhoneListClient";
import smartphoneService from "@/service/smartphone.service";


export async function SmartPhoneListResponse() {
    const smartphonesData = await smartphoneService.getSmartphones();

    return <SmartPhoneListClient smartphones={smartphonesData} />;
}