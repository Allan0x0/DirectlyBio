import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';

import AvatarImg from '~/../public/images/avatar.png';
import { Carousel } from '~/components/Carousel';
import { PhoneContainer } from '~/components/PhoneContainer';

// Interface for the profile data
type ProfileData = {
  avatar: string;
  name: string;
  description: string;
  buttons: { label: string }[];
  thumbnails: { image: string; label: string }[];
  cards: { title: string; content: string }[];
};

export function loader() {
  return {
    avatar: AvatarImg,
    name: 'Business Name',
    description: 'Your business tagline or description goes here.',
    buttons: [
      { label: '🌟 Featured Product 🌟' },
      { label: '📌 Latest Updates 📌' },
    ],
    thumbnails: [
      {
        image: 'https://picsum.photos/150/150?random=1',
        label: 'Gallery Item 1',
      },
      {
        image: 'https://picsum.photos/150/150?random=2',
        label: 'Gallery Item 2',
      },
      {
        image: 'https://picsum.photos/150/150?random=1',
        label: 'Gallery Item 1',
      },
      {
        image: 'https://picsum.photos/150/150?random=2',
        label: 'Gallery Item 2',
      },
    ],
    cards: [],
  };
}

export default function LinkInBioPage() {
  const loaderData = useLoaderData<typeof loader>();
  const [profile, setProfile] = useState<ProfileData>(loaderData);

  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleItemChange = (
    type: 'buttons' | 'thumbnails' | 'cards',
    index: number,
    field: string,
    value: string,
  ) => {
    const newItems = [...profile[type]];
    if (newItems[index]) {
      newItems[index] = { ...newItems[index], [field]: value };
    }
    setProfile({ ...profile, [type]: newItems });
  };

  const addItem = (
    type: 'buttons' | 'thumbnails' | 'cards',
    defaultItem: any,
  ) => {
    setProfile({ ...profile, [type]: [...profile[type], defaultItem] });
  };

  const removeItem = (
    type: 'buttons' | 'thumbnails' | 'cards',
    index: number,
  ) => {
    setProfile({
      ...profile,
      [type]: profile[type].filter((_, i) => i !== index),
    });
  };

  return (
    <div className="flex gap-6 h-screen bg-gray-100">
      {/* Preview Section */}
      <div className="w-2/3 flex justify-center rounded-lg p-4">
        <PagePreview profile={profile} />
      </div>

      {/* Settings Section */}
      <div className="w-1/3 overflow-y-auto max-h-full p-6 border rounded-lg bg-white">
        <Editor
          profile={profile}
          handleChange={handleChange}
          handleItemChange={handleItemChange}
          addItem={addItem}
          removeItem={removeItem}
        />
      </div>
    </div>
  );
}

// Props interface for Preview
interface PreviewProps {
  profile: ProfileData;
}

function PagePreview({ profile }: PreviewProps) {
  return (
    <PhoneContainer className="flex flex-col items-stretch overflow-auto">
      <div className="bg-blue-800 h-[128px] w-full shrink-0 shadow-xl" />
      <div className="flex flex-col justify-center items-center -translate-y-1/2">
        <img
          src={profile.avatar}
          alt="Avatar"
          className="w-32 h-32 rounded-full border-2 border-white shadow-xl"
        />
      </div>
      <div className="flex flex-col justify-center items-center -translate-y-16 pt-4 px-4 gap-4">
        <h2 className="font-bold text-2xl">{profile.name}</h2>
        <p className="text-center text-sm text-gray-500 font-light">
          {profile.description}
        </p>
        <div className="mt-4 w-full">
          {profile.buttons.map((button, index) => (
            <button
              key={index}
              className="w-full border border-stone-200 p-2 rounded-md mt-2 bg-white shadow-md"
            >
              {button.label}
            </button>
          ))}
        </div>
        <div className="flex flex-row items-center gap-2 py-4 w-full overflow-x-auto">
          <Carousel items={profile.thumbnails} />
        </div>
        <div className="mt-4 w-full">
          {profile.cards.map((card, index) => (
            <div key={index} className="border p-4 rounded-lg mt-2">
              <h3 className="font-bold">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.content}</p>
            </div>
          ))}
        </div>
      </div>
    </PhoneContainer>
  );
}

// Props interface for Editor
interface EditorProps {
  profile: ProfileData;
  handleChange: (field: keyof ProfileData, value: string) => void;
  handleItemChange: (
    type: 'buttons' | 'thumbnails' | 'cards',
    index: number,
    field: string,
    value: string,
  ) => void;
  addItem: (type: 'buttons' | 'thumbnails' | 'cards', defaultItem: any) => void;
  removeItem: (type: 'buttons' | 'thumbnails' | 'cards', index: number) => void;
}

function Editor({
  profile,
  handleChange,
  handleItemChange,
  addItem,
  removeItem,
}: EditorProps) {
  return (
    <form className="flex flex-col gap-4">
      <label>
        Profile Name:
        <input
          type="text"
          value={profile.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="border p-2 w-full rounded"
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={profile.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="border p-2 w-full rounded"
        />
      </label>
      {(['buttons', 'thumbnails', 'cards'] as const).map((type) => (
        <div key={type}>
          <h3 className="font-bold capitalize">{type}</h3>
          {profile[type].map((item, index) => {
            return (
              <div key={index} className="flex gap-2 mt-2">
                {Object.keys(item).map((field) => (
                  <input
                    key={field}
                    type="text"
                    value={(item as any)[field]}
                    onChange={(e) =>
                      handleItemChange(type, index, field, e.target.value)
                    }
                    className="border p-2 w-full rounded"
                    placeholder={field}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => removeItem(type, index)}
                  className="border p-2 rounded bg-red-500 text-white"
                >
                  Remove
                </button>
              </div>
            );
          })}
          <button
            type="button"
            onClick={() =>
              addItem(
                type,
                type === 'buttons'
                  ? { label: 'New Button' }
                  : type === 'thumbnails'
                    ? {
                        image: 'https://picsum.photos/150',
                        label: 'New Thumbnail',
                      }
                    : { title: 'New Card', content: 'Card Content' },
              )
            }
            className="mt-2 p-2 border rounded bg-blue-500 text-white"
          >
            Add {type.slice(0, -1)}
          </button>
        </div>
      ))}
    </form>
  );
}
