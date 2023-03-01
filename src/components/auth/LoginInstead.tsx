'use client';
import Link from "next/link";
import useTheme from "../../hooks/useTheme";

export default function LoginInstead () {
  const { theme } = useTheme();
  return (
      <div style={{color:theme.text}} className=" text-center text-white">
        <p>Already have an account?</p>
        <Link href="/auth/login">Login</Link>
      </div>
  )
}
