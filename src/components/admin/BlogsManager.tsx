'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Upload, Eye, EyeOff, Edit2, X } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import the rich text editor to avoid SSR issues
const RichTextEditor = dynamic(() => import('./RichTextEditor'), { 
    ssr: false,
    loading: () => <div className="bg-[#0a0a0a] border border-white/10 p-4 text-gray-500 min-h-[300px]">Loading editor...</div>
});

interface DBBlog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image: string;
    published: boolean;
    created_at: string;
    updated_at: string;
}

export default function BlogsManager({ initialBlogs }: { initialBlogs: DBBlog[] }) {
    const [blogs, setBlogs] = useState<DBBlog[]>(initialBlogs);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        cover_image: '',
        published: false
    });

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `blogs/${fileName}`;

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

    const resetForm = () => {
        setFormData({ title: '', slug: '', excerpt: '', content: '', cover_image: '', published: false });
        setIsAdding(false);
        setEditingId(null);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.cover_image) {
            alert('Please upload a cover image');
            return;
        }
        setLoading(true);

        const slug = formData.slug || generateSlug(formData.title);
        const payload = { ...formData, slug };

        const { data, error } = await supabase
            .from('blogs')
            .insert([payload])
            .select()
            .single();

        if (error) {
            alert('Error adding blog: ' + error.message);
        } else {
            setBlogs([data, ...blogs]);
            resetForm();
            router.refresh();
        }
        setLoading(false);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId) return;
        setLoading(true);

        const slug = formData.slug || generateSlug(formData.title);
        const payload = { ...formData, slug, updated_at: new Date().toISOString() };

        const { data, error } = await supabase
            .from('blogs')
            .update(payload)
            .eq('id', editingId)
            .select()
            .single();

        if (error) {
            alert('Error updating blog: ' + error.message);
        } else {
            setBlogs(blogs.map(b => b.id === editingId ? data : b));
            resetForm();
            router.refresh();
        }
        setLoading(false);
    };

    const handleEdit = (blog: DBBlog) => {
        setFormData({
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt,
            content: blog.content,
            cover_image: blog.cover_image,
            published: blog.published
        });
        setEditingId(blog.id);
        setIsAdding(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;

        const { error } = await supabase
            .from('blogs')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Error deleting blog');
        } else {
            setBlogs(blogs.filter(b => b.id !== id));
            router.refresh();
        }
    };

    const togglePublish = async (blog: DBBlog) => {
        const { error } = await supabase
            .from('blogs')
            .update({ published: !blog.published })
            .eq('id', blog.id);

        if (error) {
            alert('Error updating blog');
        } else {
            setBlogs(blogs.map(b => b.id === blog.id ? { ...b, published: !b.published } : b));
            router.refresh();
        }
    };

    return (
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-white/5">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl text-white font-bold">Blog Posts ({blogs.length})</h3>
                <button
                    onClick={() => { resetForm(); setIsAdding(!isAdding); }}
                    className="flex items-center gap-2 bg-[#D4AF37] text-black px-4 py-2 font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors"
                >
                    {isAdding ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add Blog</>}
                </button>
            </div>

            {isAdding && (
                <form onSubmit={editingId ? handleUpdate : handleAdd} className="mb-8 bg-black/50 p-6 rounded border border-white/10 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            placeholder="Blog Title"
                            required
                            className="bg-[#0a0a0a] border border-white/10 p-3 text-white w-full"
                            value={formData.title}
                            onChange={e => {
                                setFormData({ 
                                    ...formData, 
                                    title: e.target.value,
                                    slug: generateSlug(e.target.value)
                                });
                            }}
                        />
                        <input
                            placeholder="URL Slug (auto-generated)"
                            className="bg-[#0a0a0a] border border-white/10 p-3 text-white w-full"
                            value={formData.slug}
                            onChange={e => setFormData({ ...formData, slug: e.target.value })}
                        />
                    </div>
                    
                    <textarea
                        placeholder="Short excerpt (shown in previews)"
                        required
                        className="bg-[#0a0a0a] border border-white/10 p-3 text-white w-full h-20"
                        value={formData.excerpt}
                        onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                    />
                    
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm">Blog Content</label>
                        <RichTextEditor
                            content={formData.content}
                            onChange={(content) => setFormData({ ...formData, content })}
                            placeholder="Start writing your blog post... Use the toolbar to add images, videos, and audio."
                        />
                    </div>

                    <div className="border border-dashed border-white/20 p-6 text-center hover:border-[#D4AF37] transition-colors">
                        {formData.cover_image ? (
                            <div className="relative h-40 w-full max-w-md mx-auto">
                                <Image src={formData.cover_image} alt="Preview" fill className="object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, cover_image: '' })}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <label className="cursor-pointer block">
                                <Upload className="mx-auto mb-2 text-gray-400" />
                                <span className="text-gray-400 text-sm">
                                    {uploading ? 'Uploading...' : 'Click to Upload Cover Image'}
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

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="published"
                            checked={formData.published}
                            onChange={e => setFormData({ ...formData, published: e.target.checked })}
                            className="w-4 h-4"
                        />
                        <label htmlFor="published" className="text-gray-400">Publish immediately</label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="w-full bg-[#333] text-white py-3 font-bold hover:bg-[#D4AF37] hover:text-black transition-colors"
                    >
                        {loading ? 'Saving...' : editingId ? 'Update Blog' : 'Save Blog'}
                    </button>
                </form>
            )}

            <div className="space-y-4">
                {blogs.map((blog) => (
                    <div key={blog.id} className="bg-black/40 p-4 border border-white/5 flex gap-4 group hover:border-white/20 transition-colors">
                        <div className="relative w-24 h-24 bg-neutral-900 shrink-0">
                            {blog.cover_image && (
                                <Image src={blog.cover_image} alt={blog.title} fill className="object-cover" />
                            )}
                        </div>
                        <div className="flex-grow min-w-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-white font-bold truncate">{blog.title}</h4>
                                        <span className={`text-xs px-2 py-0.5 rounded ${blog.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                            {blog.published ? 'Published' : 'Draft'}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm truncate">{blog.excerpt}</p>
                                    <p className="text-gray-600 text-xs mt-1">/{blog.slug}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => togglePublish(blog)}
                                        className="text-gray-500 hover:text-[#D4AF37] transition-colors p-1"
                                        title={blog.published ? 'Unpublish' : 'Publish'}
                                    >
                                        {blog.published ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                    <button
                                        onClick={() => handleEdit(blog)}
                                        className="text-gray-500 hover:text-white transition-colors p-1"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(blog.id)}
                                        className="text-gray-600 hover:text-red-500 transition-colors p-1"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {blogs.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No blog posts yet. Click &quot;Add Blog&quot; to create one.</p>
                )}
            </div>
        </div>
    );
}
