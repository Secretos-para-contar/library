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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip"
import { motion } from "framer-motion"
import { Link } from "@remix-run/react"

interface BookCardProps {
  id: string | number
  title: string
  author: string
  publisher: string
  coverImage: string
  summary: string
  tags: string[]
  rating?: number
  year?: number
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

  const truncatedSummary =
    summary.length > 150 && !expanded
      ? summary.substring(0, 150) + "..."
      : summary

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <Card className="overflow-hidden border-slate-200 hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col md:flex-row gap-6 p-6">
          <div className="relative min-w-[140px] md:min-w-[180px] h-[220px] md:h-[260px] rounded-md overflow-hidden group">
            <img
              src={coverImage || "/placeholder.svg"}
              alt={`Portada de ${title}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white cursor-pointer"
                      onClick={() => setLiked(!liked)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          liked ? "fill-red-500 text-red-500" : "text-slate-600"
                        }`}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Me gusta</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white cursor-pointer"
                      onClick={() => setSaved(!saved)}
                    >
                      <Bookmark
                        className={`h-4 w-4 ${
                          saved ? "fill-primary text-primary" : "text-slate-600"
                        }`}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Guardar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white cursor-pointer"
                    >
                      <Share2 className="h-4 w-4 text-slate-600" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Compartir</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {year && (
              <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {year}
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col">
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
              <div className="text-sm text-slate-500">
                Editorial: {publisher}
              </div>
            </CardHeader>

            <CardContent className="p-0 py-3">
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

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
            </CardContent>

            <CardFooter className="p-0 pt-3 mt-auto">
              <div className="flex flex-wrap gap-2">
                <Button className="gap-2 cursor-pointer">
                  <Download className="h-4 w-4" />
                  Descargar
                </Button>
                <Button variant="outline" className="gap-2 cursor-pointer">
                  <FileText className="h-4 w-4" />
                  Ver PDF
                </Button>
                <Button variant="outline" className="gap-2 cursor-pointer">
                  <Headphones className="h-4 w-4" />
                  Audiolibro
                </Button>
              </div>
            </CardFooter>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
