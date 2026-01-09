import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-full font-bold transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-komorebi-primary text-white shadow-lg hover:bg-opacity-90 hover:shadow-xl",
    secondary: "bg-komorebi-secondary text-white shadow-lg hover:bg-opacity-90",
    outline: "border-2 border-komorebi-primary text-komorebi-primary hover:bg-komorebi-primary hover:text-white",
    ghost: "text-komorebi-text hover:bg-black/5",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};