import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { Home, ArrowRight, Loader2, AlertCircle, UserRound, Building } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'TENANT',
        phone: '',
        address: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const res = await register(formData);
        setLoading(false);
        if (res.success) {
            navigate('/login');
        } else {
            setError(res.error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl" />
                <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/40">
                            <Home className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-2xl text-white tracking-tight">
                            Hostel<span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Manager</span>
                        </span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
                    <p className="text-slate-400">Join thousands finding their perfect stay</p>
                </div>

                {/* Card */}
                <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 shadow-2xl">
                    {error && (
                        <div className="mb-5 flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                        />
                        <Input
                            label="Email Address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a strong password"
                            required
                        />

                        {/* Role selector */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">I am a</label>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { val: 'TENANT', label: 'Student / Tenant', Icon: UserRound },
                                    { val: 'OWNER', label: 'Hostel Owner', Icon: Building },
                                ].map(({ val, label, Icon }) => (
                                    <button
                                        key={val}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role: val })}
                                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                                            formData.role === val
                                                ? 'border-violet-500/60 bg-violet-500/15 text-violet-300'
                                                : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/8'
                                        }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Input
                            label="Phone Number (Optional)"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 234 567 8900"
                        />

                        <Button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 mt-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <><Loader2 className="h-4 w-4 animate-spin" /> Creating account...</>
                            ) : (
                                <>Create Account <ArrowRight className="h-4 w-4" /></>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-white/[0.06] text-center text-sm text-slate-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
