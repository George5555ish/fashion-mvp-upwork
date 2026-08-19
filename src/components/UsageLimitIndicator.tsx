import type { UsageLimits } from '../constants/limits';

interface UsageLimitIndicatorProps {
  label: string;
  limits: UsageLimits;
  unit?: string;
  atLimitMessage?: string;
}

export default function UsageLimitIndicator({
  label,
  limits,
  unit = 'items',
  atLimitMessage,
}: UsageLimitIndicatorProps) {
  const { current, max } = limits;
  const percent = max > 0 ? Math.min(100, Math.round((current / max) * 100)) : 0;
  const atLimit = current >= max;
  const nearLimit = !atLimit && percent >= 80;

  const barColor = atLimit ? 'bg-red-500' : nearLimit ? 'bg-amber-500' : 'bg-brand';

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3 mb-2">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className={`text-sm font-semibold tabular-nums ${atLimit ? 'text-red-600' : 'text-gray-700'}`}>
          {current}/{max} {unit}
        </p>
      </div>
      <div
        className="h-2 w-full rounded-full bg-gray-100 overflow-hidden"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`${label}: ${current} of ${max} ${unit}`}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      {atLimit && atLimitMessage && (
        <p className="text-xs text-red-600 mt-2">{atLimitMessage}</p>
      )}
      {!atLimit && nearLimit && (
        <p className="text-xs text-amber-700 mt-2">
          You&apos;re close to your limit — {max - current} {unit} remaining.
        </p>
      )}
    </div>
  );
}
