export const CardSkeleton = () => (
  <div className="rounded-xl overflow-hidden bg-[#14141c] border border-white/5">
    <div className="skeleton aspect-[2/3]" />
  </div>
);

export const GridSkeleton = ({ count = 12 }) => (
  <div
    className="grid gap-4 sm:gap-5 px-4 sm:px-6 lg:px-8 py-6"
    style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(140px, 22vw, 220px), 1fr))' }}
  >
    {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}
  </div>
);

export const HeroSkeleton = () => (
  <div className="px-4 sm:px-6 lg:px-10 py-10 sm:py-16">
    <div className="skeleton h-[clamp(280px,42vw,520px)] w-full rounded-2xl" />
  </div>
);

export const HorizontalSkeleton = () => (
  <div className="px-4 sm:px-6 lg:px-8 py-4 flex gap-4 overflow-hidden">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="shrink-0 w-[240px]">
        <div className="skeleton aspect-video rounded-xl" />
        <div className="skeleton h-3 mt-2 w-3/4 rounded" />
        <div className="skeleton h-2 mt-2 w-1/2 rounded" />
      </div>
    ))}
  </div>
);
