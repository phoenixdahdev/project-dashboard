"use client"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { FilterChip } from "@/components/filter-chip"
import { ViewOptionsPopover } from "@/components/view-options-popover"
import { Funnel, Link as LinkIcon, Plus, Sparkle } from "@phosphor-icons/react/dist/ssr"

interface ProjectHeaderProps {
  filters: { key: string; value: string }[]
  onRemoveFilter: (key: string) => void
  viewOptions: {
    viewType: "list" | "board" | "timeline"
    tasks: "indented" | "collapsed" | "flat"
    ordering: "manual" | "alphabetical" | "date"
    showAbsentParent: boolean
    showClosedProjects: boolean
    groupBy: "none" | "status" | "assignee" | "tags"
    properties: string[]
  }
  onViewOptionsChange: (options: any) => void
}

export function ProjectHeader({ filters, onRemoveFilter, viewOptions, onViewOptionsChange }: ProjectHeaderProps) {
  return (
    <header className="flex flex-col border-b border-border/40">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="h-8 w-8 rounded-lg hover:bg-accent text-muted-foreground" />
          <p className="text-base font-medium text-foreground">Projects</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4" weight="bold" />
            Add Project
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 pb-3 pt-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-2 rounded-full border-border/60 px-3 bg-transparent">
            <Funnel className="h-4 w-4" />
            Filter
          </Button>
          {filters.map((filter) => (
            <FilterChip
              key={filter.key}
              label={`${filter.key}: ${filter.value}`}
              onRemove={() => onRemoveFilter(filter.key)}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ViewOptionsPopover options={viewOptions} onChange={onViewOptionsChange} />
          <Button className="h-8 gap-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
            <Sparkle className="h-4 w-4" weight="fill" />
            Ask AI
          </Button>
        </div>
      </div>
    </header>
  )
}
