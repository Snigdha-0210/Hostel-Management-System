import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { Home, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const res = await login(email, password);
        setLoading(false);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2.5 group mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/40">
                            <Home className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-2xl text-white tracking-tight">
                            Hostel<span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Manager</span>
                        </span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
                    <p className="text-slate-400">Sign in to your account to continue</p>
                </div>

                {/* Card */}
                <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 shadow-2xl">
                    {error && (
                        <div className="mb-5 flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                        <div>
                            <Input
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 mt-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</>
                            ) : (
                                <>Sign In <ArrowRight className="h-4 w-4" /></>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-white/[0.06] text-center text-sm text-slate-500">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                            Create one free
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
