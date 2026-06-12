import Link from 'next/link'
import { Minimize2, Maximize2, Crop, RefreshCw, RotateCw, FlipHorizontal, Stamp, Info } from 'lucide-react'
import { type TOOLS } from '@/constants/tools'

const ICON_MAP = { Minimize2, Maximize2, Crop, RefreshCw, RotateCw, FlipHorizontal, Stamp, Info }

type Tool = typeof TOOLS[number]

export function ToolCard({ tool }: { tool: Tool }) {
  const Icon = ICON_MAP[tool.icon as keyof typeof ICON_MAP]
  return (
    <Link
      href={tool.href}
      className="group relative p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200"
    >
      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${tool.color} mb-4 shadow-sm`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="font-semibold group-hover:text-primary transition-colors">{tool.name}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
    </Link>
  )
}
