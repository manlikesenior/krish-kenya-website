'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Download, FileText, Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { BIO_TEXT, PRESS_ASSETS } from '@/lib/constants';

import { sendContactMessage } from '@/app/actions';

const Bio = () => {
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
        <div className="pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">

                {/* Main Bio Image */}
                <div className="mb-12 relative group">
                    <Image
                        src="/images/bio/bio-main.jpg"
                        alt="Krish Kenya Studio Portrait"
                        width={1200}
                        height={800}
                        className="w-full h-auto rounded-sm border border-white/10 shadow-2xl mb-8 grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute bottom-4 right-4 text-xs text-white/30 uppercase tracking-widest">
                        Press Shot 2024
                    </div>
                </div>

                {/* Bio Text */}
                <div className="mb-20">
                    <h2 className="font-display text-5xl md:text-6xl text-white mb-8 border-b border-[#D4AF37]/30 pb-4 inline-block">
                        BIOGRAPHY
                    </h2>
                    <div className="prose prose-invert prose-lg text-gray-300 max-w-none">
                        {BIO_TEXT.split('\n\n').map((paragraph, i) => (
                            <p key={i} className="mb-6 leading-relaxed font-light text-xl">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Media Kit Section */}
                <div className="bg-[#1a1a1a]/50 border border-white/5 p-8 md:p-12 rounded-lg mb-20">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                        <div>
                            <h3 className="font-display text-3xl text-white mb-2">MEDIA & PRESS KIT</h3>
                            <p className="text-gray-400 text-sm max-w-md">
                                High-resolution images, logos, and technical riders for promoters, venues, and press features.
                            </p>
                        </div>
                        <button className="flex items-center gap-2 bg-white text-black px-6 py-3 font-bold text-sm tracking-widest hover:bg-[#D4AF37] transition-colors">
                            <Download size={18} /> DOWNLOAD ALL ASSETS
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Tech Rider Card */}
                        <div className="bg-black/40 border border-white/10 p-6 flex items-center justify-between hover:border-[#D4AF37]/50 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-[#D4AF37]/10 text-[#D4AF37] rounded">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold tracking-wide">Technical Rider 2024</h4>
                                    <p className="text-xs text-gray-500">PDF • 1.2 MB</p>
                                </div>
                            </div>
                            <button className="text-gray-400 group-hover:text-[#D4AF37] transition-colors">
                                <Download size={20} />
                            </button>
                        </div>

                        {/* Press Release Card */}
                        <div className="bg-black/40 border border-white/10 p-6 flex items-center justify-between hover:border-[#D4AF37]/50 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-[#D4AF37]/10 text-[#D4AF37] rounded">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold tracking-wide">Press Release (EPK)</h4>
                                    <p className="text-xs text-gray-500">PDF • 800 KB</p>
                                </div>
                            </div>
                            <button className="text-gray-400 group-hover:text-[#D4AF37] transition-colors">
                                <Download size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Image Gallery */}
                    <div className="mt-8">
                        <h4 className="text-white/60 text-sm uppercase tracking-widest mb-4">Promotional Photos</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {PRESS_ASSETS.map((asset) => (
                                <div key={asset.id} className="group relative aspect-[3/4] bg-neutral-900 border border-white/5 overflow-hidden">
                                    <Image
                                        src={asset.thumbnail}
                                        alt={asset.title}
                                        fill
                                        className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                        <span className="text-white text-xs font-bold truncate">{asset.title}</span>
                                        <span className="text-gray-400 text-[10px] mb-2">{asset.type} • {asset.size}</span>
                                        <a
                                            href={asset.thumbnail}
                                            download={`KRISH_KENYA_${asset.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}`}
                                            className="flex items-center justify-center gap-1 w-full py-2 bg-[#D4AF37] text-black text-xs font-bold uppercase hover:bg-white transition-colors cursor-pointer"
                                        >
                                            <Download size={12} /> Download
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div id="contact" className="border-t border-white/10 pt-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        {/* Contact Form */}
                        <div>
                            <h2 className="font-display text-4xl text-white mb-8">GET IN TOUCH</h2>
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

                        {/* Contact Info */}
                        <div className="flex flex-col justify-center space-y-10 md:pl-10">
                            <div>
                                <h2 className="font-display text-4xl text-white mb-8">OUR CONTACTS</h2>
                                <p className="text-gray-400 mb-8">
                                    For bookings, press inquiries, and collaborations, please reach out via email or phone.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-[#D4AF37]/10 rounded-full text-[#D4AF37]">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold tracking-wide uppercase">Email</h4>
                                        <a href="mailto:bookings@krishkenya.com" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                                            bookings@krishkenya.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-[#D4AF37]/10 rounded-full text-[#D4AF37]">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold tracking-wide uppercase">Phone</h4>
                                        <p className="text-gray-400">+254 794 633 685</p>
                                        <p className="text-gray-400">+254 743 759 797</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-[#D4AF37]/10 rounded-full text-[#D4AF37]">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold tracking-wide uppercase">Location</h4>
                                        <p className="text-gray-400">Kilifi, Kenya</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Bio;
