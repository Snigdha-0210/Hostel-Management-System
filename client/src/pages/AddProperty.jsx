import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../components/Input';
import Button from '../components/Button';
import { Building2, MapPin, FileText, Tag, ArrowLeft, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const PROPERTY_TYPES = [
    { value: 'HOSTEL', label: 'Hostel', emoji: '🏠', desc: 'Shared accommodation for students' },
    { value: 'PG', label: 'PG', emoji: '🛏️', desc: 'Paying guest accommodation' },
    { value: 'FLAT', label: 'Flat', emoji: '🏢', desc: 'Private flat or apartment' },
];

const AddProperty = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        type: 'HOSTEL',
        rules: '',
        hasMess: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            await axios.post(`${API_URL}/api/properties`, formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || "Failed to add property. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors group">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                Back
            </button>

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                        <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">List Your Property</h1>
                        <p className="text-slate-400 text-sm">Fill in the details to post your property</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Basic Info */}
                <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 space-y-4">
                    <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Basic Information</h2>
                    <Input
                        label="Property Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Sunrise Boys Hostel"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            label="Street Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            placeholder="123 Main Street"
                        />
                        <Input
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Mumbai"
                        />
                    </div>
                </div>

                {/* Property Type */}
                <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
                    <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Property Type</h2>
                    <div className="grid grid-cols-3 gap-3">
                        {PROPERTY_TYPES.map(({ value, label, emoji, desc }) => (
                            <button
                                key={value}
                                type="button"
                                onClick={() => setFormData({ ...formData, type: value })}
                                className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all duration-200 ${
                                    formData.type === value
                                        ? 'border-violet-500/60 bg-violet-500/15 text-violet-300'
                                        : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/8'
                                }`}
                            >
                                <span className="text-2xl">{emoji}</span>
                                <span className="font-semibold text-sm">{label}</span>
                                <span className="text-xs opacity-70 leading-tight">{desc}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Rules */}
                <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
                    <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Rules & Description</h2>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            House Rules <span className="text-slate-500">(Optional)</span>
                        </label>
                        <textarea
                            name="rules"
                            value={formData.rules}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/50 transition-all duration-200 min-h-[120px] resize-none"
                            placeholder="e.g. No smoking, No loud music after 10 PM, Guests allowed on weekends..."
                        />
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-white/[0.08] flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-slate-200">Has Mess Facility?</h3>
                            <p className="text-xs text-slate-400 mt-1">If enabled, a standard weekly mess menu will be displayed to tenants.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, hasMess: !formData.hasMess })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.hasMess ? 'bg-violet-500' : 'bg-slate-600'}`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.hasMess ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2"
                    disabled={loading}
                >
                    {loading ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Publishing...</>
                    ) : (
                        <><CheckCircle2 className="h-4 w-4" /> Publish Property</>
                    )}
                </Button>
            </form>
        </div>
    );
};

export default AddProperty;
