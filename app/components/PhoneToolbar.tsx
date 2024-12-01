import { IconMenu2, IconShare } from "@tabler/icons-react"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface Props extends Omit<ComponentProps<'div'>, 'children'> {
}
export function PhoneToolbar(props: Props) {
  const { className, ...rest } = props
  return (
    <div className={twMerge("flex flex-row items-stretch px-4", className)} {...rest}>
      <IconShare size={20} />
      <div className='grow' />
      <IconMenu2 size={20} />
    </div>
  )
}