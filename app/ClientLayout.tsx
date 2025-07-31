'use client'

import React from "react";
import { Provider } from 'react-redux';
import { inter } from '@/app/ui/fonts';
import store from "@/redux/store";

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <Provider store={store}>
            <body className={`${inter.className} antialiased`}>
                <main>{children}</main>
            </body>
        </Provider>
    )
}

export default ClientLayout;