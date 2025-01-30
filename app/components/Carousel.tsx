interface Props {
  items: {
    label: string;
    image: string;
  }[];
}
export function Carousel({ items }: Props) {
  return (
    <div className="overflow-x-auto whitespace-nowrap">
      {items.map((item, index) => (
        <div
          key={index}
          className="inline-block w-48 overflow-hidden mx-2 bg-white text-center leading-[6rem] border border-gray-300 rounded-md"
        >
          <img src={item.image} alt="Thumbnail" className="w-full" />
          {item.label && (
            <p className="text-center text-xs p-2 py-3">{item.label}</p>
          )}
        </div>
      ))}
    </div>
  );
}
