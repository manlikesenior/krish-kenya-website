'use client';

import { useState } from 'react';
import { subscribeToNewsletter } from '@/app/actions';
import { Loader2, Check, ArrowRight } from 'lucide-react';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setStatus('loading');
            const formData = new FormData();
            formData.append('email', email);

            const result = await subscribeToNewsletter(formData);

            if (result.success) {
                setStatus('success');
                setEmail('');
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 3000);
            }
        }
    };

    return (
        <div className="py-24 bg-[#D4AF37] text-[#0a0a0a]">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="font-display text-4xl md:text-5xl mb-6">JOIN THE MOVEMENT</h2>
                <p className="font-sans text-lg mb-10 max-w-2xl mx-auto leading-relaxed opacity-80">
                    Be the first to know about exclusive mixes, tour dates, and merchandise drops.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center max-w-lg mx-auto">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ENTER YOUR EMAIL"
                        className="flex-grow px-6 py-4 bg-[#0a0a0a]/10 border-2 border-[#0a0a0a]/20 focus:border-[#0a0a0a] focus:outline-none placeholder-[#0a0a0a]/50 text-[#0a0a0a] font-sans"
                        required
                        disabled={status === 'loading' || status === 'success'}
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className="px-8 py-4 bg-[#0a0a0a] text-[#D4AF37] font-bold tracking-widest hover:bg-[#0a0a0a]/90 transition-colors flex items-center justify-center gap-2 min-w-[160px]"
                    >
                        {status === 'loading' && <Loader2 size={18} className="animate-spin" />}
                        {status === 'success' && <>SUBSCRIBED <Check size={18} /></>}
                        {status === 'error' && <>FAILED. RETRY?</>}
                        {status === 'idle' && <>SIGN UP <ArrowRight size={18} /></>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;
