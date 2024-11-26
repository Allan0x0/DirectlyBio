const MyPage = '/my-page';

export const AppLinks = {
  Home: '/',

  MyPage: {
    Index: MyPage,
    Style: `${MyPage}/style`,
    Stats: `${MyPage}/stats`,
    Settings: `${MyPage}/settings`,
    Upgrade: `${MyPage}/upgrade`,
  },

  PreviewPage: (pageName: string) => `/${pageName}`,

  AddEditPhoto: `/add-edit-photo`,
  DeletePhoto: '/delete-photo',
  SetProfilePicture: '/set-profile-picture',
  SaveSocialMediaLinks: '/save-social-media-links',

  Signup: '/join',
  Login: '/login',
  Logout: '/logout',

  CaptureEmail: '/capture-email',

  Plans: '/plans',
  PrivacyPolicy: 'privacy-policy',
  Terms: '/tos',
  Allan: 'https://allansimoyi.com',
} as const;
