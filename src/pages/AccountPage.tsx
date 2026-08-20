import { Link } from 'react-router-dom';
import { Calendar, FolderOpen, LogOut, Mail, Shirt, User } from 'lucide-react';
import Header from '../components/Header';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';

function formatMemberSince(createdAt?: string): string {
  if (!createdAt) {
    return 'Recently joined';
  }

  return new Date(createdAt).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function AccountPageContent() {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">Manage your OutFind profile and quick links.</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0">
                <User size={28} />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl font-semibold text-gray-900 truncate">
                  {user.name || 'OutFind member'}
                </h2>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                  <Mail size={14} />
                  <span className="truncate">{user.email}</span>
                </p>
                {user.role === 'admin' && (
                  <span className="inline-block mt-2 text-xs font-medium uppercase tracking-wide text-brand bg-brand/10 px-2 py-1 rounded-full">
                    Admin
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4 border-b border-gray-100">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Calendar size={16} className="text-gray-400 shrink-0" />
              <span>Member since {formatMemberSince(user.createdAt)}</span>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 border-b border-gray-100">
            <Link
              to="/closet"
              className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 hover:border-gray-900 hover:bg-gray-50 transition-colors"
            >
              <Shirt size={18} className="text-brand" />
              <span className="font-medium text-gray-900">My Closet</span>
            </Link>
            <Link
              to="/albums"
              className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 hover:border-gray-900 hover:bg-gray-50 transition-colors"
            >
              <FolderOpen size={18} className="text-brand" />
              <span className="font-medium text-gray-900">My Albums</span>
            </Link>
            {user.role === 'admin' && (
              <Link
                to="/admin/dashboard"
                className="sm:col-span-2 flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 hover:border-gray-900 hover:bg-gray-50 transition-colors"
              >
                <User size={18} className="text-brand" />
                <span className="font-medium text-gray-900">Admin Dashboard</span>
              </Link>
            )}
          </div>

          <div className="p-6">
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors"
            >
              <LogOut size={16} />
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <ProtectedRoute>
      <AccountPageContent />
    </ProtectedRoute>
  );
}
