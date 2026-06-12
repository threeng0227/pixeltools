interface Step {
  title: string
  description: string
}

export function HowToSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="space-y-5 mt-4" aria-label="Steps">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <span
            className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold"
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <div className="pt-0.5">
            <p className="font-semibold text-sm">{step.title}</p>
            <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
