
import { fill } from '@cloudinary/url-gen/actions/resize';
import { IconUser } from '@tabler/icons-react';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { useCloudinary } from './CloudinaryContextProvider';

interface Props extends ComponentProps<'div'> {
  imageUrl: string | undefined;
  imageId: string | undefined;
  fullName: string | undefined;
  large?: boolean;
}
export function ProfilePicture(props: Props) {
  const {
    imageUrl: initImageUrl,
    imageId,
    fullName = '',
    large,
    className,
    ...rest
  } = props;

  const { CloudinaryUtil } = useCloudinary();

  const imageUrl = !imageId
    ? initImageUrl || ''
    : CloudinaryUtil.image(imageId)
        .resize(
          fill()
            .aspectRatio('1:1')
            .width(large ? 360 : 72)
            .height(large ? 360 : 72),
        )
        .format('auto')
        .quality('auto')
        .toURL();

  return (
    <div
      className={twMerge(
        'flex flex-col justify-center items-center',
        className,
      )}
      {...rest}
    >
      {imageUrl ? <img
          src={imageUrl}
          alt={fullName}
          className={twMerge(
            'h-12 w-12 rounded-full object-cover',
            large && 'w-48 h-48',
          )}
        /> : null}
      {!imageUrl ? <div
          className={twMerge(
            'bg-purple-600 rounded-full h-12 w-12 flex flex-col justify-center items-center',
            large && 'w-48 h-48',
          )}
        >
          <IconUser className="text-xl font-semibold text-black" />
        </div> : null}
    </div>
  );
}
