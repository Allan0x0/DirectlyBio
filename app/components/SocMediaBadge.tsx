import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge";

export function SocMediaBadge(props: ComponentProps<'div'>) {
 const { className, children, ...rest } = props;
 return (
  <div className={twMerge("flex bg-white shadow-normal flex-col justify-center items-center rounded-full p-4 border border-stone-400", className)} {...rest}>
    {children}
  </div>
 )
}