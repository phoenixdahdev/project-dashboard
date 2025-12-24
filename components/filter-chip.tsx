"use client"

import { X } from "@phosphor-icons/react/dist/ssr"

interface FilterChipProps {
  label: string
  onRemove: () => void
}

export function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <div className="flex h-8 items-center gap-1.5 rounded-full border border-border/60 bg-background px-3 text-sm">
      <span>{label}</span>
      <button onClick={onRemove} className="ml-0.5 rounded-full p-0.5 hover:bg-accent">
        <X className="h-3.5 w-3.5" weight="bold" />
      </button>
    </div>
  )
}
