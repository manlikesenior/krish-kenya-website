import LogoutButton from '@/components/admin/LogoutButton';
import Link from 'next/link';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <nav className="border-b border-white/10 bg-[#111] px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <span className="font-display text-2xl text-[#D4AF37]">ADMIN</span>
                    <div className="hidden md:flex gap-6">
                        <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">View Site</Link>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <LogoutButton />
                </div>
            </nav>
            <main className="max-w-7xl mx-auto py-8 px-4">
                {children}
            </main>
        </div>
    );
}
