import { type ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TOOLS } from '@/constants/tools'

interface ToolLayoutProps {
  title: string
  description: string
  children: ReactNode
  currentToolId: string
}

export function ToolLayout({ title, description, children, currentToolId }: ToolLayoutProps) {
  const relatedTools = TOOLS.filter((t) => t.id !== currentToolId).slice(0, 4)

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <Button variant="ghost" size="sm" render={<Link href="/" />} nativeButton={false} className="-ml-2 mb-4 text-muted-foreground">
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to Tools
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">{description}</p>
      </div>

      {children}

      <section className="mt-20">
        <h2 className="text-xl font-semibold mb-6">Related Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedTools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className="group p-5 rounded-2xl border border-border hover:border-primary/40 hover:bg-muted/50 transition-all"
            >
              <p className="font-medium text-sm group-hover:text-primary transition-colors">{tool.name}</p>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
