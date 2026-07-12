import { FormEvent, useEffect, useState } from 'react';
import { Loader2, Plus, Share2, Trash2 } from 'lucide-react';
import Header from '../components/Header';
import OutfitBuilderCanvas from '../components/OutfitBuilderCanvas';
import ProtectedRoute from '../components/ProtectedRoute';
import ShareOutfitModal from '../components/ShareOutfitModal';
import {
  createClosetItem,
  createOutfit,
  deleteClosetItem,
  deleteOutfit,
  getClosetItems,
  getOutfits,
  shareOutfit,
  type ClosetItem,
  type Outfit,
} from '../services/api';
import { getErrorMessage } from '../utils/errors';

const CLOSET_CATEGORIES = [
  'top', 'shirt', 'jacket', 'coat', 'pants', 'jeans', 'dress',
  'skirt', 'shoes', 'sneakers', 'boots', 'accessories', 'bag',
];

function ClosetPageContent() {
  const [items, setItems] = useState<ClosetItem[]>([]);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'items' | 'builder' | 'outfits'>('items');

  const [name, setName] = useState('');
  const [category, setCategory] = useState('top');
  const [color, setColor] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [savingItem, setSavingItem] = useState(false);

  const [canvasItemIds, setCanvasItemIds] = useState<string[]>([]);
  const [outfitName, setOutfitName] = useState('');
  const [savingOutfit, setSavingOutfit] = useState(false);

  const [shareModal, setShareModal] = useState<{ name: string; shareId: string } | null>(null);
  const [sharingOutfitId, setSharingOutfitId] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [closetItems, savedOutfits] = await Promise.all([getClosetItems(), getOutfits()]);
      setItems(closetItems);
      setOutfits(savedOutfits);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load closet'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddItem = async (event: FormEvent) => {
    event.preventDefault();
    if (!imageFile) {
      setError('Please choose an image for this closet item');
      return;
    }

    const formData = new FormData();
    formData.append('name', name.trim());
    formData.append('category', category);
    formData.append('color', color.trim());
    formData.append('image', imageFile);

    try {
      setSavingItem(true);
      await createClosetItem(formData);
      setName('');
      setColor('');
      setImageFile(null);
      await loadData();
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to add closet item'));
    } finally {
      setSavingItem(false);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!window.confirm('Remove this item from your closet?')) return;

    try {
      await deleteClosetItem(itemId);
      setCanvasItemIds((current) => current.filter((id) => id !== itemId));
      await loadData();
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to delete item'));
    }
  };

  const handleCreateOutfit = async (event: FormEvent) => {
    event.preventDefault();
    if (canvasItemIds.length === 0) {
      setError('Drag at least one item into the outfit builder');
      return;
    }

    try {
      setSavingOutfit(true);
      await createOutfit(outfitName.trim(), canvasItemIds);
      setOutfitName('');
      setCanvasItemIds([]);
      setActiveTab('outfits');
      await loadData();
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to save outfit'));
    } finally {
      setSavingOutfit(false);
    }
  };

  const handleDeleteOutfit = async (outfitId: string) => {
    if (!window.confirm('Delete this outfit?')) return;

    try {
      await deleteOutfit(outfitId);
      await loadData();
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to delete outfit'));
    }
  };

  const handleShareOutfit = async (outfit: Outfit) => {
    try {
      setSharingOutfitId(outfit.id);
      setError(null);

      if (outfit.isShared && outfit.shareId) {
        setShareModal({ name: outfit.name, shareId: outfit.shareId });
        return;
      }

      const result = await shareOutfit(outfit.id);
      await loadData();
      setShareModal({ name: result.outfit.name, shareId: result.shareId });
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to create share link'));
    } finally {
      setSharingOutfitId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cher&apos;s Closet</h1>
          <p className="text-gray-600">
            Upload your wardrobe, drag pieces together to build outfits, and share looks with friends.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'items', label: 'My Closet' },
            { id: 'builder', label: 'Outfit Builder' },
            { id: 'outfits', label: 'Saved Outfits' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === tab.id ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin h-10 w-10 text-gray-500" />
          </div>
        ) : (
          <>
            {activeTab === 'items' && (
              <div className="space-y-8">
                <form onSubmit={handleAddItem} className="bg-white rounded-xl border border-gray-200 p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Item name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2">
                      {CLOSET_CATEGORIES.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                    <input value={color} onChange={(e) => setColor(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                    <input type="file" accept="image/*" required onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <button type="submit" disabled={savingItem} className="btn-primary inline-flex items-center gap-2 disabled:opacity-60">
                      <Plus size={16} />
                      {savingItem ? 'Adding...' : 'Add to Closet'}
                    </button>
                  </div>
                </form>

                {items.length === 0 ? (
                  <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">
                    Your closet is empty. Upload your first piece above.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {items.map((item) => (
                      <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <img
                          src={`data:${item.imageMimeType};base64,${item.imageBase64}`}
                          alt={item.name}
                          className="w-full aspect-square object-cover"
                        />
                        <div className="p-3">
                          <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                          <p className="text-xs text-gray-500 capitalize mt-1">{item.color} {item.category}</p>
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(item.id)}
                            className="mt-3 text-xs text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'builder' && (
              <div className="space-y-6">
                <form onSubmit={handleCreateOutfit} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row gap-3">
                  <input
                    value={outfitName}
                    onChange={(e) => setOutfitName(e.target.value)}
                    required
                    placeholder="Outfit name, e.g. Weekend brunch"
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                  />
                  <button type="submit" disabled={savingOutfit} className="btn-primary disabled:opacity-60">
                    {savingOutfit ? 'Saving...' : `Save Outfit (${canvasItemIds.length})`}
                  </button>
                </form>

                {items.length === 0 ? (
                  <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">
                    Add closet items first, then drag them into the builder.
                  </div>
                ) : (
                  <OutfitBuilderCanvas
                    items={items}
                    canvasItemIds={canvasItemIds}
                    onCanvasChange={setCanvasItemIds}
                  />
                )}
              </div>
            )}

            {activeTab === 'outfits' && (
              <div className="space-y-4">
                {outfits.length === 0 ? (
                  <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">
                    No saved outfits yet. Use the Outfit Builder to create one.
                  </div>
                ) : (
                  outfits.map((outfit) => (
                    <div key={outfit.id} className="bg-white rounded-xl border border-gray-200 p-5">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900">{outfit.name}</h2>
                          {outfit.isShared && (
                            <p className="text-xs text-green-600 mt-1">Share link active</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleShareOutfit(outfit)}
                            disabled={sharingOutfitId === outfit.id}
                            className="btn-secondary text-sm py-2 px-4 inline-flex items-center gap-2 disabled:opacity-60"
                          >
                            <Share2 size={16} />
                            {sharingOutfitId === outfit.id ? 'Sharing...' : 'Share with friend'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteOutfit(outfit.id)}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-gray-500 hover:text-red-600 hover:border-red-200"
                            aria-label="Delete outfit"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {outfit.items.map((item) => (
                          <div key={item.id} className="rounded-lg overflow-hidden border border-gray-200">
                            <img
                              src={`data:${item.imageMimeType};base64,${item.imageBase64}`}
                              alt={item.name}
                              className="w-full aspect-square object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}

        {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
      </div>

      {shareModal && (
        <ShareOutfitModal
          outfitName={shareModal.name}
          shareId={shareModal.shareId}
          onClose={() => setShareModal(null)}
        />
      )}
    </div>
  );
}

export default function ClosetPage() {
  return (
    <ProtectedRoute>
      <ClosetPageContent />
    </ProtectedRoute>
  );
}
