import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<'div'> {
}
export function FadablePhone(props: Props) {
  const { className, children, ...rest } = props;
  return (
    <div className={twMerge("bg-black/10 rounded-t-[3rem] aspect-[2/3] border-[8px] border-b-0 border-stone-600 py-4", className)} {...rest}>
      {children}
    </div>
  )
}