export interface BookActionsButtonsProps {
  liked: boolean
  saved: boolean
  setLiked: (liked: boolean) => void
  setSaved: (saved: boolean) => void
}

export interface BookCoverProps {
  coverImage: string
  title: string
  year: number | string
  isAuthenticated: boolean
  liked: boolean
  saved: boolean
  setLiked: (liked: boolean) => void
  setSaved: (saved: boolean) => void
}

export interface TooltipButtonProps {
  icon: unknown
  tooltip: string
  active: boolean
  onClick: () => void
}

export interface BookHeaderProps {
  id: string | number
  title: string
  author: string
  publisher: string
  rating: number | string
}

export interface BookSummaryProps {
  summary: string
  truncatedSummary: string
  expanded: boolean
  setExpanded: (expanded: boolean) => void
}

export interface BookTagsProps {
  tags: string[]
}
