import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBookOpen, faNewspaper } from '@fortawesome/free-solid-svg-icons';

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] bg-cover bg-center" style={{ backgroundImage: 'url("https://secretosparacontar.org/wp-content/uploads/2024/03/Banner-inicio-2.webp")' }}>
      {/* Overlay oscuro para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Contenido del hero */}
      <div className="relative px-4 md:px-8 pt-36 pb-24 text-white">
        <div className="container mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Lectura y educación para el campo</h1>
            <p className="text-lg md:text-xl mb-8">
              Llegamos hasta los pliegues más apartados de las montañas y los recodos escondidos de los ríos, para compartir sonrisas, alegrías y nuevas experiencias con las familias del campo.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/donar" className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 hover:bg-orange-700 transition-colors rounded-md font-semibold text-sm uppercase">
                <FontAwesomeIcon icon={faHeart} className="mr-2" />
                Apoya una familia
              </Link>
              <Link to="/materiales" className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 hover:bg-orange-700 transition-colors rounded-md font-semibold text-sm uppercase">
                <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
                Nuestro material
              </Link>
              <Link to="/noticias" className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 hover:bg-orange-700 transition-colors rounded-md font-semibold text-sm uppercase">
                <FontAwesomeIcon icon={faNewspaper} className="mr-2" />
                Noticias
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}