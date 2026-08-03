import { FormEvent, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { FolderPlus, Loader2, Plus, Trash2 } from 'lucide-react';
import Header from '../components/Header';
import EditCuratedLookModal from '../components/EditCuratedLookModal';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';
import { useAdminCollections, useAdminLooks } from '../hooks/useAdminData';
import { queryKeys } from '../lib/queryKeys';
import {
  createAdminCollection,
  createAdminLook,
  deleteAdminCollection,
  deleteAdminLook,
  updateAdminCollection,
  updateAdminLook,
  type AffiliateLink,
  type CuratedCollectionSummary,
  type CuratedLook,
} from '../services/api';
import { getAdminLookImageSrc } from '../utils/imageUrls';

function AdminLooksPageContent() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const collectionsQuery = useAdminCollections();
  const looksQuery = useAdminLooks();
  const collections = collectionsQuery.data ?? [];
  const looks = looksQuery.data ?? [];
  const loading = (collectionsQuery.isLoading || looksQuery.isLoading)
    && !collectionsQuery.data
    && !looksQuery.data;

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [collectionName, setCollectionName] = useState('');
  const [collectionPublished, setCollectionPublished] = useState(true);
  const [creatingCollection, setCreatingCollection] = useState(false);

  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [published, setPublished] = useState(true);
  const [collectionId, setCollectionId] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [links, setLinks] = useState<AffiliateLink[]>([{ label: '', url: '' }]);
  const [editingLook, setEditingLook] = useState<CuratedLook | null>(null);

  const refreshPublicLooks = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.adminCollections(user?.id) }),
      queryClient.invalidateQueries({ queryKey: queryKeys.adminLooks(user?.id) }),
      queryClient.invalidateQueries({ queryKey: queryKeys.publishedCollections }),
    ]);
  };

  const buildLookFormData = (overrides?: {
    title?: string;
    caption?: string;
    published?: boolean;
    collectionId?: string | null;
    links?: AffiliateLink[];
    imageFile?: File | null;
  }) => {
    const formData = new FormData();
    formData.append('title', (overrides?.title ?? title).trim());
    formData.append('caption', (overrides?.caption ?? caption).trim());
    formData.append('published', String(overrides?.published ?? published));
    formData.append(
      'collectionId',
      (overrides?.collectionId ?? collectionId) || 'none',
    );
    formData.append(
      'links',
      JSON.stringify((overrides?.links ?? links).filter((link) => link.label.trim() && link.url.trim())),
    );
    const file = overrides?.imageFile ?? imageFile;
    if (file) {
      formData.append('image', file);
    }
    return formData;
  };

  const handleCreateCollection = async (event: FormEvent) => {
    event.preventDefault();
    const name = collectionName.trim();
    if (!name) return;

    try {
      setCreatingCollection(true);
      await createAdminCollection(name, collectionPublished);
      setCollectionName('');
      setCollectionPublished(true);
      await refreshPublicLooks();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create album');
    } finally {
      setCreatingCollection(false);
    }
  };

  const toggleCollectionPublish = async (collection: CuratedCollectionSummary) => {
    try {
      await updateAdminCollection(collection.id, { published: !collection.published });
      await refreshPublicLooks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update album');
    }
  };

  const handleDeleteCollection = async (collectionIdToDelete: string) => {
    if (!window.confirm('Delete this album? Looks inside it will become uncategorized.')) return;

    try {
      await deleteAdminCollection(collectionIdToDelete);
      if (collectionId === collectionIdToDelete) {
        setCollectionId('');
      }
      await refreshPublicLooks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete album');
    }
  };

  const handleCreateLook = async (event: FormEvent) => {
    event.preventDefault();
    if (!imageFile) {
      setError('Outfit image is required');
      return;
    }

    try {
      setSaving(true);
      await createAdminLook(buildLookFormData());
      setTitle('');
      setCaption('');
      setCollectionId('');
      setImageFile(null);
      setLinks([{ label: '', url: '' }]);
      await refreshPublicLooks();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create look');
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (look: CuratedLook) => {
    const formData = buildLookFormData({
      title: look.title,
      caption: look.caption,
      published: !look.published,
      collectionId: look.collectionId || 'none',
      links: look.links || [],
      imageFile: null,
    });

    try {
      await updateAdminLook(look.id, formData);
      await refreshPublicLooks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update look');
    }
  };

  const moveLookToCollection = async (look: CuratedLook, nextCollectionId: string) => {
    const formData = buildLookFormData({
      title: look.title,
      caption: look.caption,
      published: look.published,
      collectionId: nextCollectionId || 'none',
      links: look.links || [],
      imageFile: null,
    });

    try {
      await updateAdminLook(look.id, formData);
      await refreshPublicLooks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to move look');
    }
  };

  const handleDeleteLook = async (lookId: string) => {
    if (!window.confirm('Delete this look?')) return;

    try {
      await deleteAdminLook(lookId);
      await refreshPublicLooks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete look');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin: Curated Looks</h1>
        <p className="text-gray-600 mb-8">
          Create fit albums like &quot;Restaurant Fits&quot;, then upload looks into each album.
        </p>

        <section className="bg-white rounded-xl border border-gray-200 p-6 mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Fit Albums</h2>
          <form onSubmit={handleCreateCollection} className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              placeholder='New album name, e.g. Restaurant Fits'
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
            />
            <label className="flex items-center gap-2 text-sm text-gray-700 sm:px-2">
              <input
                type="checkbox"
                checked={collectionPublished}
                onChange={(e) => setCollectionPublished(e.target.checked)}
              />
              Publish album
            </label>
            <button
              type="submit"
              disabled={creatingCollection}
              className="btn-primary flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <FolderPlus size={18} />
              Create Album
            </button>
          </form>

          {collections.length === 0 ? (
            <p className="text-sm text-gray-500">No albums yet. Create one above.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {collections.map((collection) => (
                <div
                  key={collection.id}
                  className="rounded-xl border border-gray-200 p-4 flex items-start justify-between gap-4"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{collection.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {collection.lookCount} look{collection.lookCount === 1 ? '' : 's'} ·{' '}
                      {collection.published ? 'Published' : 'Draft'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleCollectionPublish(collection)}
                      className="btn-secondary text-sm py-2 px-3"
                    >
                      {collection.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCollection(collection.id)}
                      className="text-gray-400 hover:text-red-600 p-2"
                      aria-label={`Delete ${collection.name}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <form onSubmit={handleCreateLook} className="bg-white rounded-xl border border-gray-200 p-6 mb-10 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Upload a Look</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Album</label>
              <select
                value={collectionId}
                onChange={(e) => setCollectionId(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option value="">No album</option>
                {collections.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Outfit image</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Describe the outfit and styling notes..."
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Shop links</label>
              <button
                type="button"
                onClick={() => setLinks([...links, { label: '', url: '' }])}
                className="text-sm text-gray-700 hover:text-gray-900 inline-flex items-center gap-1"
              >
                <Plus size={14} />
                Add link
              </button>
            </div>
            {links.map((link, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  value={link.label}
                  onChange={(e) => {
                    const next = [...links];
                    next[index] = { ...next[index], label: e.target.value };
                    setLinks(next);
                  }}
                  placeholder="Label, e.g. Dress"
                  className="rounded-lg border border-gray-300 px-3 py-2"
                />
                <input
                  value={link.url}
                  onChange={(e) => {
                    const next = [...links];
                    next[index] = { ...next[index], url: e.target.value };
                    setLinks(next);
                  }}
                  placeholder="Affiliate URL"
                  className="rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
            ))}
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            Publish immediately
          </label>

          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? 'Saving...' : 'Create Look'}
          </button>
        </form>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin h-10 w-10 text-gray-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {looks.map((look) => (
              <div key={look.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <img
                  src={getAdminLookImageSrc(look)}
                  alt={look.title}
                  loading="lazy"
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="p-4 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-semibold text-gray-900">{look.title}</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {look.published ? 'Published' : 'Draft'}
                        {look.collectionName ? ` · ${look.collectionName}` : ' · No album'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingLook(look)}
                        className="text-sm text-gray-700 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteLook(look.id)}
                        className="text-gray-400 hover:text-red-600"
                        aria-label="Delete look"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Move to album</label>
                    <select
                      value={look.collectionId || ''}
                      onChange={(e) => moveLookToCollection(look, e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    >
                      <option value="">No album</option>
                      {collections.map((collection) => (
                        <option key={collection.id} value={collection.id}>
                          {collection.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => togglePublish(look)}
                    className="btn-secondary text-sm py-2 px-4"
                  >
                    {look.published ? 'Unpublish' : 'Publish'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-sm text-red-600 mt-4">{error}</p>}

        {editingLook && (
          <EditCuratedLookModal
            look={editingLook}
            collections={collections}
            onClose={() => setEditingLook(null)}
            onSaved={refreshPublicLooks}
          />
        )}
      </div>
    </div>
  );
}

export default function AdminLooksPage() {
  return (
    <ProtectedRoute adminOnly>
      <AdminLooksPageContent />
    </ProtectedRoute>
  );
}
