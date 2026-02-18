'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Upload, Download, FileText, FileImage, FileAudio, File, X, Edit2 } from 'lucide-react';

interface DownloadableAsset {
    id: string;
    title: string;
    description: string;
    file_url: string;
    file_type: string;
    file_size: number;
    download_count: number;
    is_public: boolean;
    created_at: string;
}

const FILE_TYPE_ICONS: Record<string, typeof FileText> = {
    'pdf': FileText,
    'doc': FileText,
    'docx': FileText,
    'jpg': FileImage,
    'jpeg': FileImage,
    'png': FileImage,
    'gif': FileImage,
    'mp3': FileAudio,
    'wav': FileAudio,
    'flac': FileAudio,
};

function getFileIcon(fileType: string) {
    const Icon = FILE_TYPE_ICONS[fileType.toLowerCase()] || File;
    return <Icon size={24} />;
}

function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default function DownloadsManager({ initialAssets }: { initialAssets: DownloadableAsset[] }) {
    const [assets, setAssets] = useState<DownloadableAsset[]>(initialAssets);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        file_url: '',
        file_type: '',
        file_size: 0,
        is_public: true
    });

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop() || '';
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `downloads/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, file);

        if (uploadError) {
            alert('Error uploading file: ' + uploadError.message);
            setUploading(false);
            return;
        }

        const { data } = supabase.storage.from('images').getPublicUrl(filePath);
        setFormData({
            ...formData,
            file_url: data.publicUrl,
            file_type: fileExt,
            file_size: file.size,
            title: formData.title || file.name.replace(/\.[^/.]+$/, '')
        });
        setUploading(false);
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', file_url: '', file_type: '', file_size: 0, is_public: true });
        setIsAdding(false);
        setEditingId(null);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.file_url) {
            alert('Please upload a file');
            return;
        }
        setLoading(true);

        const { data, error } = await supabase
            .from('downloads')
            .insert([{ ...formData, download_count: 0 }])
            .select()
            .single();

        if (error) {
            alert('Error adding download: ' + error.message);
        } else {
            setAssets([data, ...assets]);
            resetForm();
            router.refresh();
        }
        setLoading(false);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId) return;
        setLoading(true);

        const { data, error } = await supabase
            .from('downloads')
            .update(formData)
            .eq('id', editingId)
            .select()
            .single();

        if (error) {
            alert('Error updating download: ' + error.message);
        } else {
            setAssets(assets.map(a => a.id === editingId ? data : a));
            resetForm();
            router.refresh();
        }
        setLoading(false);
    };

    const handleEdit = (asset: DownloadableAsset) => {
        setFormData({
            title: asset.title,
            description: asset.description,
            file_url: asset.file_url,
            file_type: asset.file_type,
            file_size: asset.file_size,
            is_public: asset.is_public
        });
        setEditingId(asset.id);
        setIsAdding(true);
    };

    const handleDelete = async (id: string, fileUrl: string) => {
        if (!confirm('Are you sure you want to delete this download?')) return;

        // Extract path from URL and delete from storage
        const path = fileUrl.split('/images/')[1];
        if (path) {
            await supabase.storage.from('images').remove([path]);
        }

        const { error } = await supabase
            .from('downloads')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Error deleting download');
        } else {
            setAssets(assets.filter(a => a.id !== id));
            router.refresh();
        }
    };

    const togglePublic = async (asset: DownloadableAsset) => {
        const { error } = await supabase
            .from('downloads')
            .update({ is_public: !asset.is_public })
            .eq('id', asset.id);

        if (error) {
            alert('Error updating download');
        } else {
            setAssets(assets.map(a => a.id === asset.id ? { ...a, is_public: !a.is_public } : a));
            router.refresh();
        }
    };

    return (
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-white/5">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl text-white font-bold">Downloadable Assets ({assets.length})</h3>
                <button
                    onClick={() => { resetForm(); setIsAdding(!isAdding); }}
                    className="flex items-center gap-2 bg-[#D4AF37] text-black px-4 py-2 font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors"
                >
                    {isAdding ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add Asset</>}
                </button>
            </div>

            {isAdding && (
                <form onSubmit={editingId ? handleUpdate : handleAdd} className="mb-8 bg-black/50 p-6 rounded border border-white/10 space-y-4">
                    <input
                        placeholder="Asset Title (e.g., Press Kit, Tech Rider)"
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
                        {formData.file_url ? (
                            <div className="flex items-center justify-center gap-4">
                                <div className="text-[#D4AF37]">{getFileIcon(formData.file_type)}</div>
                                <div className="text-left">
                                    <p className="text-white">{formData.title || 'Uploaded file'}</p>
                                    <p className="text-gray-500 text-sm">{formData.file_type.toUpperCase()} • {formatFileSize(formData.file_size)}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, file_url: '', file_type: '', file_size: 0 })}
                                    className="bg-red-500 text-white p-1 rounded-full ml-4"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <label className="cursor-pointer block">
                                <Upload className="mx-auto mb-2 text-gray-400" />
                                <span className="text-gray-400 text-sm">
                                    {uploading ? 'Uploading...' : 'Click to Upload File (PDF, Images, Audio, etc.)'}
                                </span>
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                    disabled={uploading}
                                />
                            </label>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="isPublic"
                            checked={formData.is_public}
                            onChange={e => setFormData({ ...formData, is_public: e.target.checked })}
                            className="w-4 h-4"
                        />
                        <label htmlFor="isPublic" className="text-gray-400">Make publicly available</label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="w-full bg-[#333] text-white py-3 font-bold hover:bg-[#D4AF37] hover:text-black transition-colors"
                    >
                        {loading ? 'Saving...' : editingId ? 'Update Asset' : 'Add Asset'}
                    </button>
                </form>
            )}

            <div className="space-y-3">
                {assets.map((asset) => (
                    <div key={asset.id} className="bg-black/40 p-4 border border-white/5 flex items-center gap-4 group hover:border-white/20 transition-colors">
                        <div className="w-12 h-12 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                            {getFileIcon(asset.file_type)}
                        </div>
                        <div className="flex-grow min-w-0">
                            <div className="flex items-center gap-2">
                                <h4 className="text-white font-bold truncate">{asset.title}</h4>
                                <span className={`text-xs px-2 py-0.5 rounded ${asset.is_public ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                    {asset.is_public ? 'Public' : 'Private'}
                                </span>
                            </div>
                            <p className="text-gray-500 text-sm truncate">{asset.description || 'No description'}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-600 mt-1">
                                <span>{asset.file_type.toUpperCase()}</span>
                                <span>{formatFileSize(asset.file_size)}</span>
                                <span>{asset.download_count} downloads</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <a
                                href={asset.file_url}
                                download
                                className="text-gray-500 hover:text-[#D4AF37] transition-colors p-2"
                                title="Download"
                            >
                                <Download size={18} />
                            </a>
                            <button
                                onClick={() => togglePublic(asset)}
                                className="text-gray-500 hover:text-white transition-colors p-2"
                                title={asset.is_public ? 'Make private' : 'Make public'}
                            >
                                {asset.is_public ? '🔓' : '🔒'}
                            </button>
                            <button
                                onClick={() => handleEdit(asset)}
                                className="text-gray-500 hover:text-white transition-colors p-2"
                            >
                                <Edit2 size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(asset.id, asset.file_url)}
                                className="text-gray-600 hover:text-red-500 transition-colors p-2"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
                {assets.length === 0 && (
                    <div className="text-gray-500 text-center py-12">
                        <File className="mx-auto mb-2" size={48} />
                        <p>No downloadable assets yet.</p>
                        <p className="text-sm">Add press kits, tech riders, promotional materials, etc.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
