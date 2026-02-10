import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  name: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="grid items-start"
        style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
      >
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="relative">
            {/* Connecting line */}
            {stepIdx > 0 && (
              <div
                className="absolute top-4 right-1/2 -z-10 h-0.5 w-full"
                aria-hidden="true"
              >
                <div className={cn("h-full w-full", stepIdx <= currentStep ? "bg-primary" : "bg-gray-200")} />
              </div>
            )}

            <div className="flex flex-col items-center gap-y-2">
              {/* Circle */}
              {stepIdx < currentStep ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <Check className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
                </div>
              ) : stepIdx === currentStep ? (
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background">
                   <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
                </div>
              ) : (
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-background" />
              )}
              {/* Text */}
              <p className="text-sm font-medium text-center">{step.name}</p>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
