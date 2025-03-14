import { useState } from "react"
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

export function SearchBar() {
  const [, setViewMode] = useState<"grid" | "list">("list")

  return (
    <div className="container mx-auto py-8 -z-[]">
      <div className="bg-slate-50 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Buscar por título, autor o palabra clave..."
              className="pl-10 bg-white"
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="relevance">
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
            Mostrando <span className="font-medium">2</span> resultados
          </p>
          <Tabs
            defaultValue="list"
            onValueChange={(value) => setViewMode(value as "grid" | "list")}
          >
            <TabsList className="bg-white">
              <TabsTrigger value="grid">
                <Grid3X3 className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
