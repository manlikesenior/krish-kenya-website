/**
 * Bookings Component
 * 
 * Contact information section for booking inquiries.
 * Displays phone numbers and email for management/partnerships.
 * Email: soundafrique@krishkenya.com
 * 
 * @component
 */

import { Phone, Mail } from 'lucide-react';

const Bookings = () => {
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
                        <p className="text-white text-sm font-normal">BOOKINGS@krishkenya.com</p>
                    </div>
                </div>

                {/* Google Form */}
                <div className="max-w-3xl mx-auto">
                    <h3 className="font-display text-2xl text-white mb-8 text-center tracking-widest">
                        GET IN TOUCH
                    </h3>
                    <div className="w-full flex justify-center bg-white rounded-sm overflow-hidden">
                        <iframe 
                            src="https://docs.google.com/forms/d/e/1FAIpQLSeWNnpnYtaVy0mGig0fHrFRYBc0Ik3AHhOKBsoDAVO1Fu2biA/viewform?embedded=true" 
                            width="640" 
                            height="2090" 
                            frameBorder="0" 
                            marginHeight={0} 
                            marginWidth={0}
                            className="max-w-full"
                            title="Booking Form"
                        >
                            Loading…
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bookings;

