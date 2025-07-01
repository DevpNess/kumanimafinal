import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = ({ children, content, ...props }: { children: React.ReactNode, content: React.ReactNode }) => (
  <TooltipPrimitive.Root delayDuration={0}>
    <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={4}
        className={cn(
          "z-50 overflow-hidden rounded-md bg-black px-3 py-1.5 text-xs text-white shadow-md animate-in fade-in-0 zoom-in-95"
        )}
        {...props}
      >
        {content}
        <TooltipPrimitive.Arrow className="fill-black" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  </TooltipPrimitive.Root>
)

export { Tooltip, TooltipProvider } 