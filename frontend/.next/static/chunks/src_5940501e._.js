(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_5940501e._.js", {

"[project]/src/constants/api.url.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "API_URL": (()=>API_URL)
});
const API_URL = "http://localhost:4000/api";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/api/axios.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "api": (()=>api)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$api$2e$url$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/api.url.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
;
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    withCredentials: true,
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$api$2e$url$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_URL"]
});
api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});
api.interceptors.response.use((config)=>{
    return config;
}, async (error)=>{
    const originalRequest = error.config;
    if (error.response?.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$api$2e$url$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_URL"]}/refresh`, {
                withCredentials: true
            });
            localStorage.setItem('token', response.data.accessToken);
            return api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН', e);
        }
        throw error;
    }
}) // import axios from "axios";
 // import type { AuthResponse } from "../models/response/AuthResponse";
 // export const API_URL = "http://localhost:5000/api";
 // const $api = axios.create({
 //     withCredentials: true,
 //     baseURL: API_URL
 // })
 // $api.interceptors.request.use(config => {
 //     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
 //     return config
 // })
 // $api.interceptors.response.use(config => {
 //     return config;
 // }, async error => {
 //     const originalRequest = error.config;
 //     if (error.response.status == 401 && error.config && !error.config._isRetry) {
 //         originalRequest._isRetry = true;
 //         try {
 //             const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
 //             localStorage.setItem('token', response.data.accessToken);
 //             return $api.request(originalRequest);
 //         }
 //         catch (e) {
 //             console.log('НЕ АВТОРИЗОВАН');
 //         }
 //     }
 //     throw error;
 // })
 // export default $api;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/store/smartphone.store.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useSmartPhoneStore": (()=>useSmartPhoneStore)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
const useSmartPhoneStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set)=>({
        smartPhones: [],
        setSmartphones: (smartPhones)=>set({
                smartPhones: smartPhones
            })
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/config/pages.config.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "PAGES": (()=>PAGES)
});
const PAGES = {
    HOME: "/",
    SMARTPHONE: (smartphoneId)=>`/smartphone/${smartphoneId}`
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/SmartPhoneCard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "SmartPhoneCard": (()=>SmartPhoneCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$pages$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/pages.config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function SmartPhoneCard({ id, src, brand, name, price, alt }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-[95%] rounded-3xl gap-3 flex flex-col items-center   border border-solid border-white/10 bg-white/5 pb-4 cursor-pointer hover:scale-[102%]   hover:border-white/30 transition-all duration-200 group   ",
        onClick: ()=>router.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$pages$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAGES"].SMARTPHONE(id)),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: src,
                width: 400,
                height: 400,
                alt: alt,
                className: "w-full rounded-t-3xl border-none"
            }, void 0, false, {
                fileName: "[project]/src/components/SmartPhoneCard.tsx",
                lineNumber: 27,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 flex flex-col gap-2 w-[85%]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[12px]   text-white/50 uppercase",
                        children: brand
                    }, void 0, false, {
                        fileName: "[project]/src/components/SmartPhoneCard.tsx",
                        lineNumber: 34,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-bold text-lg",
                        children: name
                    }, void 0, false, {
                        fileName: "[project]/src/components/SmartPhoneCard.tsx",
                        lineNumber: 36,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex w-full justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-sans",
                                children: [
                                    price,
                                    " ₽"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SmartPhoneCard.tsx",
                                lineNumber: 38,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg group-hover:translate-x-2   transition-transform duration-500   ",
                                children: "➔"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SmartPhoneCard.tsx",
                                lineNumber: 39,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SmartPhoneCard.tsx",
                        lineNumber: 37,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SmartPhoneCard.tsx",
                lineNumber: 33,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SmartPhoneCard.tsx",
        lineNumber: 21,
        columnNumber: 9
    }, this);
}
_s(SmartPhoneCard, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = SmartPhoneCard;
var _c;
__turbopack_context__.k.register(_c, "SmartPhoneCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/SmartPhoneList.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "SmartPhoneList": (()=>SmartPhoneList),
    "revalidate": (()=>revalidate)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$smartphone$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/smartphone.store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SmartPhoneCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SmartPhoneCard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const revalidate = 60;
async function SmartPhoneList() {
    _s();
    const smartphonesData = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/smartphones");
    const smartphones = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$smartphone$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSmartPhoneStore"])({
        "SmartPhoneList.useSmartPhoneStore[smartphones]": (state)=>state.smartPhones
    }["SmartPhoneList.useSmartPhoneStore[smartphones]"]);
    const setSmartphones = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$smartphone$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSmartPhoneStore"])({
        "SmartPhoneList.useSmartPhoneStore[setSmartphones]": (state)=>state.setSmartphones
    }["SmartPhoneList.useSmartPhoneStore[setSmartphones]"]);
    setSmartphones(smartphonesData.data);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: smartphones.map((smartphone)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SmartPhoneCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SmartPhoneCard"], {
                id: smartphone.id,
                alt: smartphone.name,
                src: smartphone.imageUrl,
                brand: smartphone.brand,
                name: smartphone.name,
                price: smartphone.price
            }, smartphone.id, false, {
                fileName: "[project]/src/components/SmartPhoneList.tsx",
                lineNumber: 22,
                columnNumber: 17
            }, this))
    }, void 0, false);
}
_s(SmartPhoneList, "yIcU6G954raw9y008JXSIa0xqIY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$smartphone$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSmartPhoneStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$smartphone$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSmartPhoneStore"]
    ];
});
_c = SmartPhoneList;
var _c;
__turbopack_context__.k.register(_c, "SmartPhoneList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_5940501e._.js.map