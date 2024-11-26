import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface Props extends Omit<ComponentProps<'div'>, 'children'> {
}
export function Ornament(props: Props) {
 const { className, ...rest } = props
 return (
  <div className={twMerge("bg-purple-600 h-4 w-16", className)} {...rest} />
 )
}