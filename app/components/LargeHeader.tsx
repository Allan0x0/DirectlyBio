import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface Props extends ComponentProps<'span'> {
}
export function LargeHeader(props: Props) {
 const { children, className, ...rest } = props
 return (
  <span className={twMerge("text-4xl md:text-5xl lg:text-6xl tracking-wide text-black font-black leading-tight md:leading-tight lg:leading-tight", className)} {...rest}>
    {children}
  </span>
 )
}