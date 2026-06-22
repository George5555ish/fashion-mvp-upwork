import { FormEvent, useEffect, useState } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import Header from '../components/Header';
import ProtectedRoute from '../components/ProtectedRoute';
import {
  createAdminLook,
  deleteAdminLook,
  getAdminLooks,
  updateAdminLook,
  type AffiliateLink,
  type CuratedLook,
} from '../services/api';

function AdminLooksPageContent() {
  const [looks, setLooks] = useState<CuratedLook[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [published, setPublished] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [links, setLinks] = useState<AffiliateLink[]>([{ label: '', url: '' }]);

  const loadLooks = async () => {
    try {
      setLoading(true);
      setLooks(await getAdminLooks());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load looks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLooks();
  }, []);

  const buildFormData = () => {
    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('caption', caption.trim());
    formData.append('published', String(published));
    formData.append('links', JSON.stringify(links.filter((link) => link.label.trim() && link.url.trim())));
    if (imageFile) {
      formData.append('image', imageFile);
    }
    return formData;
  };

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();
    if (!imageFile) {
      setError('Outfit image is required');
      return;
    }

    try {
      setSaving(true);
      await createAdminLook(buildFormData());
      setTitle('');
      setCaption('');
      setImageFile(null);
      setLinks([{ label: '', url: '' }]);
      await loadLooks();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create look');
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (look: CuratedLook) => {
    const formData = new FormData();
    formData.append('title', look.title);
    formData.append('caption', look.caption);
    formData.append('published', String(!look.published));
    formData.append('links', JSON.stringify(look.links || []));

    try {
      await updateAdminLook(look.id, formData);
      await loadLooks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update look');
    }
  };

  const handleDelete = async (lookId: string) => {
    if (!window.confirm('Delete this look?')) return;

    try {
      await deleteAdminLook(lookId);
      await loadLooks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete look');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin: Curated Looks</h1>
        <p className="text-gray-600 mb-8">Upload outfit photos with affiliate links for FindThatFit.</p>

        <form onSubmit={handleCreate} className="bg-white rounded-xl border border-gray-200 p-6 mb-10 space-y-4">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Outfit image</label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full text-sm"
              />
            </div>
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
                  src={`data:${look.imageMimeType};base64,${look.imageBase64}`}
                  alt={look.title}
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-semibold text-gray-900">{look.title}</h2>
                      <p className="text-sm text-gray-500 mt-1">{look.published ? 'Published' : 'Draft'}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(look.id)}
                      className="text-gray-400 hover:text-red-600"
                      aria-label="Delete look"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => togglePublish(look)}
                    className="btn-secondary mt-4 text-sm py-2 px-4"
                  >
                    {look.published ? 'Unpublish' : 'Publish'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
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
