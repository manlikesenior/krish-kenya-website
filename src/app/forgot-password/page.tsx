'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Mail, Loader2, ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const supabase = createClient();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');
        setMessage('');

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/callback?next=/dashboard/reset-password`,
        });

        if (error) {
            setStatus('error');
            setMessage(error.message);
        } else {
            setStatus('success');
            setMessage('Check your email for the password reset link.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 pt-36 pb-12 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-30">
                <Image
                    src="/images/hero-bg.jpg"
                    alt="Background"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/80"></div>
            </div>

            <div className="max-w-md w-full bg-[#1a1a1a] border border-white/10 p-8 rounded-lg relative z-10 shadow-2xl">
                <Link href="/login" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm mb-6 transition-colors">
                    <ArrowLeft size={16} /> Back to Login
                </Link>

                <div className="text-center mb-8">
                    <h1 className="font-display text-3xl text-white mb-2 tracking-widest">RESET PASSWORD</h1>
                    <p className="text-gray-400 text-sm uppercase tracking-wide">Enter your email to receive a reset link</p>
                </div>

                {status === 'error' && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded text-sm text-center">
                        {message}
                    </div>
                )}

                {status === 'success' ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                            <Check size={32} />
                        </div>
                        <h3 className="text-white font-bold text-xl mb-2">Check Your Email</h3>
                        <p className="text-gray-400 mb-6">{message}</p>
                        <Link href="/login" className="block w-full bg-[#D4AF37] text-black font-bold py-3 uppercase tracking-widest hover:bg-white transition-colors text-center">
                            Return to Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleReset} className="space-y-6">
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

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#D4AF37] text-[#0a0a0a] font-bold py-3 uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" /> Sending Link...
                                </>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
