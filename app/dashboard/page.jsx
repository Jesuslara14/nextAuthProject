"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/pages/dashboard.module.css";
//import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Dashboard(){
    const router = useRouter();
    const session = useSession();

    if(session.status === "unauthenticated"){
        router.push('/dashboard/login');
    }

    if(session.status === "authenticated"){
        return(
            <div className={styles.dashboardWrapper}>
                <h1>Welcome</h1>
                <div className={styles.postStream}>

                </div>
                <div className={styles.postFormWrapper}>
                    <form>
                        <input type="text" />
                    </form>
                </div>
            </div>
        )
    }
}