import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Users, Mail, Calendar, Shield } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
        redirect('/admin/login');
    }

    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            websites: true // count websites?
        }
    });

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold flex items-center gap-2 text-white">
                <Users className="w-8 h-8 text-blue-500" />
                User Management
            </h1>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-zinc-800 text-zinc-400 uppercase text-xs">
                        <tr>
                            <th className="p-4 border-b border-zinc-700">Name</th>
                            <th className="p-4 border-b border-zinc-700">Email</th>
                            <th className="p-4 border-b border-zinc-700">Role</th>
                            <th className="p-4 border-b border-zinc-700">Joined</th>
                            <th className="p-4 border-b border-zinc-700">Sites</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {users.map((user: any) => (
                            <tr key={user.id} className="hover:bg-zinc-800/50 transition-colors group">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                                            {user.name.charAt(0)}
                                        </div>
                                        <span className="font-medium text-white group-hover:text-blue-400 transition-colors">
                                            {user.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4 text-zinc-400 flex items-center gap-2">
                                    <Mail className="w-3 h-3 text-zinc-600" />
                                    {user.email}
                                </td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${user.role === 'admin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                        'bg-zinc-700/50 text-zinc-400 border-zinc-600'
                                        }`}>
                                        {user.role === 'admin' && <Shield className="w-3 h-3" />}
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4 text-zinc-500 font-mono text-xs">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-4 text-zinc-300 font-mono text-center">
                                    {user.websites.length}
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-zinc-500">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
