import { ComponentProps, ReactNode } from "react"
import { twMerge } from "tailwind-merge";

interface Props extends Omit<ComponentProps<'div'>, 'children'> {
  Graphic: ReactNode;
  title: string;
  desc: string;
}
export function AttributeBox(props: Props) {
  const { className, Graphic, title, desc, ...rest } = props;
  return (
    <div className={twMerge("flex flex-col justify-center items-center p-10 gap-6 rounded-3xl text-stone-800 shadow-2xl", className)} {...rest}>
      <div className="flex flex-col justify-center items-center max-w-1/2 p-6 bg-black/5 rounded-lg">
        {Graphic}
      </div>
      <span className="font-bold text-2xl text-center">{title}</span>
      <span className="font-light text-base text-center">{desc}</span>
    </div>
  )
}