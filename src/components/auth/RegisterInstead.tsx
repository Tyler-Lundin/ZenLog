'use client';
import Link from "next/link";
import useTheme from "../../hooks/useTheme";

export default function RegisterInstead () {
  const { theme } = useTheme();
  return (
      <div style={{color:theme.text}} className=" text-center text-white">
        <p>Don&apos;t have an account?</p>
        <Link href="/auth/register">Register</Link>
      </div>
  )
}
