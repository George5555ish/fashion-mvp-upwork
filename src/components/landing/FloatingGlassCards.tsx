type ShadowVariant = 'brand' | 'sky' | 'rose' | 'coral' | 'accent' | 'neutral';

interface FloatingCard {
  text: string;
  top: string;
  left?: string;
  right?: string;
  delay: string;
  duration: string;
  shadow: ShadowVariant;
  hiddenOnMobile?: boolean;
}

const shadowClasses: Record<ShadowVariant, string> = {
  brand: 'shadow-glass-brand',
  sky: 'shadow-glass-sky',
  rose: 'shadow-glass-rose',
  coral: 'shadow-glass-coral',
  accent: 'shadow-glass-accent',
  neutral: 'shadow-glass',
};

const backgroundCards: FloatingCard[] = [
  { text: 'AI detects every piece', top: '5%', left: '2%', delay: '0s', duration: '11s', shadow: 'sky', hiddenOnMobile: true },
  { text: 'Compare prices in seconds', top: '42%', left: '1%', delay: '0.8s', duration: '12s', shadow: 'brand', hiddenOnMobile: true },
  { text: 'Organize your wardrobe', top: '72%', left: '4%', delay: '1.6s', duration: '10s', shadow: 'accent', hiddenOnMobile: true },
];

const foregroundCards: FloatingCard[] = [
  { text: 'Snap a photo — get shoppable dupes', top: '8%', left: '38%', delay: '0.3s', duration: '8s', shadow: 'sky' },
  { text: 'Curated looks, updated weekly', top: '14%', right: '6%', delay: '1.1s', duration: '9s', shadow: 'rose', hiddenOnMobile: true },
  { text: 'Best price flagged for you', top: '28%', left: '8%', delay: '0.5s', duration: '7.5s', shadow: 'brand' },
  { text: 'Plan outfits for any occasion', top: '46%', right: '10%', delay: '1.8s', duration: '8.5s', shadow: 'coral' },
  { text: 'Your wardrobe, fully digitized', top: '58%', left: '42%', delay: '0.2s', duration: '9.5s', shadow: 'accent', hiddenOnMobile: true },
  { text: 'One tap to share your fit', top: '70%', left: '6%', delay: '2.2s', duration: '8s', shadow: 'rose' },
  { text: 'Trending styles, ready to buy', top: '82%', right: '8%', delay: '1.4s', duration: '10s', shadow: 'sky' },
  { text: 'Dupes that match your vibe', top: '90%', left: '35%', delay: '0.9s', duration: '7s', shadow: 'brand', hiddenOnMobile: true },
];

function CardLayer({
  cards,
  layer,
}: {
  cards: FloatingCard[];
  layer: 'back' | 'front';
}) {
  const isFront = layer === 'front';

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${isFront ? 'z-20' : 'z-0'}`}
      aria-hidden="true"
    >
      {cards.map((card, index) => (
        <div
          key={card.text}
          className={`absolute rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 max-w-[10rem] sm:max-w-[12.5rem] animate-float-glass ${shadowClasses[card.shadow]} ${
            isFront
              ? 'bg-white/70 backdrop-blur-xl border border-white/80 ring-1 ring-white/50'
              : `glass opacity-60 ${shadowClasses[card.shadow]}`
          } ${card.hiddenOnMobile ? 'hidden sm:block' : ''}`}
          style={{
            top: card.top,
            left: card.left,
            right: card.right,
            animationDelay: card.delay,
            animationDuration: card.duration,
            ['--float-rotate' as string]: `${(index % 3 - 1) * 2.5}deg`,
          }}
        >
          <p className={`text-[11px] sm:text-xs font-semibold leading-snug ${isFront ? 'text-gray-900' : 'text-gray-700'}`}>
            {card.text}
          </p>
        </div>
      ))}
    </div>
  );
}

interface FloatingGlassCardsProps {
  layer?: 'back' | 'front' | 'both';
}

export default function FloatingGlassCards({ layer = 'both' }: FloatingGlassCardsProps) {
  if (layer === 'back') {
    return <CardLayer cards={backgroundCards} layer="back" />;
  }

  if (layer === 'front') {
    return <CardLayer cards={foregroundCards} layer="front" />;
  }

  return (
    <>
      <CardLayer cards={backgroundCards} layer="back" />
      <CardLayer cards={foregroundCards} layer="front" />
    </>
  );
}
