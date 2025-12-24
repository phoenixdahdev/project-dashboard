"use client"

import { useState } from "react"
import { ProjectHeader } from "@/components/project-header"
import { ProjectTimeline } from "@/components/project-timeline"

export function ProjectsContent() {
  const [viewOptions, setViewOptions] = useState({
    viewType: "list" as "list" | "board" | "timeline",
    tasks: "indented" as "indented" | "collapsed" | "flat",
    ordering: "manual" as "manual" | "alphabetical" | "date",
    showAbsentParent: false,
    showClosedProjects: true,
    groupBy: "none" as "none" | "status" | "assignee" | "tags",
    properties: ["title", "status", "assignee", "dueDate"] as string[],
  })

  const [filters, setFilters] = useState<{ key: string; value: string }[]>([
    { key: "PIC", value: "Jason D" },
    { key: "Status", value: "Active" },
  ])

  const removeFilter = (key: string) => {
    setFilters(filters.filter((f) => f.key !== key))
  }

  return (
    <div className="flex h-screen flex-col bg-background mx-2 my-2 border border-border rounded-lg">
      <ProjectHeader
        filters={filters}
        onRemoveFilter={removeFilter}
        viewOptions={viewOptions}
        onViewOptionsChange={setViewOptions}
      />
      <ProjectTimeline viewOptions={viewOptions} />
    </div>
  )
}
