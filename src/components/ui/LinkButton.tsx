'use client';
import Link from 'next/link';

export interface ILinkButtonProps {
  label: string;
  href: string;
  className?: string;
}

const LinkButton = ({ label, href, className='' }: ILinkButtonProps) => ( 
  <Link className={className} href={href}> {label} </Link>
)

export default LinkButton;

