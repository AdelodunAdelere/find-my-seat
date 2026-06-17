export default function NotFound({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col gap-3 text-center">
      <p className="font-display text-xl text-royal">
        We couldn&apos;t find that name
      </p>
      <p className="text-sm text-ink/70">
        Double-check the spelling, try just your first or last name, or ask
        one of the hosts to help you find your seat.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 text-sm text-gold-deep underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
      >
        Try another name
      </button>
    </div>
  );
}
