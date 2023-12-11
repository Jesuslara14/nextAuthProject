"use client"
import { useState } from 'react';
import styles from '../../../styles/pages/auth.module.css'
import { useRouter } from 'next/navigation';
import Link from 'next/link'

export default function Login(){
    const [error, setError] = useState(null);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const passwordConfirm = e.target[3].value;

        if(password != passwordConfirm){
            return setError('Passwords must match');
        }

        try {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            username,
            email,
            password
            }),
        });
        res.status === 201 && router.push("/dashboard/login?success=Account has been created");
        } catch (err) {
        setError(err);
        console.log(err);
        }
    };
    
    return(
        <div className={styles.authFormWrapper}>
            <form className={styles.form} onSubmit={handleSubmit}>
                {error && 'Something went wrong'}
                <input type="text" name='username' id='username' placeholder='Username' className={styles.input}/>
                <input type="email" name='email' id='email' placeholder='Email' className={styles.input}/>
                <input type="password" name='password' id='password' placeholder='Password' className={styles.input}/>
                <input type="password" name='passwordCnfirm' id='passwordConfirm' placeholder='Confirm Password' className={styles.input}/>
                <button type="submit" className={styles.submit}>Signup</button>
            </form>
            <p>Already have an account? <Link href={'/dashboard/login'}>Log In</Link></p>
        </div>
    )
}