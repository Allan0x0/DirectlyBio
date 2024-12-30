import TemplateBg from '~/../public/images/template_bg.png';
import { CardHeader } from '~/components/CardHeader';
import { CenteredText } from '~/components/CenteredText';
import { ProfilePic } from '~/components/ProfilePic';
import { StandardCard } from '~/components/StandardCard';
import { ThumbnailCard } from '~/components/ThumbnailCard';

export default function Test() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center overflow-auto">
      <div
        className="w-[370px] gap-4 flex flex-col items-stretch py-8 bg-cover bg-center rounded-lg p-4"
        style={{ backgroundImage: `url(${TemplateBg})` }}
      >
        <div className="flex flex-col justify-center items-center">
          <ProfilePic
            image={{
              src: 'https://d3rq6m369s8u39.cloudfront.net/upload/vPSfauEpgv6.png',
              alt: 'Allan',
            }}
            borders={{ width: 2, color: 'white', shadow: 2 }}
          />
        </div>
        <CenteredText
          borders={{ width: 1, shadow: 4 }}
          spacing={{ px: 6, py: 2 }}
          title={{ content: '❤️ Vintage finds ❤️' }}
          desc={{ content: 'Description goes here' }}
        />
        <CardHeader
          image={{
            src: 'https://d3rq6m369s8u39.cloudfront.net/upload/vPSfauEpgv6.png',
          }}
          borders={{ width: 1, shadow: 2 }}
          spacing={{ px: 2, py: 2 }}
          title={{ content: 'Vintage finds' }}
          desc={{ content: 'Description goes here' }}
        />
        <StandardCard
          image={{
            src: 'https://d3rq6m369s8u39.cloudfront.net/upload/vPSfauEpgv6.png',
          }}
          borders={{ width: 1, shadow: 4 }}
          spacing={{ px: 2, py: 2 }}
          title={{ content: 'Vintage finds' }}
          desc={{ content: 'Description goes here' }}
        />
        <ThumbnailCard
          image={{
            src: 'https://d3rq6m369s8u39.cloudfront.net/upload/vPSfauEpgv6.png',
          }}
          borders={{ width: 1, shadow: 4 }}
          spacing={{ px: 2, py: 2 }}
          title={{ content: 'Vintage finds' }}
        />
      </div>
    </div>
  );
}
