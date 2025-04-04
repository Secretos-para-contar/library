import React from 'react';
import { Link } from 'react-router-dom';

export function ProgramasSection() {
  const programas = [
    {
      id: 1,
      image: "https://secretosparacontar.org/wp-content/uploads/2024/04/Secretos-en-red-inicio.webp",
      tag: "Lectura",
      title: "Promoción de lectura",
      description: "Espacios físicos y digitales que ayudan a las familias y habitantes campesinos de la región, con cursos de lectura, capacitación y fomento de la educación",
      
    },
    {
      id: 2,
      image: "https://secretosparacontar.org/wp-content/uploads/2024/11/IMG_7185-scaled.jpg",
      tag: "Lectura",
      title: "Secretos en red",
      description: "Espacios físicos y digitales que ayudan a las familias y habitantes campesinos de la región, con cursos de lectura, capacitación y fomento de la educación",
      
    },
    {
      id: 3,
      image: "https://secretosparacontar.org/wp-content/uploads/2024/04/ERA-inicio-2.webp",
      tag: "Lectura",
      title: "Alianza ERA",
      description: "Espacios físicos y digitales que ayudan a las familias y habitantes campesinos de la región, con cursos de lectura, capacitación y fomento de la educación",
     
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-xs uppercase tracking-wider text-gray-600 text-center font-semibold mb-1">Programas</h2>
        <h3 className="text-2xl font-medium text-center mb-8">Llegamos a través de:</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programas.map(programa => (
            <div key={programa.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="relative h-48">
                <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs font-semibold px-2 py-1 rounded z-10">
                  {programa.tag}
                </div>
                <img 
                  src={programa.image} 
                  alt={programa.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h4 className="text-xl text-blue-800 font-medium mb-3">{programa.title}</h4>
                <p className="text-gray-600 text-sm mb-5">{programa.description}</p>
                <div className="flex items-center mb-4">
                  
                </div>
                <Link 
                  to={`/programa/${programa.id}`} 
                  className="block text-center border border-orange-600 text-orange-600 px-4 py-2 rounded text-sm font-semibold transition-colors hover:bg-orange-600 hover:text-white"
                >
                  Leer el artículo completo
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}