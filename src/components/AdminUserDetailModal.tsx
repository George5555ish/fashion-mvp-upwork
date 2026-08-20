import { ExternalLink, Loader2, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import LoadingImage from './LoadingImage';
import { getAdminUserDetail, type AdminDashboardUser } from '../services/api';
import { queryKeys } from '../lib/queryKeys';
import { getAdminClosetItemImageUrl } from '../utils/imageUrls';

interface AdminUserDetailModalProps {
  user: AdminDashboardUser;
  onClose: () => void;
}

function formatDate(value?: string | null): string {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function AdminUserDetailModal({ user, onClose }: AdminUserDetailModalProps) {
  const detailQuery = useQuery({
    queryKey: queryKeys.adminUserDetail(user.id),
    queryFn: () => getAdminUserDetail(user.id),
  });

  const detail = detailQuery.data;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-xl flex flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-4 shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user.name || 'No name'}</h2>
            <p className="text-sm text-gray-500 mt-1">{user.email}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-8">
          {detailQuery.isLoading && !detail ? (
            <div className="flex justify-center py-16">
              <Loader2 className="animate-spin h-10 w-10 text-gray-500" />
            </div>
          ) : detail ? (
            <>
              <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border border-gray-200 p-4">
                  <p className="text-xs text-gray-500">Role</p>
                  <p className="font-semibold text-gray-900 capitalize mt-1">{detail.user.role}</p>
                </div>
                <div className="rounded-xl border border-gray-200 p-4">
                  <p className="text-xs text-gray-500">Joined</p>
                  <p className="font-semibold text-gray-900 mt-1">{formatDate(detail.user.createdAt)}</p>
                </div>
                <div className="rounded-xl border border-gray-200 p-4">
                  <p className="text-xs text-gray-500">Closet items</p>
                  <p className="font-semibold text-gray-900 mt-1">{detail.user.closetItemCount}</p>
                </div>
                <div className="rounded-xl border border-gray-200 p-4">
                  <p className="text-xs text-gray-500">Albums / outfits</p>
                  <p className="font-semibold text-gray-900 mt-1">
                    {detail.user.albumCount} / {detail.user.outfitCount}
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Closet ({detail.closetItems.length})
                </h3>
                {detail.closetItems.length === 0 ? (
                  <p className="text-sm text-gray-500">No closet items yet.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {detail.closetItems.map((item) => (
                      <div key={item.id} className="rounded-xl border border-gray-200 overflow-hidden">
                        <LoadingImage
                          src={getAdminClosetItemImageUrl(item.id)}
                          alt={item.name}
                          loading="lazy"
                          containerClassName="w-full aspect-square"
                          className="w-full h-full object-cover"
                        />
                        <div className="p-3">
                          <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                          <p className="text-xs text-gray-500 capitalize mt-1">
                            {item.color} {item.category}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Albums ({detail.albums.length})
                </h3>
                {detail.albums.length === 0 ? (
                  <p className="text-sm text-gray-500">No albums yet.</p>
                ) : (
                  <div className="space-y-4">
                    {detail.albums.map((album) => (
                      <div key={album.id} className="rounded-xl border border-gray-200 p-4">
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">{album.name}</h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {album.itemCount} saved · updated {formatDate(album.updatedAt)}
                            </p>
                          </div>
                        </div>
                        {album.items.length === 0 ? (
                          <p className="text-sm text-gray-500">Empty album.</p>
                        ) : (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {album.items.map((item) => (
                              <div key={item.id} className="rounded-lg border border-gray-100 overflow-hidden">
                                {item.product?.imageUrl ? (
                                  <LoadingImage
                                    src={item.product.imageUrl}
                                    alt={item.product.name}
                                    loading="lazy"
                                    containerClassName="w-full aspect-square"
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full aspect-square bg-gray-100" />
                                )}
                                <div className="p-2">
                                  <p className="text-xs font-medium text-gray-900 line-clamp-2">
                                    {item.product?.name || 'Unknown product'}
                                  </p>
                                  {item.product?.shopUrl && (
                                    <a
                                      href={item.product.shopUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-[11px] text-brand mt-1 hover:underline"
                                    >
                                      Shop <ExternalLink size={10} />
                                    </a>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Outfits ({detail.outfits.length})
                </h3>
                {detail.outfits.length === 0 ? (
                  <p className="text-sm text-gray-500">No outfits yet.</p>
                ) : (
                  <div className="space-y-4">
                    {detail.outfits.map((outfit) => (
                      <div key={outfit.id} className="rounded-xl border border-gray-200 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">{outfit.name}</h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {outfit.items.length} pieces · updated {formatDate(outfit.updatedAt)}
                              {outfit.isShared ? ' · Shared' : ''}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {outfit.items.map((item) => (
                            <div key={item.id} className="rounded-lg border border-gray-100 overflow-hidden">
                              <LoadingImage
                                src={getAdminClosetItemImageUrl(item.id)}
                                alt={item.name}
                                loading="lazy"
                                containerClassName="w-full aspect-square"
                                className="w-full h-full object-cover"
                              />
                              <div className="p-2">
                                <p className="text-xs font-medium text-gray-900 truncate">{item.name}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </>
          ) : null}

          {detailQuery.error && (
            <p className="text-sm text-red-600">Failed to load user details</p>
          )}
        </div>
      </div>
    </div>
  );
}
