"use client"
import React, { useEffect, useState } from "react";
import styles from '../../../styles/pages/auth.module.css'
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from 'next/link'

export default function Login(){
    const session = useSession();
    const router = useRouter();
    const params = useSearchParams();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        setError(params.get("error"));
        setSuccess(params.get("success"));
    }, [params]);

    if (session.status === "loading") {
        return <p>Loading...</p>;
    }

    if (session.status === "authenticated") {
        router?.push("/dashboard");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        signIn("credentials", {
            email,
            password,
        });
    };

    return(
        <div className={styles.authFormWrapper}>
            <form method="POST" className={styles.form} onSubmit={handleSubmit}>
                {error && "Something went wrong!"}
                <input type="email" name='email' id='email' placeholder='Email' className={styles.input}/>
                <input type="password" name='password' id='password' placeholder='Password' className={styles.input}/>
                <button type="submit" className={styles.submit}>Login</button>
            </form>
            <p>Don't yet have an account? <Link href={'/dashboard/signup'}>Sign Up</Link></p>
        </div>
    );
}