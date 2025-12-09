import { Event } from '@/lib/types';
import { Calendar, MapPin } from 'lucide-react';

interface EventsSectionProps {
    events: Event[];
}

const EventsSection = ({ events }: EventsSectionProps) => {
    const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <div className="py-20 bg-[#1a1a1a]/30">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="font-display text-4xl text-white mb-12 text-center tracking-widest">
                    SHOW DATES
                </h2>

                <div className="space-y-4">
                    {sortedEvents.length === 0 ? (
                        <p className="text-center text-gray-500 py-10">No upcoming events listed. Check back soon.</p>
                    ) : (
                        sortedEvents.map((event) => (
                            <div
                                key={event.id}
                                className="flex flex-col md:flex-row items-start md:items-center bg-black/40 border border-white/5 p-6 hover:border-[#D4AF37]/30 transition-all duration-300"
                            >
                                {/* Date */}
                                <div className="flex flex-col items-center justify-center min-w-[80px] md:border-r md:border-white/10 pr-6 mb-4 md:mb-0">
                                    <span className="text-2xl font-bold text-white">
                                        {new Date(event.date).getDate()}
                                    </span>
                                    <span className="text-[#D4AF37] uppercase text-sm tracking-wider">
                                        {new Date(event.date).toLocaleString('default', { month: 'short' })}
                                    </span>
                                </div>

                                {/* Details */}
                                <div className="flex-grow pl-0 md:pl-6">
                                    <h3 className="text-xl text-white font-semibold mb-1">{event.title}</h3>
                                    <div className="flex flex-wrap gap-4 text-gray-400 text-sm mb-3">
                                        <span className="flex items-center gap-1"><MapPin size={14} /> {event.venue}, {event.city}</span>
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(event.date).getFullYear()}</span>
                                    </div>
                                    <p className="text-gray-500 text-sm italic border-l-2 border-[#D4AF37] pl-3">
                                        {event.description}
                                    </p>
                                </div>

                                {/* Action */}
                                <div className="mt-4 md:mt-0 md:ml-6 min-w-[140px]">
                                    <a
                                        href={event.ticketLink}
                                        className="block w-full text-center py-3 px-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-sm uppercase tracking-widest"
                                    >
                                        Get Tickets
                                    </a>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventsSection;
