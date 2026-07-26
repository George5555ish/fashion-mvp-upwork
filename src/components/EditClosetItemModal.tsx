import { FormEvent, useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { CLOSET_CATEGORIES, CATEGORY_LABELS } from '../constants/closetCategories';
import { updateClosetItem, type ClosetItem } from '../services/api';
import { getErrorMessage } from '../utils/errors';

interface EditClosetItemModalProps {
  item: ClosetItem;
  onClose: () => void;
  onSaved: () => void;
}

export default function EditClosetItemModal({ item, onClose, onSaved }: EditClosetItemModalProps) {
  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [color, setColor] = useState(item.color);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(item.name);
    setCategory(item.category);
    setColor(item.color);
    setImageFile(null);
    setError(null);
  }, [item]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name.trim());
    formData.append('category', category);
    formData.append('color', color.trim());
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      setSaving(true);
      setError(null);
      await updateClosetItem(item.id, formData);
      onSaved();
      onClose();
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to update item'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h3 className="text-lg font-semibold text-gray-900">Edit item</h3>
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
                  : `data:${item.imageMimeType};base64,${item.imageBase64}`
              }
              alt={item.name}
              className="w-24 h-24 rounded-lg object-cover border border-gray-200 shrink-0"
            />
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                >
                  {CLOSET_CATEGORIES.map((option) => (
                    <option key={option} value={option}>{CATEGORY_LABELS[option]}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Replace photo (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full text-sm"
            />
          </div>

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
