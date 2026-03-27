import smartphoneService from "@/service/smartphone.service";
import { ISmartphone } from "@/shared/types/smartphone.types";

type Params = {id: string}

export default async function SmartphonePage({params}: {params: Promise<Params>}) {
    const {id} = await params;
    console.log(id);

    const smartphoneData: ISmartphone = await smartphoneService.getSmartPhoneById(id);
    console.log(smartphoneData);

    return (
        <div>
            <p>{smartphoneData.brand}</p>
        </div>
    )
}

// import type { Metadata } from "next";

// type Params = {username: string};

// export async function generateMetadata({params}: {params: Promise<Params>}): Promise<Metadata> {
//     return {
//         title: '@' + (await params).username
//     }
// }

// export default async function TestPage({params}: {params: Promise<Params>}) {
//     const {username} = await params;

//     return (
//         <div>
//             <h1 className="mt-2 text-2xl font-semibold mb-4 self-center">
//                 Profile @{username}
//             </h1>
//         </div>
//     )
// }