import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Home, Plus, ClipboardList, BookOpen, ChevronDown } from 'lucide-react';
import Button from './Button';

const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            {/* Ambient background gradient */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
            </div>

            {/* Navbar */}
            <nav className="relative z-50 border-b border-white/[0.06] bg-slate-950/80 backdrop-blur-xl sticky top-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-all duration-300">
                                <Home className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-bold text-xl text-white tracking-tight">
                                Hostel<span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Manager</span>
                            </span>
                        </Link>

                        {/* Nav links and user area */}
                        <div className="flex items-center gap-2">
                            {user ? (
                                <>
                                    <div className="hidden sm:flex items-center gap-1">
                                        {user.role === 'TENANT' && (
                                            <Link
                                                to="/my-bookings"
                                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/8 transition-all duration-200"
                                            >
                                                <BookOpen className="h-4 w-4" />
                                                My Bookings
                                            </Link>
                                        )}
                                        {(user.role === 'OWNER' || user.role === 'ADMIN') && (
                                            <>
                                                <Link
                                                    to="/manage-bookings"
                                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/8 transition-all duration-200"
                                                >
                                                    <ClipboardList className="h-4 w-4" />
                                                    Manage Bookings
                                                </Link>
                                                <Link
                                                    to="/add-property"
                                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/8 transition-all duration-200"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    Add Property
                                                </Link>
                                            </>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 pl-3 ml-1 border-l border-white/10">
                                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                                                {user.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="text-sm text-slate-300 font-medium">{user.name}</span>
                                            <span className="text-xs text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded-md">{user.role}</span>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                                            title="Sign out"
                                        >
                                            <LogOut className="h-4 w-4" />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link to="/login">
                                        <Button variant="ghost" size="sm">Login</Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button size="sm">Get Started</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page content */}
            <main className="flex-1 relative z-10">
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/[0.06] py-6 mt-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-600">
                    © {new Date().getFullYear()} HostelManager. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
