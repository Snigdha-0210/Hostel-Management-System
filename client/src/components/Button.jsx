import React from 'react';
import { cn } from '../utils/cn';

const Button = ({ children, className, variant = 'primary', size, ...props }) => {
    const base = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

    const variants = {
        primary: "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5 active:translate-y-0 focus:ring-violet-500",
        secondary: "bg-slate-700 text-slate-200 hover:bg-slate-600 focus:ring-slate-500",
        outline: "border border-white/20 text-slate-200 hover:bg-white/10 hover:border-white/30 focus:ring-violet-500",
        ghost: "text-slate-300 hover:text-white hover:bg-white/10 focus:ring-slate-500",
        danger: "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5 focus:ring-red-500",
        success: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 focus:ring-emerald-500",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
    };

    return (
        <button
            className={cn(base, variants[variant] || variants.primary, sizes[size] || sizes.md, className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
