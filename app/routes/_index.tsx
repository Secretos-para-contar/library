import type { MetaFunction } from "@remix-run/node"
import { AppLayout } from "~/components/core/Layouts/AppLayout"
import { HeroSection } from "~/components/core/Landing-view/HeroSection"
import { ProgramasSection } from "~/components/core/Landing-view/ProgramasSection"
import { ContenidoRecomendadoSection } from "~/components/core/Landing-view/ContenidoRecomendadoSection"
import { EstadisticasSection } from "~/components/core/Landing-view/EstadisticasSection"

export const meta: MetaFunction = () => {
  return [
    { title: "Secretos para contar G3 Tesla" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export default function Index() {
  return (
    <AppLayout>
      <HeroSection />
      <ProgramasSection />
      <ContenidoRecomendadoSection />
      <EstadisticasSection />
    </AppLayout>
  );
}

