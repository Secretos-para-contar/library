import { SiteHeader } from "../NavBar/NavBar"
import { HeroSection } from "../Landing-view/HeroSection"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  )
}
