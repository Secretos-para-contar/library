import { Outlet } from "@remix-run/react"
// import { AnimatePresence, motion } from "framer-motion"
// import { useEffect, useState } from "react"

export default function Index() {
  // const [isTransitioning, setIsTransitioning] = useState(false)

  // useEffect(() => {
  //   setIsTransitioning(true)
  //   setTimeout(() => {
  //     setIsTransitioning(false)
  //   }, 2000)
  // }, [])
  return (
    <>
      <Outlet />
      {/* <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-[#003865] z-50"
            initial={{ scaleX: 0, originX: 0.5 }}
            animate={{ scaleX: 1, originX: 0.5 }}
            exit={{ scaleX: 0, originX: 0.5 }}
            transition={{ duration: 0.6, ease: "easeIn" }}
          />
        )}
      </AnimatePresence> */}
    </>
  )
}
