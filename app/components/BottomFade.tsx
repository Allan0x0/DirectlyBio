import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface Props extends ComponentProps<'div'> {
}
export function BottomFade(props: Props) {
  const { className, children, ...rest } = props;
  return (
    <div className={twMerge("absolute bottom-0 h-2/3 w-full bg-gradient-to-t from-purple-300 to-transparent", className)} {...rest}>
      {children}
    </div>
  )
}