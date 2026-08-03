import { FormEvent, useEffect, useState } from 'react';
import { Loader2, Plus, X } from 'lucide-react';
import {
  updateAdminLook,
  type AffiliateLink,
  type CuratedCollectionSummary,
  type CuratedLook,
} from '../services/api';
import { getErrorMessage } from '../utils/errors';
import { getAdminLookImageSrc } from '../utils/imageUrls';

interface EditCuratedLookModalProps {
  look: CuratedLook;
  collections: CuratedCollectionSummary[];
  onClose: () => void;
  onSaved: () => void;
}

export default function EditCuratedLookModal({
  look,
  collections,
  onClose,
  onSaved,
}: EditCuratedLookModalProps) {
  const [title, setTitle] = useState(look.title);
  const [caption, setCaption] = useState(look.caption);
  const [published, setPublished] = useState(Boolean(look.published));
  const [collectionId, setCollectionId] = useState(look.collectionId || '');
  const [links, setLinks] = useState<AffiliateLink[]>(
    look.links.length > 0 ? look.links : [{ label: '', url: '' }],
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle(look.title);
    setCaption(look.caption);
    setPublished(Boolean(look.published));
    setCollectionId(look.collectionId || '');
    setLinks(look.links.length > 0 ? look.links : [{ label: '', url: '' }]);
    setImageFile(null);
    setError(null);
  }, [look]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('caption', caption.trim());
    formData.append('published', String(published));
    formData.append('collectionId', collectionId || 'none');
    formData.append(
      'links',
      JSON.stringify(links.filter((link) => link.label.trim() && link.url.trim())),
    );
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      setSaving(true);
      setError(null);
      await updateAdminLook(look.id, formData);
      onSaved();
      onClose();
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to update look'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 sticky top-0 bg-white">
          <h3 className="text-lg font-semibold text-gray-900">Edit look</h3>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
          <div className="flex gap-4">
            <img
              src={
                imageFile
                  ? URL.createObjectURL(imageFile)
                  : getAdminLookImageSrc(look)
              }
              alt={look.title}
              className="w-28 h-36 rounded-lg object-cover border border-gray-200 shrink-0"
            />
            <div className="flex-1 space-y-4">
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
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
              <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  placeholder="Shop URL"
                  className="rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Replace image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full text-sm"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            Published
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn-primary inline-flex items-center gap-2 disabled:opacity-60">
              {saving && <Loader2 size={16} className="animate-spin" />}
              {saving ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
