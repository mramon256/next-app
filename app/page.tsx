import { GradientBackground } from "@/components/ui/oceanic-shimmer"
import { Navbar } from "@/components/ui/navbar"
import { ChartRadialSimple } from "@/components/charts/chart-radial-simple"

export default function Page() {
  return (
    <main className="relative isolate min-h-svh p-4 sm:p-6">
      <div className="absolute inset-0 -z-10">
        <GradientBackground className="h-full w-full" />
      </div>
      <Navbar />
      <section className="mx-auto mt-10 w-full max-w-6xl" aria-label="Visitor statistics">
        <div className="mx-auto w-full max-w-sm">
          <ChartRadialSimple />
        </div>
      </section>
    </main>
  )
}
