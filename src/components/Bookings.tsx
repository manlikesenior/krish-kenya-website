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
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-8 sm:mb-12 md:mb-16 text-center tracking-widest">
                    BOOKINGS
                </h2>

                {/* Contact Info Cards */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 sm:gap-12 md:gap-16 mb-12 sm:mb-16">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center mb-4 sm:mb-6">
                            <Phone size={24} className="text-black sm:w-7 sm:h-7" />
                        </div>
                        <h3 className="text-white font-bold text-sm sm:text-base uppercase tracking-widest mb-2 sm:mb-3">PHONE</h3>
                        <p className="text-white text-xs sm:text-sm font-normal">+254 794 633 685</p>
                        <p className="text-white text-xs sm:text-sm font-normal">+254 743 759 797</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center mb-4 sm:mb-6">
                            <Mail size={24} className="text-black sm:w-7 sm:h-7" />
                        </div>
                        <h3 className="text-white font-bold text-sm sm:text-base uppercase tracking-widest mb-2 sm:mb-3">MANAGEMENT</h3>
                        <p className="text-white text-xs sm:text-sm font-normal break-all sm:break-normal">soundafrique@krishkenya.com</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center mb-4 sm:mb-6">
                            <Mail size={24} className="text-black sm:w-7 sm:h-7" />
                        </div>
                        <h3 className="text-white font-bold text-sm sm:text-base uppercase tracking-widest mb-2 sm:mb-3">EMAIL</h3>
                        <p className="text-white text-xs sm:text-sm font-normal break-all sm:break-normal">bookings@krishkenya.com</p>
                    </div>
                </div>

                {/* Google Form */}
                <div className="max-w-3xl mx-auto px-2 sm:px-0">
                    <h3 className="font-display text-xl sm:text-2xl text-white mb-6 sm:mb-8 text-center tracking-widest">
                        GET IN TOUCH
                    </h3>
                    <div className="w-full bg-white rounded-sm overflow-hidden">
                        <iframe 
                            src="https://docs.google.com/forms/d/e/1FAIpQLSeWNnpnYtaVy0mGig0fHrFRYBc0Ik3AHhOKBsoDAVO1Fu2biA/viewform?embedded=true" 
                            width="100%" 
                            height="2090" 
                            frameBorder="0" 
                            marginHeight={0} 
                            marginWidth={0}
                            className="w-full min-w-0"
                            title="Booking Form"
                            style={{ maxWidth: '100%' }}
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

