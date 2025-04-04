export interface BookNavBarProps {
  bookTitle: string | undefined
  bookAuthor: string | undefined
}

export interface LikeButtonProps {
  liked: boolean
  onClick: () => void
  disabled: boolean
}

export interface BookmarkButtonProps {
  bookmarked: boolean
  onClick: () => void
  disabled: boolean
}

export interface SearchBarProps {
  visible: boolean
  onClose: () => void
}

export interface ShareDropdownProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}
