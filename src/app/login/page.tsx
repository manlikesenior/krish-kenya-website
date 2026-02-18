'use client';

import { useState } from 'react';
import { createClient, getStorageUrl } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push('/dashboard');
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 pt-36 pb-12 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-30">
                <Image
                    src={getStorageUrl('hero-bg.jpg')}
                    alt="Background"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/80"></div>
            </div>

            <div className="max-w-md w-full bg-[#1a1a1a] border border-white/10 p-8 rounded-lg relative z-10 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="font-display text-4xl text-white mb-2 tracking-widest">ADMIN</h1>
                    <p className="text-gray-400 text-sm uppercase tracking-wide">Enter your credentials</p>
                </div>

                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded flex items-start gap-3 text-sm">
                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase text-gray-500 mb-2 tracking-widest">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded pl-10 p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all"
                                placeholder="admin@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-xs uppercase text-gray-500 tracking-widest">Password</label>
                            <a href="/forgot-password" className="text-xs text-[#D4AF37] hover:text-white transition-colors">Forgot Password?</a>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                <Lock size={18} />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded pl-10 p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#D4AF37] text-[#0a0a0a] font-bold py-3 uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} className="animate-spin" /> Authenticating...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
