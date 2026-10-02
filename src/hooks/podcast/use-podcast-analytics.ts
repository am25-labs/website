"use client"

import { useEffect, useRef } from "react"
import { track } from "@/lib/analytics"

interface UsePodcastAnalyticsProps {
  title: string
  season: number
  episodeNumber: number
  type: string
  duration: number
  currentTime: number
}

export function usePodcastAnalytics({
  title,
  season,
  episodeNumber,
  type,
  duration,
  currentTime,
}: UsePodcastAnalyticsProps) {
  const hasStartedEventFired = useRef(false)
  const hasCompletedEventFired = useRef(false)

  const eventLabel = `T${season}E${episodeNumber} ${title}`

  useEffect(() => {
    hasStartedEventFired.current = false
    hasCompletedEventFired.current = false
  }, [eventLabel])

  useEffect(() => {
    if (!hasStartedEventFired.current && currentTime > 30 && duration > 60) {
      track("podcast-started", { title: eventLabel, season, type })
      hasStartedEventFired.current = true
    }
  }, [currentTime, duration, eventLabel, title, season, type])

  useEffect(() => {
    if (!hasCompletedEventFired.current && duration > 0 && currentTime / duration >= 0.9) {
      track("podcast-completed", { title: eventLabel, season, type })
      hasCompletedEventFired.current = true
    }
  }, [currentTime, duration, eventLabel, title, season, type])
}
