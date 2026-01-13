'use client';

import { useState } from 'react';
import { Phone, Mail, Send, Check } from 'lucide-react';
import { sendContactMessage } from '@/app/actions';

const Bookings = () => {
    const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('sending');

        const formData = new FormData();
        formData.append('name', formState.name);
        formData.append('email', formState.email);
        formData.append('phone', formState.phone);
        formData.append('message', formState.message);

        const result = await sendContactMessage(formData);

        if (result.success) {
            setFormStatus('sent');
            setFormState({ name: '', email: '', phone: '', message: '' });
            setTimeout(() => setFormStatus('idle'), 3000);
        } else {
            setFormStatus('error');
            setTimeout(() => setFormStatus('idle'), 3000);
        }
    };

    return (
        <div className="py-20 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="font-display text-4xl md:text-5xl text-white mb-16 text-center tracking-widest">
                    BOOKINGS
                </h2>

                {/* Contact Info Cards */}
                <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-16 mb-16">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6">
                            <Phone size={28} className="text-black" />
                        </div>
                        <h3 className="text-white font-bold text-base uppercase tracking-widest mb-3">PHONE</h3>
                        <p className="text-white text-sm font-normal">+254 794 633 685</p>
                        <p className="text-white text-sm font-normal">+254 743 759 797</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6">
                            <Mail size={28} className="text-black" />
                        </div>
                        <h3 className="text-white font-bold text-base uppercase tracking-widest mb-3">MANAGEMENT</h3>
                        <p className="text-white text-sm font-normal">soundafrique@krishkenya.com</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6">
                            <Mail size={28} className="text-black" />
                        </div>
                        <h3 className="text-white font-bold text-base uppercase tracking-widest mb-3">EMAIL</h3>
                        <p className="text-white text-sm font-normal">soundafrique@krishkenya.com</p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="max-w-2xl mx-auto">
                    <h3 className="font-display text-2xl text-white mb-8 text-center tracking-widest">
                        GET IN TOUCH
                    </h3>
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs uppercase text-gray-500 mb-2 tracking-widest">Name</label>
                            <input
                                type="text"
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                required
                                className="w-full bg-neutral-900 border border-white/10 p-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                placeholder="YOUR NAME"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-gray-500 mb-2 tracking-widest">Email</label>
                            <input
                                type="email"
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                required
                                className="w-full bg-neutral-900 border border-white/10 p-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                placeholder="YOUR EMAIL"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-gray-500 mb-2 tracking-widest">Phone</label>
                            <input
                                type="tel"
                                value={formState.phone}
                                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                                className="w-full bg-neutral-900 border border-white/10 p-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                                placeholder="YOUR PHONE NUMBER"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-gray-500 mb-2 tracking-widest">Message</label>
                            <textarea
                                rows={4}
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                required
                                className="w-full bg-neutral-900 border border-white/10 p-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                                placeholder="TELL US ABOUT YOUR EVENT..."
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={formStatus === 'sending' || formStatus === 'sent' || formStatus === 'error'}
                            className={`w-full py-4 font-bold tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${formStatus === 'sent'
                                ? 'bg-green-600 text-white'
                                : formStatus === 'error'
                                    ? 'bg-red-600 text-white'
                                    : 'bg-[#D4AF37] text-black hover:bg-white'
                                }`}
                        >
                            {formStatus === 'sending' && 'SENDING...'}
                            {formStatus === 'sent' && <>MESSAGE SENT <Check size={18} /></>}
                            {formStatus === 'error' && <>FAILED. TRY AGAIN</>}
                            {formStatus === 'idle' && <>SEND MESSAGE <Send size={18} /></>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Bookings;

