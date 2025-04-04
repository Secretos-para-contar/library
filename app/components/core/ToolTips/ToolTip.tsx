import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css" // Importar los estilos

interface TooltipProps {
  content: string
  children: React.ReactNode
}

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <>
      {content ? (
        <Tippy content={content} delay={[0, 100]} animation="fade">
          <span>{children}</span>
        </Tippy>
      ) : (
        <span>{children}</span>
      )}
    </>
  )
}
