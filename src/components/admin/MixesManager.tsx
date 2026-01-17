'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, ExternalLink } from 'lucide-react';

interface DBMix {
    id: string;
    title: string;
    platform: string;
    link: string;
}

export default function MixesManager({ initialMixes }: { initialMixes: any[] }) {
    const [mixes, setMixes] = useState<DBMix[]>(initialMixes);
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        platform: 'SoundCloud',
        link: '',
    });

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await supabase
            .from('mixes')
            .insert([formData])
            .select()
            .single();

        if (error) {
            alert('Error adding mix: ' + error.message);
        } else {
            setMixes([...mixes, data]);
            setIsAdding(false);
            setFormData({ title: '', platform: 'SoundCloud', link: '' });
            router.refresh();
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this mix?')) return;

        const { error } = await supabase
            .from('mixes')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Error deleting mix');
        } else {
            setMixes(mixes.filter(m => m.id !== id));
            router.refresh();
        }
    };

    return (
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-white/5">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl text-white font-bold">DJ Mixes ({mixes.length})</h3>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 bg-[#D4AF37] text-black px-4 py-2 font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors"
                >
                    <Plus size={16} /> {isAdding ? 'Cancel' : 'Add Mix'}
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleAdd} className="mb-8 bg-black/50 p-6 rounded border border-white/10 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            placeholder="Mix Title"
                            required
                            className="bg-[#0a0a0a] border border-white/10 p-3 text-white w-full"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                        <select
                            className="bg-[#0a0a0a] border border-white/10 p-3 text-white w-full"
                            value={formData.platform}
                            onChange={e => setFormData({ ...formData, platform: e.target.value })}
                        >
                            <option value="SoundCloud">SoundCloud</option>
                            <option value="YouTube">YouTube</option>
                            <option value="Mixcloud">Mixcloud</option>
                        </select>
                    </div>
                     <input
                        placeholder="Stream Link"
                        required
                        className="bg-[#0a0a0a] border border-white/10 p-3 text-white w-full"
                        value={formData.link}
                        onChange={e => setFormData({ ...formData, link: e.target.value })}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#333] text-white py-3 font-bold hover:bg-[#D4AF37] hover:text-black transition-colors"
                    >
                        {loading ? 'Saving...' : 'Save Mix'}
                    </button>
                </form>
            )}

            <div className="space-y-4">
                {mixes.map((mix) => (
                    <div key={mix.id} className="bg-black/40 p-4 border border-white/5 flex justify-between items-center group hover:border-white/20 transition-colors">
                        <div>
                            <h4 className="text-white font-bold">{mix.title}</h4>
                            <div className="text-gray-400 text-sm flex items-center gap-2">
                                <span>{mix.platform}</span>
                                {mix.link && (
                                    <a href={mix.link} target="_blank" className="hover:text-white"><ExternalLink size={12} /></a>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(mix.id)}
                            className="text-gray-600 hover:text-red-500 transition-colors"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
