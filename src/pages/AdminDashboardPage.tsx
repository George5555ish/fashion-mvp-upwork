import { useMemo, useState } from 'react';
import {
  FolderOpen,
  Loader2,
  Shirt,
  TrendingUp,
  UserPlus,
  Users,
} from 'lucide-react';
import AdminSubNav from '../components/AdminSubNav';
import Header from '../components/Header';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAdminDashboard } from '../hooks/useAdminDashboard';

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatShortDate(value: string): string {
  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: typeof Users;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {hint && <p className="text-xs text-gray-400 mt-2">{hint}</p>}
        </div>
        <div className="w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

function SignupChart({ signupsByDay }: { signupsByDay: { date: string; count: number }[] }) {
  const maxCount = Math.max(...signupsByDay.map((entry) => entry.count), 1);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Sign-ups (last 30 days)</h2>
          <p className="text-sm text-gray-500 mt-1">Daily new account registrations</p>
        </div>
        <TrendingUp size={20} className="text-brand" />
      </div>
      <div className="flex items-end gap-1 h-40">
        {signupsByDay.map((entry) => (
          <div key={entry.date} className="flex-1 min-w-0 flex flex-col items-center gap-2">
            <div className="w-full flex items-end justify-center h-28">
              <div
                className="w-full max-w-[18px] rounded-t-md bg-brand/80 hover:bg-brand transition-colors"
                style={{ height: `${Math.max((entry.count / maxCount) * 100, entry.count > 0 ? 8 : 2)}%` }}
                title={`${formatShortDate(entry.date)}: ${entry.count} sign-up${entry.count === 1 ? '' : 's'}`}
              />
            </div>
            <span className="text-[10px] text-gray-400 truncate w-full text-center">
              {entry.date.slice(8)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

type DashboardTab = 'users' | 'closet' | 'albums';

function AdminDashboardPageContent() {
  const dashboardQuery = useAdminDashboard();
  const [activeTab, setActiveTab] = useState<DashboardTab>('users');
  const data = dashboardQuery.data;

  const tabs = useMemo(() => ([
    { id: 'users' as const, label: 'Users', count: data?.users.length ?? 0 },
    { id: 'closet' as const, label: 'Closet items', count: data?.closetItems.length ?? 0 },
    { id: 'albums' as const, label: 'Albums', count: data?.albums.length ?? 0 },
  ]), [data]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AdminSubNav />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">User growth, closet activity, and saved albums across OutFind.</p>
        </div>

        {dashboardQuery.isLoading && !data ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin h-10 w-10 text-gray-500" />
          </div>
        ) : data ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard
                label="Total users"
                value={data.summary.totalUsers}
                hint={`${data.summary.newUsersLast7Days} in the last 7 days`}
                icon={Users}
              />
              <StatCard
                label="New sign-ups (30d)"
                value={data.summary.newUsersLast30Days}
                hint={`~${data.summary.signupFrequencyPerDay}/day on active days`}
                icon={UserPlus}
              />
              <StatCard
                label="Closet items"
                value={data.summary.totalClosetItems}
                hint={`Avg ${data.summary.avgClosetItemsPerUser} per user`}
                icon={Shirt}
              />
              <StatCard
                label="Albums"
                value={data.summary.totalAlbums}
                hint={`${data.summary.totalSavedProducts} saved products total`}
                icon={FolderOpen}
              />
            </div>

            <SignupChart signupsByDay={data.signupsByDay} />

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 px-4 sm:px-6 pt-4">
                <div className="flex flex-wrap gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tab.label} ({tab.count})
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                {activeTab === 'users' && (
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 text-left text-gray-500">
                      <tr>
                        <th className="px-6 py-3 font-medium">User</th>
                        <th className="px-6 py-3 font-medium">Role</th>
                        <th className="px-6 py-3 font-medium">Joined</th>
                        <th className="px-6 py-3 font-medium">Closet</th>
                        <th className="px-6 py-3 font-medium">Albums</th>
                        <th className="px-6 py-3 font-medium">Saved</th>
                        <th className="px-6 py-3 font-medium">Outfits</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {data.users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{user.name || 'No name'}</div>
                            <div className="text-gray-500">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 capitalize">{user.role}</td>
                          <td className="px-6 py-4 text-gray-600">{formatDate(user.createdAt)}</td>
                          <td className="px-6 py-4">{user.closetItemCount}</td>
                          <td className="px-6 py-4">{user.albumCount}</td>
                          <td className="px-6 py-4">{user.savedProductCount}</td>
                          <td className="px-6 py-4">{user.outfitCount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeTab === 'closet' && (
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 text-left text-gray-500">
                      <tr>
                        <th className="px-6 py-3 font-medium">Item</th>
                        <th className="px-6 py-3 font-medium">User</th>
                        <th className="px-6 py-3 font-medium">Category</th>
                        <th className="px-6 py-3 font-medium">Added</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {data.closetItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{item.name}</div>
                            <div className="text-gray-500 capitalize">{item.color || 'No color'}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-gray-900">{item.user?.name || 'Unknown'}</div>
                            <div className="text-gray-500">{item.user?.email || '—'}</div>
                          </td>
                          <td className="px-6 py-4 capitalize">{item.category}</td>
                          <td className="px-6 py-4 text-gray-600">{formatDate(item.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeTab === 'albums' && (
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 text-left text-gray-500">
                      <tr>
                        <th className="px-6 py-3 font-medium">Album</th>
                        <th className="px-6 py-3 font-medium">User</th>
                        <th className="px-6 py-3 font-medium">Saved items</th>
                        <th className="px-6 py-3 font-medium">Updated</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {data.albums.map((album) => (
                        <tr key={album.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{album.name}</td>
                          <td className="px-6 py-4">
                            <div className="text-gray-900">{album.user?.name || 'Unknown'}</div>
                            <div className="text-gray-500">{album.user?.email || '—'}</div>
                          </td>
                          <td className="px-6 py-4">{album.itemCount}</td>
                          <td className="px-6 py-4 text-gray-600">{formatDate(album.updatedAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {dashboardQuery.error && (
          <p className="text-sm text-red-600 mt-4">Failed to load admin dashboard</p>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute adminOnly>
      <AdminDashboardPageContent />
    </ProtectedRoute>
  );
}
