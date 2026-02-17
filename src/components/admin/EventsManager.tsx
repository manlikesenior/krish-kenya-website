/**
 * EventsManager Component
 * 
 * Admin dashboard component for managing events.
 * Provides CRUD operations for events stored in Supabase.
 * Features: Add new events, delete existing events, inline form.
 * 
 * @component
 * @param {DBEvent[]} initialEvents - Pre-fetched events from server component
 */

'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, MapPin, ExternalLink } from 'lucide-react';

/** Event database schema */
interface DBEvent {
    id: string;
    title: string;
    date: string;
    venue: string;
    city: string;
    description: string;
    ticket_link: string;
}

export default function EventsManager({ initialEvents }: { initialEvents: DBEvent[] }) {
    const [events, setEvents] = useState<DBEvent[]>(initialEvents);
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        venue: '',
        city: '',
        description: '',
        ticket_link: ''
    });

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await supabase
            .from('events')
            .insert([formData])
            .select()
            .single();

        if (error) {
            alert('Error adding event: ' + error.message);
        } else {
            setEvents([...events, data]);
            setIsAdding(false);
            setFormData({ title: '', date: '', venue: '', city: '', description: '', ticket_link: '' });
            router.refresh();
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return;

        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Error deleting event');
        } else {
            setEvents(events.filter(e => e.id !== id));
            router.refresh();
        }
    };

    return (
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-white/5">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl text-white font-bold">Upcoming Events ({events.length})</h3>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 bg-[#D4AF37] text-black px-4 py-2 font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors"
                >
                    <Plus size={16} /> {isAdding ? 'Cancel' : 'Add Event'}
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleAdd} className="mb-8 bg-black/50 p-6 rounded border border-white/10 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            placeholder="Event Title"
                            required
                            className="bg-[#0a0a0a] border border-white/10 p-3 text-white w-full"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                        <input
                            type="datetime-local"
                            required
                            className="bg-[#0a0a0a] border border-white/10 p-3 text-white w-full"
                            value={formData.date}
                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                        />
                        <input
                            placeholder="Venue"
                            required
                            className="bg-[#0a0a0a] border border-white/10 p-3 text-white w-full"
                            value={formData.venue}
                            onChange={e => setFormData({ ...formData, venue: e.target.value })}
                        />
                        <input
                            placeholder="City"
                            required
                            className="bg-[#0a0a0a] border border-white/10 p-3 text-white w-full"
                            value={formData.city}
                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                        />
                    </div>
                    <textarea
                        placeholder="Description"
                        className="bg-[#0a0a0a] border border-white/10 p-3 text-white w-full h-24"
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                    <input
                        placeholder="Ticket Link (Optional)"
                        className="bg-[#0a0a0a] border border-white/10 p-3 text-white w-full"
                        value={formData.ticket_link}
                        onChange={e => setFormData({ ...formData, ticket_link: e.target.value })}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#333] text-white py-3 font-bold hover:bg-[#D4AF37] hover:text-black transition-colors"
                    >
                        {loading ? 'Saving...' : 'Save Event'}
                    </button>
                </form>
            )}

            <div className="space-y-4">
                {events.map((event) => (
                    <div key={event.id} className="bg-black/40 p-4 border border-white/5 flex justify-between items-start group hover:border-white/20 transition-colors">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h4 className="text-white font-bold text-lg">{event.title}</h4>
                                <span className="text-[#D4AF37] text-xs uppercase border border-[#D4AF37]/30 px-2 py-0.5">
                                    {new Date(event.date).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="text-gray-400 text-sm flex gap-4">
                                <span className="flex items-center gap-1"><MapPin size={12} /> {event.venue}, {event.city}</span>
                                {event.ticket_link && (
                                    <a href={event.ticket_link} target="_blank" className="flex items-center gap-1 hover:text-[#D4AF37]"><ExternalLink size={12} /> Tickets</a>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(event.id)}
                            className="text-gray-600 hover:text-red-500 transition-colors p-2"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
