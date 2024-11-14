"use client"

import { useState, useEffect } from "react"
import { Bell, BookOpen, Calculator, ChevronDown, FileText, Folder, HelpCircle, Home, LogOut, Mail, Settings, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Course {
  code: string
  name: string
  credits: number
  semester: number
  grades: {
    p1: number
    p2: number
    p3: number
    ex: number
  }
}

export default function DivisitPortalV4() {
  const [courses, setCourses] = useState<Course[]>([
    { code: "1155101-A", name: "CÁLCULO DIFERENCIAL", credits: 4, semester: 1, grades: { p1: 0, p2: 0, p3: 0, ex: 0 } },
    { code: "1155102-B", name: "FÍSICA MECÁNICA", credits: 4, semester: 1, grades: { p1: 0, p2: 0, p3: 0, ex: 0 } },
    { code: "1155103-C", name: "INTRODUCCIÓN A LA INGENIERÍA DE SISTEMAS", credits: 2, semester: 1, grades: { p1: 0, p2: 0, p3: 0, ex: 0 } },
  ])

  const [averageGrade, setAverageGrade] = useState(0)

  const handleGradeChange = (courseIndex: number, gradeType: keyof Course['grades'], value: string) => {
    const newCourses = [...courses]
    newCourses[courseIndex].grades[gradeType] = parseFloat(value) || 0
    setCourses(newCourses)
  }

  const calculateFinalGrade = (grades: Course['grades']) => {
    const { p1, p2, p3, ex } = grades
    return (p1 * 0.3 + p2 * 0.3 + p3 * 0.3 + ex * 0.1)
  }

  useEffect(() => {
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0)
    const weightedSum = courses.reduce((sum, course) => sum + calculateFinalGrade(course.grades) * course.credits, 0)
    setAverageGrade(weightedSum / totalCredits)
  }, [courses])

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-[#D9230F] text-white p-2 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">ESTUDIANTES</h1>
          <Button variant="ghost" size="sm" className="ml-2 text-white hover:bg-[#AA1C0C]">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <Bell className="h-5 w-5" />
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>ES</AvatarFallback>
          </Avatar>
          <span className="text-sm">Estudiante UFPS</span>
          <LogOut className="h-5 w-5" />
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-white shadow-md">
          <nav className="p-4 space-y-1">
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
              <User className="mr-2 h-4 w-4" />
              Información Estudiantil
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
              <FileText className="mr-2 h-4 w-4" />
              Política de Gratuidad
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
              <BookOpen className="mr-2 h-4 w-4" />
              Normatividad
            </Button>
            <Button variant="ghost" className="w-full justify-start text-[#D9230F] hover:bg-gray-100">
              <Folder className="mr-2 h-4 w-4" />
              Información Académica
            </Button>
            <Button variant="ghost" className="w-full justify-start ml-4 text-gray-700 hover:bg-gray-100">
              Materias
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
              <HelpCircle className="mr-2 h-4 w-4" />
              Consultas
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
              <Settings className="mr-2 h-4 w-4" />
              Matrícula Académica
            </Button>
          </nav>
        </aside>
        <main className="flex-1 p-6 overflow-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Información Académica</h2>
            <p className="text-gray-600 mb-4 text-sm">Consulte sus materias matriculadas, materias no matriculadas, cursos de formación y módulos</p>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Materias Matriculadas</h3>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">Materia</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">Nombre</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">Ver Clases</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">Asistencia</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">Matriculada</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">Créditos</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">Semestre</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">1P</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">2P</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">3P</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">EX</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">DEF</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course, index) => (
                  <TableRow key={course.code}>
                    <TableCell className="text-sm">{course.code.split('-')[0]}</TableCell>
                    <TableCell className="text-sm">{course.name}</TableCell>
                    <TableCell><Button variant="ghost" size="sm"><Mail className="h-4 w-4 text-blue-500" /></Button></TableCell>
                    <TableCell><Button variant="ghost" size="sm"><Calculator className="h-4 w-4 text-green-500" /></Button></TableCell>
                    <TableCell className="text-sm">{course.code}</TableCell>
                    <TableCell className="text-sm">{course.credits}</TableCell>
                    <TableCell className="text-sm">{course.semester}</TableCell>
                    <TableCell className="text-sm">{course.grades.p1.toFixed(1)}</TableCell>
                    <TableCell className="text-sm">{course.grades.p2.toFixed(1)}</TableCell>
                    <TableCell className="text-sm">{course.grades.p3.toFixed(1)}</TableCell>
                    <TableCell className="text-sm">{course.grades.ex.toFixed(1)}</TableCell>
                    <TableCell className="text-sm font-semibold">{calculateFinalGrade(course.grades).toFixed(1)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Calculadora de notas</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Promedio General</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-2">{averageGrade.toFixed(2)}</div>
                    <Progress value={averageGrade * 20} className="w-full" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Ingrese sus notas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs">Código</TableHead>
                          <TableHead className="text-xs">1P</TableHead>
                          <TableHead className="text-xs">2P</TableHead>
                          <TableHead className="text-xs">3P</TableHead>
                          <TableHead className="text-xs">EX</TableHead>
                          <TableHead className="text-xs">DEF</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {courses.map((course, index) => (
                          <TableRow key={course.code}>
                            <TableCell className="text-sm font-medium">{course.code}</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                className="w-12 text-sm"
                                value={course.grades.p1}
                                onChange={(e) => handleGradeChange(index, 'p1', e.target.value)}
                                min="0"
                                max="5"
                                step="0.1"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                className="w-12 text-sm"
                                value={course.grades.p2}
                                onChange={(e) => handleGradeChange(index, 'p2', e.target.value)}
                                min="0"
                                max="5"
                                step="0.1"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                className="w-12 text-sm"
                                value={course.grades.p3}
                                onChange={(e) => handleGradeChange(index, 'p3', e.target.value)}
                                min="0"
                                max="5"
                                step="0.1"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                className="w-12 text-sm"
                                value={course.grades.ex}
                                onChange={(e) => handleGradeChange(index, 'ex', e.target.value)}
                                min="0"
                                max="5"
                                step="0.1"
                              />
                            </TableCell>
                            <TableCell className="text-sm font-semibold">
                              {calculateFinalGrade(course.grades).toFixed(1)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}