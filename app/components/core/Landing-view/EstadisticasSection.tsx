import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUsers, faChalkboardTeacher, faBookReader } from '@fortawesome/free-solid-svg-icons';

export function EstadisticasSection() {
  const estadisticas = [
    {
      id: 1,
      image: "https://secretosparacontar.org/wp-content/uploads/2023/12/icono-1.webp",
      numero: "8.014.628",
      descripcion: "Materiales entregados"
    },
    {
      id: 2,
      image: "https://secretosparacontar.org/wp-content/uploads/2023/12/icono-2.webp",
      numero: "519.000",
      descripcion: "Familias beneficiarias"
    },
    {
      id: 3,
      image: "https://secretosparacontar.org/wp-content/uploads/2023/12/icono-3.webp",
      numero: "12.000",
      descripcion: "Maestros capacitados"
    },
    {
      id: 4,
      image: "https://secretosparacontar.org/wp-content/uploads/2023/12/icono-4.webp",
      numero: "22.390",
      descripcion: "Talleres de promoción de lectura"
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-xs uppercase tracking-wider text-gray-600 text-center font-semibold mb-1">IMPACTO</h2>
        <h3 className="text-2xl font-medium text-center mb-8">Hasta el momento hemos logrado</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {estadisticas.map(estadistica => (
            <div key={estadistica.id} className="bg-white p-8 rounded-lg shadow-md text-center hover:-translate-y-1 hover:shadow-lg transition-transform">
              <img 
                  src={estadistica.image} 
                  alt={estadistica.descripcion}
                  className="text-blue-800 text-5xl mb-4" />
              <h4 className="text-3xl font-bold text-blue-800 mb-2">
                {estadistica.numero}
              </h4>
              <p className="text-gray-600">{estadistica.descripcion}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            to="/estadisticas" 
            className="inline-block bg-orange-600 hover:bg-orange-700 transition-colors text-white px-6 py-3 rounded font-semibold uppercase"
          >
            Ver más información
          </Link>
        </div>
      </div>
    </section>
  );
}