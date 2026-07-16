import React from 'react';
import { cn } from '../utils/cn';

const Input = ({ label, className, error, ...props }) => {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-sm font-medium text-slate-300">{label}</label>
            )}
            <input
                className={cn(
                    "w-full bg-white/5 border text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-200",
                    error
                        ? "border-red-500/50 focus:ring-red-500/30 focus:border-red-500/50"
                        : "border-white/10 focus:ring-violet-500/30 focus:border-violet-500/50",
                    className
                )}
                {...props}
            />
            {error && <span className="text-xs text-red-400 mt-0.5">{error}</span>}
        </div>
    );
};

export default Input;
