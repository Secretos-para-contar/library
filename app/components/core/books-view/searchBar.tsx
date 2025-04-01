import { useEffect, useState } from "react"
import { Search, Filter, Grid3X3, List } from "lucide-react"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"

// States stores
import { useBooksLayoutStore } from "~/stores/useBooksLayout"
import { useBookStore } from "~/stores/useBookStore"

interface SearchBarProps {
  results: string | number
}

const putSearchTerm = (searchTerm: string) => {
  useBookStore.setState((state) => ({
    searchFilters: {
      ...state.searchFilters,
      searchTerm,
    },
  }))
}

export function SearchBar({ results }: SearchBarProps) {
  const [viewMode, setViewMode] = useState<
    "grid grid-cols-2" | "flex flex-col"
  >(useBooksLayoutStore.getState().display)

  const { orderBy, searchFilters } = useBookStore()

  useEffect(() => {
    useBooksLayoutStore.setState({ display: viewMode })
    orderBy(searchFilters.order.toUpperCase())
  }, [viewMode, orderBy, searchFilters.order])

  return (
    <div className="container mx-auto py-8 -z-[]">
      <div className="bg-slate-50 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Buscar por título, autor o palabra clave..."
              className="pl-10 bg-white"
              onChange={(e) => {
                putSearchTerm(e.target.value)
              }}
              value={useBookStore.getState().searchFilters.searchTerm}
            />
          </div>
          <div className="flex gap-2">
            <Select
              defaultValue={searchFilters.order.toLowerCase()}
              onValueChange={(value) => {
                orderBy(value.toUpperCase())
                useBookStore.setState((state) => {
                  return {
                    searchFilters: {
                      ...state.searchFilters,
                      order: value,
                    },
                  }
                })
              }}
            >
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevancia</SelectItem>
                <SelectItem value="newest">Más recientes</SelectItem>
                <SelectItem value="oldest">Más antiguos</SelectItem>

                <SelectItem value="a-z">A-Z</SelectItem>
                <SelectItem value="z-a">Z-A</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-white">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-slate-600">
            Mostrando <span className="font-medium">{results}</span> resultados
          </p>
          <Tabs
            defaultValue={viewMode}
            onValueChange={(value) =>
              setViewMode(value as "grid grid-cols-2" | "flex flex-col")
            }
          >
            <TabsList className="bg-white">
              <TabsTrigger value="grid grid-cols-2" className="cursor-pointer">
                <Grid3X3 className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="flex flex-col" className="cursor-pointer">
                <List className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
