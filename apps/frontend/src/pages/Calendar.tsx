export default function Calendar() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <button className="rounded-lg border border-green-900/60 bg-green-950/60 px-3 py-2 text-sm text-zinc-300 hover:border-green-700 transition">
            ←
          </button>

          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              September
            </h1>
            <p className="text-sm text-zinc-400">
              2026
            </p>
          </div>

          <button className="rounded-lg border border-green-900/60 bg-green-950/60 px-3 py-2 text-sm text-zinc-300 hover:border-green-700 transition">
            →
          </button>
        </header>

        {/* Days list */}
        <div className="rounded-xl border border-green-900/60 bg-green-950/50 divide-y divide-green-900/40">

          {[...Array(30)].map((_, i) => {
            const day = i + 1
            const hasEntry = day === 3 || day === 8 || day === 14
            const isToday = day === 12

            return (
              <div
                key={day}
                className={`flex items-start gap-4 px-6 py-4 transition
                  ${isToday ? "bg-green-900/30" : "hover:bg-green-950/80"}
                `}
              >
                {/* Date column */}
                <div className="w-14 text-right">
                  <p className="text-sm font-medium text-zinc-200">
                    {day}
                  </p>
                  <p className="text-xs text-zinc-500">
                    Tue
                  </p>
                </div>

                {/* Entry preview */}
                <div className="flex-1">
                  {hasEntry ? (
                    <>
                      <p className="text-sm text-zinc-200">
                        Felt quieter than usual today. Needed that.
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        11:42 PM
                      </p>
                    </>
                  ) : (
                    <p className="text-sm italic text-zinc-500">
                      No entry
                    </p>
                  )}
                </div>

                {/* Indicator */}
                {hasEntry && (
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
