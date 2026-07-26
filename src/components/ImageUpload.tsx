import { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (file: File) => void;
  disabled?: boolean;
  comingSoon?: boolean;
}

export default function ImageUpload({ onUpload, disabled = false, comingSoon = false }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (disabled) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    onUpload(file);
  }, [disabled, onUpload]);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return;

    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, [disabled]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return;

    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [disabled, handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, [disabled, handleFile]);

  const clearPreview = useCallback(() => {
    setPreview(null);
  }, []);

  return (
    <div className="w-full">
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center
          transition-colors
          ${dragActive && !disabled ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : 'cursor-pointer hover:border-gray-400'}
        `}
        onDragEnter={disabled ? undefined : handleDrag}
        onDragLeave={disabled ? undefined : handleDrag}
        onDragOver={disabled ? undefined : handleDrag}
        onDrop={disabled ? undefined : handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          disabled={disabled}
          className="hidden"
          id="image-upload"
        />

        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-w-full max-h-64 mx-auto rounded-lg object-contain"
            />
            {!disabled && (
              <button
                onClick={clearPreview}
                className="absolute top-2 right-2 p-1 bg-black text-white rounded-full hover:bg-gray-800"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ) : disabled ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-4 bg-gray-100 rounded-full">
              <Upload size={32} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">
                {comingSoon ? 'Upload coming soon' : 'Drag & drop an outfit photo'}
              </p>
              <p className="text-xs text-gray-500">
                {comingSoon ? 'This feature is not available yet' : 'or click to browse'}
              </p>
            </div>
            {comingSoon && (
              <span className="inline-block rounded-full bg-brand/10 text-brand text-xs font-semibold tracking-wide px-3 py-1">
                Coming soon
              </span>
            )}
          </div>
        ) : (
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-gray-100 rounded-full">
                <Upload size={32} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Drag & drop an outfit photo
                </p>
                <p className="text-xs text-gray-500">or click to browse</p>
              </div>
            </div>
          </label>
        )}
      </div>
    </div>
  );
}
