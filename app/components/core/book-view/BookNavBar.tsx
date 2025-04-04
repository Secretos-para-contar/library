import { useState } from "react"
import { useNavigate } from "@remix-run/react"
import { Bookmark, ChevronLeft, Heart, Share2, X } from "lucide-react"
import { motion } from "framer-motion"

import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { useAuthStore } from "../../../stores/useAuthStore"

import {
  SearchBarProps,
  BookmarkButtonProps,
  BookNavBarProps,
  LikeButtonProps,
  ShareDropdownProps,
} from "./IBookNavBar"

import UserMenu from "../NavBar/UserMenu"

function LikeButton({ liked, onClick, disabled }: LikeButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      disabled={disabled}
      className="cursor-pointer"
    >
      <motion.div
        animate={
          liked
            ? { scale: [1, 1.4, 1], rotate: [0, 10, -10, 0], opacity: [0.8, 1] }
            : {}
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Heart
          className={`h-5 w-5 transition-colors ${
            liked ? "fill-red-500 text-red-500" : ""
          }`}
        />
      </motion.div>
    </Button>
  )
}

function BookmarkButton({
  bookmarked,
  onClick,
  disabled,
}: BookmarkButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      disabled={disabled}
      className="cursor-pointer"
    >
      <Bookmark
        className={`h-5 w-5 ${bookmarked ? "fill-primary text-primary" : ""}`}
      />
    </Button>
  )
}

function ShareDropdown({ isOpen, setIsOpen }: ShareDropdownProps) {
  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        <Share2 className="h-5 w-5" />
      </Button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border z-20"
        >
          <ul className="py-2 text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Compartir por correo
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Compartir por WhatsApp
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Copiar enlace
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  )
}

function SearchBar({ visible, onClose }: SearchBarProps) {
  if (!visible) return null
  return (
    <div className="border-t bg-card p-2 flex items-center gap-2">
      <Input placeholder="Buscar en el libro..." value="" className="flex-1" />
      <Button variant="outline" size="sm">
        Buscar
      </Button>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function BookNavBarView({ bookTitle, bookAuthor }: BookNavBarProps) {
  const navigate = useNavigate()
  const { isAauthenticated } = useAuthStore()

  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)
  const [showShare, setShowShare] = useState(false)

  return (
    <header className="bg-card border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-1 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-accent cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-[10px] sm:text-lg  font-semibold truncate max-w-md">
              {bookTitle ?? "Título desconocido"}
            </h1>
            <p className="text-[8px] sm:text-sm text-muted-foreground">
              {bookAuthor ?? "Autor desconocido"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-0 sm:gap-2">
          <LikeButton
            liked={liked}
            onClick={() => setLiked(!liked)}
            disabled={!isAauthenticated}
          />
          <BookmarkButton
            bookmarked={bookmarked}
            onClick={() => setBookmarked(!bookmarked)}
            disabled={!isAauthenticated}
          />
          <ShareDropdown isOpen={showShare} setIsOpen={setShowShare} />

          <div className={`${isAauthenticated ? "mr-[-30px]" : ""}`}>
            <UserMenu />
          </div>
        </div>
      </div>

      <SearchBar
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
      />
    </header>
  )
}
