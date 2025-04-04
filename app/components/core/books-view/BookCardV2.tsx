import { useState } from "react"

import {
  Heart,
  Share2,
  Bookmark,
  Star,
  ChevronDown,
  Download,
  FileText,
  Headphones,
} from "lucide-react"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card"

import { motion } from "framer-motion"
import { Link } from "@remix-run/react"
import { useAuthStore } from "~/stores/useAuthStore"

import { Tooltip as OwnToolTip } from "../ToolTips/ToolTip"

// Interfaces
import {
  BookCoverProps,
  BookActionsButtonsProps,
  BookHeaderProps,
  BookSummaryProps,
  BookTagsProps,
  TooltipButtonProps,
} from "./IBooksCardV2"

interface BookCardProps {
  id: string | number
  title: string
  author: string
  publisher: string
  coverImage: string
  summary: string
  tags: string[]
  rating?: number | string
  year?: number | string
}

export function BookCardV2({
  id,
  title,
  author,
  publisher,
  coverImage,
  summary,
  tags,
  rating = 4.5,
  year,
}: BookCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [saved, setSaved] = useState(false)
  const [liked, setLiked] = useState(false)
  const { isAauthenticated } = useAuthStore()

  const truncatedSummary =
    summary.length > 150 && !expanded
      ? `${summary.substring(0, 150)}...`
      : summary

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <Card className="overflow-hidden border-slate-200 hover:shadow-lg transition-shadow duration-300 h-full">
        <div className="flex flex-col md:flex-row gap-6 p-6">
          <BookCover
            coverImage={coverImage}
            title={title}
            year={year || 2025}
            isAuthenticated={isAauthenticated}
            liked={liked}
            saved={saved}
            setLiked={setLiked}
            setSaved={setSaved}
          />

          <div className="flex-1 flex flex-col">
            <BookHeader
              id={id}
              title={title}
              author={author}
              publisher={publisher}
              rating={rating}
            />
            <BookTags tags={tags} />
            <BookSummary
              summary={summary}
              truncatedSummary={truncatedSummary}
              expanded={expanded}
              setExpanded={setExpanded}
            />
            <BookActions isAuthenticated={isAauthenticated} />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

const BookCover = ({
  coverImage,
  title,
  year,
  isAuthenticated,
  liked,
  saved,
  setLiked,
  setSaved,
}: BookCoverProps) => (
  <div className="relative min-w-[140px] md:min-w-[180px] h-[220px] md:h-[260px] rounded-md overflow-hidden group">
    <img
      src={coverImage || "/placeholder.svg"}
      alt={`Portada de ${title}`}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    {isAuthenticated && (
      <BookActionsButtons
        liked={liked}
        saved={saved}
        setLiked={setLiked}
        setSaved={setSaved}
      />
    )}
    {year && (
      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
        {year}
      </div>
    )}
  </div>
)

const BookActionsButtons = ({
  liked,
  saved,
  setLiked,
  setSaved,
}: BookActionsButtonsProps) => (
  <div className="absolute top-2 right-2 flex flex-col gap-2">
    <TooltipButton
      icon={Heart}
      tooltip=""
      active={liked}
      onClick={() => setLiked(!liked)}
    />
    <TooltipButton
      icon={Bookmark}
      tooltip=""
      active={saved}
      onClick={() => setSaved(!saved)}
    />
    <TooltipButton
      icon={Share2}
      tooltip=""
      active={false}
      onClick={function (): void {
        throw new Error("Function not implemented.")
      }}
    />
  </div>
)

const TooltipButton = ({
  icon: Icon,
  tooltip = "",
  active,
  onClick,
}: TooltipButtonProps & {
  icon: React.ComponentType<{ className?: string }>
}) => (
  <>
    {tooltip ? (
      <OwnToolTip content={tooltip}>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white cursor-pointer"
          onClick={onClick}
        >
          <Icon
            className={`h-4 w-4 ${
              active ? "fill-primary text-primary" : "text-slate-600"
            }`}
          />
        </Button>
      </OwnToolTip>
    ) : (
      <Button
        variant="secondary"
        size="icon"
        className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white cursor-pointer"
        onClick={onClick}
      >
        <Icon
          className={`h-4 w-4 ${
            active ? "fill-primary text-primary" : "text-slate-600"
          }`}
        />
      </Button>
    )}
  </>
)

const BookHeader = ({
  id,
  title,
  author,
  publisher,
  rating,
}: BookHeaderProps) => (
  <CardHeader className="p-0 pb-2 space-y-1">
    <div className="flex justify-between items-start">
      <Link
        to={`/book/${id}`}
        className="text-xl font-bold text-slate-800 hover:text-primary transition-colors hover:underline"
      >
        {title}
      </Link>
      <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded text-amber-600">
        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
        <span className="text-sm font-medium">{rating}</span>
      </div>
    </div>
    <div className="text-slate-600">
      por: <span className="font-medium">{author}</span>
    </div>
    <div className="text-sm text-slate-500">Editorial: {publisher}</div>
  </CardHeader>
)

const BookTags = ({ tags }: BookTagsProps) => (
  <CardContent className="p-0 py-3">
    <div className="flex flex-wrap gap-2 mb-3">
      {tags.map((tag: string, index: number) => (
        <Badge
          key={index}
          variant="secondary"
          className="bg-slate-100 hover:bg-slate-200 text-slate-700"
        >
          {tag}
        </Badge>
      ))}
    </div>
  </CardContent>
)

const BookSummary = ({
  summary,
  truncatedSummary,
  expanded,
  setExpanded,
}: BookSummaryProps) => (
  <div className="text-sm text-slate-700">
    <p>{truncatedSummary}</p>
    {summary.length > 150 && (
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-primary hover:text-primary/80 font-medium mt-1 flex items-center"
      >
        {expanded ? "Leer menos" : "Leer más"}
        <ChevronDown
          className={`ml-1 h-4 w-4 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>
    )}
  </div>
)

const BookActions = ({ isAuthenticated }: { isAuthenticated: boolean }) => (
  <CardFooter className="p-0 pt-3 mt-auto gap-3">
    <OwnToolTip content={isAuthenticated ? "" : "Inicia sesión para descargar"}>
      <Button
        className="gap-2 cursor-pointer"
        disabled={!isAuthenticated}
        variant="primary"
      >
        <Download className="h-4 w-4" />
        Descargar
      </Button>
    </OwnToolTip>

    <Button variant="secundary" className="gap-2 cursor-pointer">
      <FileText className="h-4 w-4" />
      Ver PDF
    </Button>
    <Button variant="outline" className="gap-2 cursor-pointer">
      <Headphones className="h-4 w-4" />
      Audiolibro
    </Button>
  </CardFooter>
)
