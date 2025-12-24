"use client"

import { useState, useRef, useEffect } from "react"
import { ProjectRow } from "@/components/project-row"
import {
  CaretLeft,
  CaretRight,
  MagnifyingGlassPlus,
  MagnifyingGlassMinus,
  CaretDown,
} from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface ViewOptions {
  viewType: "list" | "board" | "timeline"
  tasks: "indented" | "collapsed" | "flat"
  ordering: "manual" | "alphabetical" | "date"
  showAbsentParent: boolean
  showClosedProjects: boolean
  groupBy: "none" | "status" | "assignee" | "tags"
  properties: string[]
}

interface ProjectTimelineProps {
  viewOptions: ViewOptions
}

const projects = [
  {
    id: "1",
    name: "Fintech Mobile App Redesign",
    taskCount: 4,
    progress: 80,
    startDate: new Date(2025, 9, 25),
    endDate: new Date(2025, 10, 7),
    tasks: [
      {
        id: "1-1",
        name: "Brainstorm, IA",
        assignee: "JD",
        status: "done" as const,
        startDate: new Date(2025, 9, 25),
        endDate: new Date(2025, 10, 7),
      },
      {
        id: "1-2",
        name: "Wireframe layout",
        assignee: "JD",
        status: "todo" as const,
        startDate: new Date(2025, 9, 25),
        endDate: new Date(2025, 10, 7),
      },
      {
        id: "1-3",
        name: "Demo 3 concept",
        assignee: "JD",
        status: "todo" as const,
        startDate: new Date(2025, 9, 25),
        endDate: new Date(2025, 10, 7),
      },
      {
        id: "1-4",
        name: "UI Other screens",
        assignee: "JD",
        status: "todo" as const,
        startDate: new Date(2025, 9, 25),
        endDate: new Date(2025, 10, 7),
      },
    ],
  },
  {
    id: "2",
    name: "Internal PM System",
    taskCount: 8,
    progress: 45,
    startDate: new Date(2025, 9, 25),
    endDate: new Date(2025, 10, 7),
    tasks: [],
  },
  {
    id: "3",
    name: "AI Learning Platform",
    taskCount: 2,
    progress: 70,
    startDate: new Date(2025, 9, 25),
    endDate: new Date(2025, 10, 7),
    tasks: [
      {
        id: "3-1",
        name: "UI Other screens",
        assignee: "JD",
        status: "todo" as const,
        startDate: new Date(2025, 9, 25),
        endDate: new Date(2025, 10, 7),
      },
      {
        id: "3-2",
        name: "Payment intergration",
        assignee: "JD",
        status: "todo" as const,
        startDate: new Date(2025, 9, 25),
        endDate: new Date(2025, 10, 7),
      },
    ],
  },
  {
    id: "4",
    name: "Internal CRM System",
    taskCount: 8,
    progress: 30,
    startDate: new Date(2025, 9, 25),
    endDate: new Date(2025, 10, 7),
    tasks: [],
  },
  {
    id: "5",
    name: "Ecommerce website",
    taskCount: 4,
    progress: 55,
    startDate: new Date(2025, 9, 25),
    endDate: new Date(2025, 10, 7),
    tasks: [],
  },
]

export function ProjectTimeline({ viewOptions }: ProjectTimelineProps) {
  const [expandedProjects, setExpandedProjects] = useState<string[]>(["1", "3"])
  const [timeRange, setTimeRange] = useState("week")
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1))
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [todayPosition, setTodayPosition] = useState(0)

  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
    )
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const navigateTime = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (timeRange === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
    }
    setCurrentDate(newDate)
  }

  // Generate dates for the timeline
  const getDates = () => {
    const dates: Date[] = []
    const startDate = new Date(currentDate)
    startDate.setDate(startDate.getDate() - 3)

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const dates = getDates()

  // Calculate today line position
  useEffect(() => {
    const today = new Date()
    const startDate = new Date(currentDate)
    startDate.setDate(startDate.getDate() - 3)

    const diffTime = today.getTime() - startDate.getTime()
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    const position = (diffDays / 7) * 100

    setTodayPosition(Math.max(0, Math.min(100, position)))
  }, [currentDate])

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-background">
      {/* Timeline Controls */}
      <div className="flex items-center justify-between border-b border-border/40 px-4 py-2 bg-background">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground hidden md:inline">Name</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <div className="hidden md:flex items-center gap-1 ml-4 justify-between">
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => navigateTime("prev")}>
              <CaretLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 rounded-lg px-3 text-xs bg-transparent"
              onClick={goToToday}
            >
              Today
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => navigateTime("next")}>
              <CaretRight className="h-4 w-4" />
            </Button>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="ml-2 h-7 rounded-lg border border-border/60 bg-background px-2 text-xs mr-0 hidden md:block"
          >
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
          <div className="ml-2 hidden md:flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg">
              <MagnifyingGlassPlus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg">
              <MagnifyingGlassMinus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden md:block flex-1 overflow-hidden">
        {/* Timeline Header - Grid Layout */}
        <div className="flex border-b bg-muted/30 border-border sticky top-0 z-20">
          {/* Sticky Name Column Header */}
          <div className="w-[280px] lg:w-[320px] shrink-0 px-4 py-2 bg-muted/30 sticky left-0 z-10 border-r border-border/40">
            <span className="text-xs font-medium text-muted-foreground">Name</span>
          </div>

          {/* Scrollable Timeline Dates */}
          <div className="flex flex-1 min-w-[600px] relative">
            <div className="flex flex-1">
              {dates.map((date, index) => {
                const { dayName, dayNum } = formatDate(date)
                return (
                  <div key={index} className="flex flex-1 flex-col items-center justify-center py-2">
                    <span className="text-xs text-muted-foreground">
                      {dayName} {dayNum}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-muted/30 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Project Rows with Sticky Name Column */}
        <div ref={scrollContainerRef} className="flex-1 overflow-auto relative">
          {projects.map((project) => (
            <ProjectRow
              key={project.id}
              project={project}
              isExpanded={expandedProjects.includes(project.id)}
              onToggle={() => toggleProject(project.id)}
              dates={dates}
              todayPosition={todayPosition}
            />
          ))}

          <div
            className="absolute top-0 bottom-0 w-0.5 z-10 pointer-events-none"
            style={{
              left: `calc(280px + ${todayPosition}% * (100% - 280px) / 100)`,
            }}
          />
        </div>
      </div>

      <div className="md:hidden flex-1 overflow-auto">
        {projects.map((project) => (
          <div key={project.id} className="border-b border-border/30">
            {/* Mobile Project Card */}
            <div
              className="p-4 flex items-center justify-between cursor-pointer active:bg-accent/50"
              onClick={() => toggleProject(project.id)}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {expandedProjects.includes(project.id) ? (
                  <CaretDown className="h-4 w-4 text-muted-foreground shrink-0" />
                ) : (
                  <CaretRight className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">{project.name}</span>
                    <span className="text-xs text-muted-foreground bg-muted rounded px-1.5 py-0.5 shrink-0">
                      {project.taskCount}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {project.startDate.toLocaleDateString()} - {project.endDate.toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium text-muted-foreground shrink-0 ml-2">{project.progress}%</div>
            </div>

            {/* Mobile Task List */}
            {expandedProjects.includes(project.id) && (
              <div className="bg-muted/20">
                {project.tasks.map((task) => (
                  <div key={task.id} className="px-4 py-3 pl-12 border-t border-border/20">
                    <div className="flex items-start gap-2">
                      <Checkbox className="h-4 w-4 rounded-sm mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm">{task.name}</div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <span>{task.assignee}</span>
                          <span>•</span>
                          <span>{task.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function formatDate(date: Date) {
  const dayName = date.toLocaleString("default", { weekday: "short" })
  const dayNum = date.getDate()
  return { dayName, dayNum }
}
