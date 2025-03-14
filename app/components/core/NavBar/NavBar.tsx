import { Link } from "@remix-run/react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu"

import UserMenu from "./UserMenu"

export function SiteHeader() {
  return (
    <header>
      <div className="bg-[#5F8DB5] h-7"></div>

      <nav className="bg-[#003865] h-20 flex justify-between items-center">
        <div className="flex items-center justify-between h-full px-4">
          <Link to={"/"} className="text-white">
            <img
              src="/20-blanco.png"
              alt="logo de secretos para contar"
              width={100}
            />
          </Link>
        </div>

        <NavigationMenu className="text-white">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                Contenidos
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link to={"/books"} className="h-full">
                        Books
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to={"/books"}>Books</Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to={"/books"}>Books</Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to={"/books"}>Books</Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to={"/books"}>
                <NavigationMenuLink className="bg-transparent">
                  Documentacion
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <UserMenu />
      </nav>
    </header>
  )
}
