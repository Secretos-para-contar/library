import { useState } from "react"
import { motion } from "framer-motion"
import {
  Download,
  FileText,
  Headphones,
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Filter,
  Users,
  BookOpen,
  Clock,
  ArrowUpRight,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { LoaderFunction, redirect } from "@remix-run/node"

// Cookies handler
import { CookieParser } from "~/utils/CookiParser"
import { SiteHeader } from "~/components/core/NavBar/NavBar"

// Datos simulados para los gráficos
const monthlyData = [
  { name: "Ene", descargas: 4000, pdfs: 2400, audiolibros: 1800 },
  { name: "Feb", descargas: 3000, pdfs: 1398, audiolibros: 2210 },
  { name: "Mar", descargas: 2000, pdfs: 9800, audiolibros: 2290 },
  { name: "Abr", descargas: 2780, pdfs: 3908, audiolibros: 2000 },
  { name: "May", descargas: 1890, pdfs: 4800, audiolibros: 2181 },
  { name: "Jun", descargas: 2390, pdfs: 3800, audiolibros: 2500 },
  { name: "Jul", descargas: 3490, pdfs: 4300, audiolibros: 2100 },
  { name: "Ago", descargas: 4000, pdfs: 2400, audiolibros: 1800 },
  { name: "Sep", descargas: 3000, pdfs: 1398, audiolibros: 2210 },
  { name: "Oct", descargas: 2000, pdfs: 9800, audiolibros: 2290 },
  { name: "Nov", descargas: 2780, pdfs: 3908, audiolibros: 2000 },
  { name: "Dic", descargas: 1890, pdfs: 4800, audiolibros: 2181 },
]

const categoryData = [
  { name: "Ficción", value: 400 },
  { name: "No Ficción", value: 300 },
  { name: "Académico", value: 300 },
  { name: "Infantil", value: 200 },
  { name: "Poesía", value: 100 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

const recentActivity = [
  {
    id: 1,
    usuario: "María García",
    tipo: "Descarga",
    titulo: "Cien años de soledad",
    fecha: "2023-03-14 14:30",
  },
  {
    id: 2,
    usuario: "Juan Pérez",
    tipo: "PDF",
    titulo: "El amor en los tiempos del cólera",
    fecha: "2023-03-14 13:15",
  },
  {
    id: 3,
    usuario: "Ana Martínez",
    tipo: "Audiolibro",
    titulo: "Don Quijote de la Mancha",
    fecha: "2023-03-14 12:45",
  },
  {
    id: 4,
    usuario: "Carlos López",
    tipo: "Descarga",
    titulo: "La sombra del viento",
    fecha: "2023-03-14 11:20",
  },
  {
    id: 5,
    usuario: "Laura Sánchez",
    tipo: "PDF",
    titulo: "Harry Potter y la piedra filosofal",
    fecha: "2023-03-14 10:05",
  },
]

export const loader: LoaderFunction = async ({ request }) => {
  const cookies = request.headers.get("cookie")

  const cookieObj = CookieParser(cookies || "")

  const token = cookieObj["auth_token"]

  if (!token) {
    return redirect("/books")
  }

  return null
}

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7d")

  // Calcular totales
  const totalDescargas = monthlyData.reduce(
    (sum, item) => sum + item.descargas,
    0
  )
  const totalPDFs = monthlyData.reduce((sum, item) => sum + item.pdfs, 0)
  const totalAudiolibros = monthlyData.reduce(
    (sum, item) => sum + item.audiolibros,
    0
  )

  // Calcular cambios porcentuales (simulados)
  const cambioDescargas = 12.5
  const cambioPDFs = -5.2
  const cambioAudiolibros = 8.7

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  console.log("Dashboard logged in")

  return (
    <>
      <SiteHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Análisis y estadísticas de la biblioteca digital
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Últimas 24 horas</SelectItem>
                <SelectItem value="7d">Últimos 7 días</SelectItem>
                <SelectItem value="30d">Últimos 30 días</SelectItem>
                <SelectItem value="90d">Últimos 90 días</SelectItem>
                <SelectItem value="1y">Último año</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8"
        >
          {/* Tarjeta de Descargas */}
          <motion.div variants={item}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Descargas
                </CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {totalDescargas.toLocaleString()}
                </div>
                <div
                  className={`flex items-center text-sm mt-1 ${
                    cambioDescargas >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {cambioDescargas >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span>
                    {Math.abs(cambioDescargas)}% respecto al período anterior
                  </span>
                </div>
                <div className="mt-4 h-[60px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData.slice(-6)}>
                      <defs>
                        <linearGradient
                          id="colorDescargas"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#0088FE"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#0088FE"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="descargas"
                        stroke="#0088FE"
                        fillOpacity={1}
                        fill="url(#colorDescargas)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tarjeta de PDFs */}
          <motion.div variants={item}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  PDFs Abiertos
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {totalPDFs.toLocaleString()}
                </div>
                <div
                  className={`flex items-center text-sm mt-1 ${
                    cambioPDFs >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {cambioPDFs >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span>
                    {Math.abs(cambioPDFs)}% respecto al período anterior
                  </span>
                </div>
                <div className="mt-4 h-[60px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData.slice(-6)}>
                      <defs>
                        <linearGradient
                          id="colorPDFs"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#00C49F"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#00C49F"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="pdfs"
                        stroke="#00C49F"
                        fillOpacity={1}
                        fill="url(#colorPDFs)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tarjeta de Audiolibros */}
          <motion.div variants={item}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Audiolibros Escuchados
                </CardTitle>
                <Headphones className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {totalAudiolibros.toLocaleString()}
                </div>
                <div
                  className={`flex items-center text-sm mt-1 ${
                    cambioAudiolibros >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {cambioAudiolibros >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span>
                    {Math.abs(cambioAudiolibros)}% respecto al período anterior
                  </span>
                </div>
                <div className="mt-4 h-[60px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData.slice(-6)}>
                      <defs>
                        <linearGradient
                          id="colorAudiolibros"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#FFBB28"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#FFBB28"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="audiolibros"
                        stroke="#FFBB28"
                        fillOpacity={1}
                        fill="url(#colorAudiolibros)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Tendencias por Mes</CardTitle>
              <CardDescription>
                Comparativa de descargas, PDFs abiertos y audiolibros escuchados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="descargas" name="Descargas" fill="#0088FE" />
                    <Bar dataKey="pdfs" name="PDFs Abiertos" fill="#00C49F" />
                    <Bar
                      dataKey="audiolibros"
                      name="Audiolibros"
                      fill="#FFBB28"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribución por Categoría</CardTitle>
              <CardDescription>
                Porcentaje de uso por categoría de contenido
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>
                Últimas interacciones de los usuarios con la biblioteca
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActivity.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium">
                        {activity.usuario}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {activity.tipo === "Descarga" && (
                            <Download className="h-4 w-4 mr-2 text-blue-500" />
                          )}
                          {activity.tipo === "PDF" && (
                            <FileText className="h-4 w-4 mr-2 text-green-500" />
                          )}
                          {activity.tipo === "Audiolibro" && (
                            <Headphones className="h-4 w-4 mr-2 text-amber-500" />
                          )}
                          {activity.tipo}
                        </div>
                      </TableCell>
                      <TableCell>{activity.titulo}</TableCell>
                      <TableCell>{activity.fecha}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="ghost" className="gap-1">
                Ver todas las actividades
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumen General</CardTitle>
              <CardDescription>
                Estadísticas clave de la biblioteca
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Usuarios activos</span>
                  </div>
                  <span className="font-medium">1,245</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Total de libros</span>
                  </div>
                  <span className="font-medium">5,382</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Tiempo promedio</span>
                  </div>
                  <span className="font-medium">18 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Nuevos este mes</span>
                  </div>
                  <span className="font-medium">124</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Tasa de conversión</span>
                  </div>
                  <span className="font-medium">8.5%</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline" className="w-full">
                Ver informe completo
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}
