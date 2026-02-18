'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useState, useCallback, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
    Bold, Italic, Underline as UnderlineIcon, Strikethrough,
    List, ListOrdered, Quote, Heading1, Heading2, Heading3,
    AlignLeft, AlignCenter, AlignRight, Link as LinkIcon,
    Image as ImageIcon, Youtube as YoutubeIcon, Music,
    Undo, Redo, X, Upload
} from 'lucide-react';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [showYoutubeModal, setShowYoutubeModal] = useState(false);
    const [showAudioModal, setShowAudioModal] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    const supabase = createClient();

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg my-4',
                },
            }),
            Youtube.configure({
                width: 640,
                height: 360,
                HTMLAttributes: {
                    class: 'w-full aspect-video rounded-lg my-4',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-[#D4AF37] underline hover:text-white',
                },
            }),
            Placeholder.configure({
                placeholder: placeholder || 'Start writing your blog post...',
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Underline,
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none min-h-[300px] focus:outline-none p-4',
            },
        },
        immediatelyRender: false,
    });

    // Update editor content when prop changes
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

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
        setImageUrl(data.publicUrl);
        setUploading(false);
    };

    const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `audio/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, file);

        if (uploadError) {
            alert('Error uploading audio: ' + uploadError.message);
            setUploading(false);
            return;
        }

        const { data } = supabase.storage.from('images').getPublicUrl(filePath);
        setAudioUrl(data.publicUrl);
        setUploading(false);
    };

    const addLink = useCallback(() => {
        if (linkUrl) {
            editor?.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
        }
        setLinkUrl('');
        setShowLinkModal(false);
    }, [editor, linkUrl]);

    const addImage = useCallback(() => {
        if (imageUrl) {
            editor?.chain().focus().setImage({ src: imageUrl }).run();
        }
        setImageUrl('');
        setShowImageModal(false);
    }, [editor, imageUrl]);

    const addYoutube = useCallback(() => {
        if (youtubeUrl) {
            editor?.chain().focus().setYoutubeVideo({ src: youtubeUrl }).run();
        }
        setYoutubeUrl('');
        setShowYoutubeModal(false);
    }, [editor, youtubeUrl]);

    const addAudio = useCallback(() => {
        if (audioUrl) {
            // Insert audio as HTML since TipTap doesn't have native audio support
            editor?.chain().focus().insertContent(`
                <div class="audio-embed my-4 p-4 bg-black/40 rounded-lg">
                    <audio controls class="w-full">
                        <source src="${audioUrl}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            `).run();
        }
        setAudioUrl('');
        setShowAudioModal(false);
    }, [editor, audioUrl]);

    if (!editor) {
        return <div className="bg-[#0a0a0a] border border-white/10 p-4 text-gray-500">Loading editor...</div>;
    }

    const ToolbarButton = ({ 
        onClick, 
        isActive = false, 
        children, 
        title 
    }: { 
        onClick: () => void; 
        isActive?: boolean; 
        children: React.ReactNode; 
        title: string;
    }) => (
        <button
            type="button"
            onClick={onClick}
            title={title}
            className={`p-2 rounded transition-colors ${
                isActive ? 'bg-[#D4AF37] text-black' : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
        >
            {children}
        </button>
    );

    return (
        <div className="border border-white/10 rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="bg-[#1a1a1a] border-b border-white/10 p-2 flex flex-wrap gap-1">
                {/* Undo/Redo */}
                <div className="flex gap-1 border-r border-white/10 pr-2 mr-2">
                    <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
                        <Undo size={18} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
                        <Redo size={18} />
                    </ToolbarButton>
                </div>

                {/* Headings */}
                <div className="flex gap-1 border-r border-white/10 pr-2 mr-2">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        isActive={editor.isActive('heading', { level: 1 })}
                        title="Heading 1"
                    >
                        <Heading1 size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        isActive={editor.isActive('heading', { level: 2 })}
                        title="Heading 2"
                    >
                        <Heading2 size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        isActive={editor.isActive('heading', { level: 3 })}
                        title="Heading 3"
                    >
                        <Heading3 size={18} />
                    </ToolbarButton>
                </div>

                {/* Text Formatting */}
                <div className="flex gap-1 border-r border-white/10 pr-2 mr-2">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        isActive={editor.isActive('bold')}
                        title="Bold"
                    >
                        <Bold size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        isActive={editor.isActive('italic')}
                        title="Italic"
                    >
                        <Italic size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        isActive={editor.isActive('underline')}
                        title="Underline"
                    >
                        <UnderlineIcon size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        isActive={editor.isActive('strike')}
                        title="Strikethrough"
                    >
                        <Strikethrough size={18} />
                    </ToolbarButton>
                </div>

                {/* Alignment */}
                <div className="flex gap-1 border-r border-white/10 pr-2 mr-2">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        isActive={editor.isActive({ textAlign: 'left' })}
                        title="Align Left"
                    >
                        <AlignLeft size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        isActive={editor.isActive({ textAlign: 'center' })}
                        title="Align Center"
                    >
                        <AlignCenter size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        isActive={editor.isActive({ textAlign: 'right' })}
                        title="Align Right"
                    >
                        <AlignRight size={18} />
                    </ToolbarButton>
                </div>

                {/* Lists */}
                <div className="flex gap-1 border-r border-white/10 pr-2 mr-2">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        isActive={editor.isActive('bulletList')}
                        title="Bullet List"
                    >
                        <List size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        isActive={editor.isActive('orderedList')}
                        title="Numbered List"
                    >
                        <ListOrdered size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        isActive={editor.isActive('blockquote')}
                        title="Quote"
                    >
                        <Quote size={18} />
                    </ToolbarButton>
                </div>

                {/* Media */}
                <div className="flex gap-1">
                    <ToolbarButton onClick={() => setShowLinkModal(true)} title="Add Link">
                        <LinkIcon size={18} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => setShowImageModal(true)} title="Add Image">
                        <ImageIcon size={18} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => setShowYoutubeModal(true)} title="Add YouTube Video">
                        <YoutubeIcon size={18} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => setShowAudioModal(true)} title="Add Audio">
                        <Music size={18} />
                    </ToolbarButton>
                </div>
            </div>

            {/* Editor Content */}
            <div className="bg-[#0a0a0a]">
                <EditorContent editor={editor} />
            </div>

            {/* Link Modal */}
            {showLinkModal && (
                <Modal title="Add Link" onClose={() => setShowLinkModal(false)}>
                    <input
                        type="url"
                        placeholder="https://example.com"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-white/10 p-3 text-white mb-4"
                        autoFocus
                    />
                    <div className="flex gap-2 justify-end">
                        <button
                            onClick={() => setShowLinkModal(false)}
                            className="px-4 py-2 text-gray-400 hover:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={addLink}
                            className="px-4 py-2 bg-[#D4AF37] text-black font-bold hover:bg-white"
                        >
                            Add Link
                        </button>
                    </div>
                </Modal>
            )}

            {/* Image Modal */}
            {showImageModal && (
                <Modal title="Add Image" onClose={() => setShowImageModal(false)}>
                    <div className="space-y-4">
                        <div className="border border-dashed border-white/20 p-6 text-center hover:border-[#D4AF37] transition-colors">
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
                        </div>
                        <div className="text-center text-gray-500 text-sm">or</div>
                        <input
                            type="url"
                            placeholder="Paste image URL"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-white/10 p-3 text-white"
                        />
                        {imageUrl && (
                            <div className="relative h-32 bg-black/40 rounded">
                                <img src={imageUrl} alt="Preview" className="h-full mx-auto object-contain" />
                            </div>
                        )}
                    </div>
                    <div className="flex gap-2 justify-end mt-4">
                        <button
                            onClick={() => { setShowImageModal(false); setImageUrl(''); }}
                            className="px-4 py-2 text-gray-400 hover:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={addImage}
                            disabled={!imageUrl || uploading}
                            className="px-4 py-2 bg-[#D4AF37] text-black font-bold hover:bg-white disabled:opacity-50"
                        >
                            Add Image
                        </button>
                    </div>
                </Modal>
            )}

            {/* YouTube Modal */}
            {showYoutubeModal && (
                <Modal title="Add YouTube Video" onClose={() => setShowYoutubeModal(false)}>
                    <input
                        type="url"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-white/10 p-3 text-white mb-4"
                        autoFocus
                    />
                    <p className="text-gray-500 text-sm mb-4">
                        Paste a YouTube video URL (supports youtube.com and youtu.be links)
                    </p>
                    <div className="flex gap-2 justify-end">
                        <button
                            onClick={() => setShowYoutubeModal(false)}
                            className="px-4 py-2 text-gray-400 hover:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={addYoutube}
                            disabled={!youtubeUrl}
                            className="px-4 py-2 bg-[#D4AF37] text-black font-bold hover:bg-white disabled:opacity-50"
                        >
                            Add Video
                        </button>
                    </div>
                </Modal>
            )}

            {/* Audio Modal */}
            {showAudioModal && (
                <Modal title="Add Audio" onClose={() => setShowAudioModal(false)}>
                    <div className="space-y-4">
                        <div className="border border-dashed border-white/20 p-6 text-center hover:border-[#D4AF37] transition-colors">
                            <label className="cursor-pointer block">
                                <Music className="mx-auto mb-2 text-gray-400" />
                                <span className="text-gray-400 text-sm">
                                    {uploading ? 'Uploading...' : 'Click to Upload Audio (MP3, WAV)'}
                                </span>
                                <input
                                    type="file"
                                    accept="audio/*"
                                    className="hidden"
                                    onChange={handleAudioUpload}
                                    disabled={uploading}
                                />
                            </label>
                        </div>
                        <div className="text-center text-gray-500 text-sm">or</div>
                        <input
                            type="url"
                            placeholder="Paste audio URL"
                            value={audioUrl}
                            onChange={(e) => setAudioUrl(e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-white/10 p-3 text-white"
                        />
                        {audioUrl && (
                            <audio controls className="w-full">
                                <source src={audioUrl} type="audio/mpeg" />
                            </audio>
                        )}
                    </div>
                    <div className="flex gap-2 justify-end mt-4">
                        <button
                            onClick={() => { setShowAudioModal(false); setAudioUrl(''); }}
                            className="px-4 py-2 text-gray-400 hover:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={addAudio}
                            disabled={!audioUrl || uploading}
                            className="px-4 py-2 bg-[#D4AF37] text-black font-bold hover:bg-white disabled:opacity-50"
                        >
                            Add Audio
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

// Modal Component
function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a1a] border border-white/10 rounded-lg max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-bold text-lg">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
