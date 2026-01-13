'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Upload, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface DBTrack {
    id: string;
    title: string;
    genre: string;
    platform: string;
    link: string;
    cover_image: string;
}

export default function TracksManager({ initialTracks }: { initialTracks: DBTrack[] }) {
    const [tracks, setTracks] = useState<DBTrack[]>(initialTracks);
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        platform: 'Spotify',
        link: '',
        cover_image: ''
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `tracks/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, file);

        if (uploadError) {
            alert('Error uploading image: ' + uploadError.message);
            setUploading(false);
            return;
        }

        const { data } = supabase.storage.from('images').getPublicUrl(filePath);
        setFormData({ ...formData, cover_image: data.publicUrl });
        setUploading(false);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.cover_image) {
            alert('Please upload a cover image');
            return;
        }
        setLoading(true);

        const { data, error } = await supabase
            .from('tracks')
            .insert([formData])
            .select()
            .single();

        if (error) {
            alert('Error adding track: ' + error.message);
        } else {
            setTracks([...tracks, data]);
            setIsAdding(false);
            setFormData({ title: '', genre: '', platform: 'Spotify', link: '', cover_image: '' });
            router.refresh();
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this track?')) return;

        // Attempt to delete image first (optional but good practice)
        // Extract path from URL is tricky, so we might skip or try basics

        const { error } = await supabase
            .from('tracks')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Error deleting track');
        } else {
            setTracks(tracks.filter(t => t.id !== id));
            router.refresh(); // Refresh server data
        }
    };

    return (
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-white/5">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl text-white font-bold">Latest Releases ({tracks.length})</h3>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 bg-[#D4AF37] text-black px-4 py-2 font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors"
                >
                    <Plus size={16} /> {isAdding ? 'Cancel' : 'Add Track'}
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleAdd} className="mb-8 bg-black/50 p-6 rounded border border-white/10 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            placeholder="Track Title"
                            required
                            className="bg-[#0a0a0a] border border-white/10 p-3 text-white w-full"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                        <input
                            placeholder="Genre (e.g. Afro House)"
                            required
                            className="bg-[#0a0a0a] border border-white/10 p-3 text-white w-full"
                            value={formData.genre}
                            onChange={e => setFormData({ ...formData, genre: e.target.value })}
                        />
                        <select
                            className="bg-[#0a0a0a] border border-white/10 p-3 text-white w-full"
                            value={formData.platform}
                            onChange={e => setFormData({ ...formData, platform: e.target.value })}
                        >
                            <option value="Spotify">Spotify</option>
                            <option value="YouTube">YouTube</option>
                            <option value="SoundCloud">SoundCloud</option>
                            <option value="Apple Music">Apple Music</option>
                        </select>
                        <input
                            placeholder="Stream Link"
                            required
                            className="bg-[#0a0a0a] border border-white/10 p-3 text-white w-full"
                            value={formData.link}
                            onChange={e => setFormData({ ...formData, link: e.target.value })}
                        />
                    </div>

                    <div className="border border-dashed border-white/20 p-6 text-center hover:border-[#D4AF37] transition-colors relative">
                        {formData.cover_image ? (
                            <div className="relative h-40 w-40 mx-auto">
                                <Image src={formData.cover_image} alt="Preview" fill className="object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, cover_image: '' })}
                                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
                                >
                                    X
                                </button>
                            </div>
                        ) : (
                            <label className="cursor-pointer block">
                                <Upload className="mx-auto mb-2 text-gray-400" />
                                <span className="text-gray-400 text-sm">
                                    {uploading ? 'Uploading...' : 'Click to Upload Cover Art'}
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                />
                            </label>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="w-full bg-[#333] text-white py-3 font-bold hover:bg-[#D4AF37] hover:text-black transition-colors"
                    >
                        {loading ? 'Saving...' : 'Save Track'}
                    </button>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tracks.map((track) => (
                    <div key={track.id} className="bg-black/40 p-4 border border-white/5 flex gap-4 group hover:border-white/20 transition-colors">
                        <div className="relative w-20 h-20 bg-neutral-900 shrink-0">
                            {track.cover_image && (
                                <Image src={track.cover_image} alt={track.title} fill className="object-cover" />
                            )}
                        </div>
                        <div className="flex-grow min-w-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-white font-bold truncate">{track.title}</h4>
                                    <p className="text-[#D4AF37] text-xs uppercase">{track.genre}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(track.id)}
                                    className="text-gray-600 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                                <span>{track.platform}</span>
                                {track.link && (
                                    <a href={track.link} target="_blank" className="hover:text-white"><ExternalLink size={10} /></a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
