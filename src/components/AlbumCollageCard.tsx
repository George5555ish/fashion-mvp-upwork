import LoadingImage from './LoadingImage';
import type { CuratedLookSummary } from '../services/api';
import { getCuratedLookImageSrc } from '../utils/imageUrls';
import { siteConfig } from '../config/site';

interface AlbumCollageCardProps {
  title: string;
  looks: CuratedLookSummary[];
  ownerHandle?: string;
  onClick: () => void;
}

function CollageImage({
  look,
  alt,
  className = '',
}: {
  look: CuratedLookSummary;
  alt: string;
  className?: string;
}) {
  return (
    <LoadingImage
      src={getCuratedLookImageSrc(look)}
      alt={alt}
      loading="lazy"
      containerClassName={`h-full w-full ${className}`}
      className="h-full w-full object-cover"
    />
  );
}

export default function AlbumCollageCard({
  title,
  looks,
  ownerHandle = `@${siteConfig.name.toLowerCase()}`,
  onClick,
}: AlbumCollageCardProps) {
  const previewLooks = looks.slice(0, 3);
  const itemLabel = looks.length === 1 ? '1 item' : `${looks.length} items`;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full text-left"
    >
      <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
        {previewLooks.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            Empty album
          </div>
        ) : previewLooks.length === 1 ? (
          <CollageImage look={previewLooks[0]} alt={title} />
        ) : previewLooks.length === 2 ? (
          <div className="grid h-full grid-cols-2 gap-0.5">
            <CollageImage look={previewLooks[0]} alt={`${title} look 1`} />
            <CollageImage look={previewLooks[1]} alt={`${title} look 2`} />
          </div>
        ) : (
          <div className="grid h-full grid-cols-3 grid-rows-2 gap-0.5">
            <div className="col-span-2 row-span-2">
              <CollageImage look={previewLooks[0]} alt={`${title} look 1`} />
            </div>
            <div className="col-span-1 row-span-1">
              <CollageImage look={previewLooks[1]} alt={`${title} look 2`} />
            </div>
            <div className="col-span-1 row-span-1">
              <CollageImage look={previewLooks[2]} alt={`${title} look 3`} />
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 px-0.5">
        <h3 className="truncate text-[15px] font-semibold text-gray-900 group-hover:underline">
          {title}
        </h3>
        <p className="mt-0.5 truncate text-sm text-gray-500">
          {ownerHandle}
          <span className="mx-1.5 text-gray-300">·</span>
          {itemLabel}
        </p>
      </div>
    </button>
  );
}
