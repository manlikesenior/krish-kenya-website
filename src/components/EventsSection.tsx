/**
 * EventsSection Component
 * 
 * Displays upcoming and past events in separate sections.
 * Upcoming events are highlighted with gold accent color.
 * Events are sorted with upcoming first, past events below.
 * 
 * @component
 * @param {Event[]} events - Array of event objects from Supabase
 */

import { Event } from '@/lib/types';
import { Calendar, MapPin, Ticket } from 'lucide-react';

interface EventsSectionProps {
    events: Event[];
}

const EventCard = ({ event, isUpcoming }: { event: Event; isUpcoming: boolean }) => (
    <div
        className={`flex flex-col md:flex-row items-start md:items-center bg-black/40 border p-6 transition-all duration-300 ${
            isUpcoming 
                ? 'border-[#D4AF37]/30 hover:border-[#D4AF37]' 
                : 'border-white/5 hover:border-white/20'
        }`}
    >
        {/* Date */}
        <div className="flex flex-col items-center justify-center min-w-[80px] md:border-r md:border-white/10 pr-6 mb-4 md:mb-0">
            <span className="text-2xl font-bold text-white">
                {new Date(event.date).getDate()}
            </span>
            <span className={`uppercase text-sm tracking-wider ${isUpcoming ? 'text-[#D4AF37]' : 'text-gray-500'}`}>
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
            {event.description && (
                <p className="text-gray-500 text-sm italic border-l-2 border-[#D4AF37] pl-3">
                    {event.description}
                </p>
            )}
        </div>

        {/* Action */}
        <div className="mt-4 md:mt-0 md:ml-6 min-w-[140px]">
            {isUpcoming && event.ticketLink ? (
                <a
                    href={event.ticketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#D4AF37] text-black hover:bg-white transition-all duration-300 text-sm uppercase tracking-widest font-bold"
                >
                    <Ticket size={16} /> Get Tickets
                </a>
            ) : (
                <span className="block w-full text-center py-3 px-4 border border-white/20 text-gray-500 text-sm uppercase tracking-widest">
                    Past Event
                </span>
            )}
        </div>
    </div>
);

const EventsSection = ({ events }: EventsSectionProps) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Separate upcoming and past events
    const upcomingEvents = events
        .filter(e => new Date(e.date) >= today)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const pastEvents = events
        .filter(e => new Date(e.date) < today)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Most recent first

    return (
        <div className="py-20 bg-[#1a1a1a]/30">
            <div className="max-w-6xl mx-auto px-4">
                
                {/* Upcoming Events Section */}
                {upcomingEvents.length > 0 && (
                    <div className="mb-16">
                        <h2 className="font-display text-4xl text-white mb-12 text-center tracking-widest">
                            <span className="text-[#D4AF37]">UPCOMING</span> EVENTS
                        </h2>
                        <div className="space-y-4">
                            {upcomingEvents.map((event) => (
                                <EventCard key={event.id} event={event} isUpcoming={true} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Past Events Section */}
                <div>
                    <h2 className="font-display text-4xl text-white mb-12 text-center tracking-widest">
                        PAST EVENTS
                    </h2>
                    <div className="space-y-4">
                        {pastEvents.length === 0 ? (
                            <p className="text-center text-gray-500 py-10">No past events.</p>
                        ) : (
                            pastEvents.map((event) => (
                                <EventCard key={event.id} event={event} isUpcoming={false} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventsSection;
