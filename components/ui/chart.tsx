"use client"

import * as React from "react"
import { ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"
import { cn } from "@/lib/utils"

export type ChartConfig = Record<string, { label?: React.ReactNode; color?: string }>

const ChartContext = React.createContext<{ config: ChartConfig }>({ config: {} })

export function ChartContainer({ id, className, config, children, ...props }: React.ComponentProps<"div"> & { config: ChartConfig; children: React.ReactNode }) {
  const chartId = `chart-${id || React.useId().replace(/:/g, "")}`
  return (
    <ChartContext.Provider value={{ config }}>
      <div data-chart={chartId} className={cn("flex aspect-video justify-center text-xs [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden", className)} {...props}>
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const entries = Object.entries(config).filter(([, item]) => item.color)
  if (!entries.length) return null
  return <style dangerouslySetInnerHTML={{ __html: entries.map(([key, item]) => `[data-chart=${id}] { --color-${key}: ${item.color}; }`).join("\n") }} />
}

export function ChartTooltip(props: React.ComponentProps<typeof RechartsTooltip>) {
  return <RechartsTooltip {...props} />
}

export function ChartTooltipContent({ active, payload, hideLabel, nameKey }: { active?: boolean; payload?: Array<{ name?: string; value?: number; color?: string; payload?: Record<string, unknown> }>; hideLabel?: boolean; nameKey?: string }) {
  const { config } = React.useContext(ChartContext)
  if (!active || !payload?.length) return null
  const key = String(payload[0]?.payload?.[nameKey || "name"])
  return (
    <div className="rounded-lg border bg-background px-3 py-2 shadow-md">
      <div className="grid gap-1.5">
        {!hideLabel && <p className="font-medium">{config[key]?.label || payload[0]?.name}</p>}
        {payload.map((item, index) => (
          <div key={`${item.name}-${index}`} className="flex items-center gap-2 text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: item.color }} />
            {config[String(item.payload?.[nameKey || "name"])]?.label || item.name}
            <span className="ml-auto font-mono font-medium text-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
