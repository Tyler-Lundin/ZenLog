'use client';


export interface IButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const Button = ({ label, onClick, className }: IButtonProps) => ( 
  <button 
    onClick={onClick} 
    className={className}
  >
    {label}
  </button>
)

export default Button;
