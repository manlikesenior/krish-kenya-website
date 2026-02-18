'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Upload, GripVertical, X, ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface GalleryImage {
    id: string;
    title: string;
    description: string;
    image_url: string;
    sort_order: number;
    created_at: string;
}

export default function GalleryManager({ initialImages }: { initialImages: GalleryImage[] }) {
    const [images, setImages] = useState<GalleryImage[]>(initialImages);
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [bulkUploading, setBulkUploading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image_url: ''
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `gallery/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, file);

        if (uploadError) {
            alert('Error uploading image: ' + uploadError.message);
            setUploading(false);
            return;
        }

        const { data } = supabase.storage.from('images').getPublicUrl(filePath);
        setFormData({ ...formData, image_url: data.publicUrl });
        setUploading(false);
    };

    const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setBulkUploading(true);
        const files = Array.from(e.target.files);
        const newImages: GalleryImage[] = [];

        for (const file of files) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${crypto.randomUUID()}.${fileExt}`;
            const filePath = `gallery/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) {
                console.error('Error uploading:', file.name, uploadError.message);
                continue;
            }

            const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath);

            const { data, error } = await supabase
                .from('gallery_images')
                .insert([{
                    title: file.name.replace(/\.[^/.]+$/, ''),
                    description: '',
                    image_url: urlData.publicUrl,
                    sort_order: images.length + newImages.length
                }])
                .select()
                .single();

            if (!error && data) {
                newImages.push(data);
            }
        }

        setImages([...images, ...newImages]);
        setBulkUploading(false);
        router.refresh();
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', image_url: '' });
        setIsAdding(false);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.image_url) {
            alert('Please upload an image');
            return;
        }
        setLoading(true);

        const { data, error } = await supabase
            .from('gallery_images')
            .insert([{ ...formData, sort_order: images.length }])
            .select()
            .single();

        if (error) {
            alert('Error adding image: ' + error.message);
        } else {
            setImages([...images, data]);
            resetForm();
            router.refresh();
        }
        setLoading(false);
    };

    const handleDelete = async (id: string, imageUrl: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        // Extract path from URL and delete from storage
        const path = imageUrl.split('/images/')[1];
        if (path) {
            await supabase.storage.from('images').remove([path]);
        }

        const { error } = await supabase
            .from('gallery_images')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Error deleting image');
        } else {
            setImages(images.filter(img => img.id !== id));
            router.refresh();
        }
    };

    const moveImage = async (index: number, direction: 'up' | 'down') => {
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === images.length - 1)
        ) return;

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        const newImages = [...images];
        [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];

        // Update sort_order in database
        for (let i = 0; i < newImages.length; i++) {
            await supabase
                .from('gallery_images')
                .update({ sort_order: i })
                .eq('id', newImages[i].id);
        }

        setImages(newImages);
        router.refresh();
    };

    return (
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-white/5">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl text-white font-bold">Gallery Images ({images.length})</h3>
                <div className="flex gap-2">
                    <label className="flex items-center gap-2 bg-[#333] text-white px-4 py-2 font-bold text-sm uppercase tracking-widest hover:bg-[#444] transition-colors cursor-pointer">
                        <Upload size={16} />
                        {bulkUploading ? 'Uploading...' : 'Bulk Upload'}
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleBulkUpload}
                            disabled={bulkUploading}
                        />
                    </label>
                    <button
                        onClick={() => { resetForm(); setIsAdding(!isAdding); }}
                        className="flex items-center gap-2 bg-[#D4AF37] text-black px-4 py-2 font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors"
                    >
                        {isAdding ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add</>}
                    </button>
                </div>
            </div>

            {isAdding && (
                <form onSubmit={handleAdd} className="mb-8 bg-black/50 p-6 rounded border border-white/10 space-y-4">
                    <input
                        placeholder="Image Title"
                        required
                        className="bg-[#0a0a0a] border border-white/10 p-3 text-white w-full"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />
                    <textarea
                        placeholder="Description (optional)"
                        className="bg-[#0a0a0a] border border-white/10 p-3 text-white w-full h-20"
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />

                    <div className="border border-dashed border-white/20 p-6 text-center hover:border-[#D4AF37] transition-colors">
                        {formData.image_url ? (
                            <div className="relative h-48 w-full max-w-md mx-auto">
                                <Image src={formData.image_url} alt="Preview" fill className="object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, image_url: '' })}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <label className="cursor-pointer block">
                                <Upload className="mx-auto mb-2 text-gray-400" />
                                <span className="text-gray-400 text-sm">
                                    {uploading ? 'Uploading...' : 'Click to Upload Image'}
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
                        {loading ? 'Saving...' : 'Add to Gallery'}
                    </button>
                </form>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <div key={image.id} className="group relative bg-black/40 border border-white/5 hover:border-white/20 transition-colors overflow-hidden">
                        <div className="relative aspect-square">
                            {image.image_url ? (
                                <Image src={image.image_url} alt={image.title} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                                    <ImageIcon className="text-gray-600" size={32} />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                    onClick={() => moveImage(index, 'up')}
                                    disabled={index === 0}
                                    className="p-2 bg-white/20 text-white hover:bg-white/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    title="Move up"
                                >
                                    <GripVertical size={16} className="rotate-90" />
                                </button>
                                <button
                                    onClick={() => handleDelete(image.id, image.image_url)}
                                    className="p-2 bg-red-500/80 text-white hover:bg-red-500 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="p-2">
                            <p className="text-white text-xs font-medium truncate">{image.title}</p>
                        </div>
                    </div>
                ))}
                {images.length === 0 && (
                    <div className="col-span-full text-gray-500 text-center py-12">
                        <ImageIcon className="mx-auto mb-2" size={48} />
                        <p>No gallery images yet. Upload some images to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
