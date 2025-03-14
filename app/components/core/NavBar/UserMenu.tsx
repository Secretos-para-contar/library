import { Link } from "@remix-run/react"

import { useState } from "react"

import { motion } from "framer-motion"
import { Heart, LayoutDashboard, LogOut, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

const truncateEmail = (email: string) => {
  return email.slice(0, 20) + "..."
}

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const user = {
    name: "Danniel Martinez",
    email: "dmartinet1@eafit.edu.co",
    role: "Admin",
    img: "https://lh3.googleusercontent.com/a/ACg8ocI6vYPffnv2-9DjqHt-kTgvuMAiq26Re6pNarw6-hZKJFwrRCKO=s331-c-no",
  }

  return (
    <div className="relative z-20 mr-10">
      <Avatar onClick={() => setIsOpen(!isOpen)} className="cursor-pointer ">
        <AvatarImage
          src={user.img}
          height={45}
          width={45}
          className="rounded-full"
        />
        <AvatarFallback className="text-white">
          {user.name[0] + user.name.split(" ")[1][0]}
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
              {user.name} • <span className="text-gray-400">{user.role}</span>
            </div>
            <div className="font-medium truncate">
              {user.email.length > 25 ? truncateEmail(user.email) : user.email}
            </div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="avatarButton"
          >
            <li>
              <Link
                to="/dashboard"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <LayoutDashboard size={16} className="inline-block mr-2" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <Heart size={16} className="inline-block mr-2" />
                Libros Favoritos
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <Settings size={16} className="inline-block mr-2" />
                Configuraciones
              </Link>
            </li>
          </ul>
          <div className="py-1">
            <Link
              to="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              <LogOut size={16} className="inline-block mr-2" />
              Sign out
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  )
}
