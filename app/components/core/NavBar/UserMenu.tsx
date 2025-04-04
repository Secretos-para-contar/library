import { Link } from "@remix-run/react"
import { useState } from "react"

// Framer Motion animation
import { motion } from "framer-motion"

// Icons
import { Heart, LayoutDashboard, LogOut, Settings, User } from "lucide-react"

// Store
import { useAuthStore } from "~/stores/useAuthStore"

// Components
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Button } from "~/components/ui/button"

const truncateEmail = (email: string) => {
  return email.slice(0, 20) + "..."
}

const options = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    to: "/dashboard",
    isAdminOption: true,
  },
  {
    name: "Libros Favoritos",
    icon: Heart,
    to: "#",
  },
  {
    name: "Configuraciones",
    icon: Settings,
    to: "#",
  },
]

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAauthenticated, login, logout } = useAuthStore()

  return (
    <>
      {isAauthenticated ? (
        <div className="relative z-20 mr-10">
          <Avatar
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer "
          >
            <AvatarImage
              src={user!.img}
              height={45}
              width={45}
              className="rounded-full"
            />
            <AvatarFallback className="text-white">
              {user!.name[0] + user!.name.split(" ")[1][0]}
            </AvatarFallback>
          </Avatar>

          {isOpen && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="absolute right-0 mt-2  bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-48 dark:bg-gray-700 dark:divide-gray-600"
            >
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>
                  {user!.name} •{" "}
                  <span className="text-gray-400">{user!.role}</span>
                </div>
                <div className="font-medium truncate">
                  {user!.email.length > 25
                    ? truncateEmail(user!.email)
                    : user!.email}
                </div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="avatarButton"
              >
                {options
                  .filter(
                    (option) =>
                      !option.isAdminOption ||
                      (option.isAdminOption &&
                        user?.role.toLowerCase() === "admin")
                  )
                  .map((option, index) => (
                    <li key={index}>
                      <Link
                        to={option.to}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => setIsOpen(false)}
                      >
                        <option.icon size={16} className="inline-block mr-2" />
                        {option.name}
                      </Link>
                    </li>
                  ))}
              </ul>
              <div className="py-1">
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={() => {
                    logout()
                    setIsOpen(false)
                  }}
                >
                  <LogOut size={16} className="inline-block mr-2" />
                  Sign out
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="flex items-center mr-8">
          <Button
            className="text-white bg-[#FA4616] hover:bg-[#FF5722] cursor-pointer "
            onClick={() => {
              login({
                name: "John Doe",
                email: "dmartinet1@gmail.com",
                role: "Admin",
                img: "https://lh3.googleusercontent.com/ogw/AF2bZygrpWFigA8ktr7zFjTONjwpJmSc_eo3AwIFXwXTFBNpC8k=s64-c-mo",
              })
            }}
          >
            <User size={16} className="inline-block" />
            Ingresar
          </Button>
        </div>
      )}
    </>
  )
}
