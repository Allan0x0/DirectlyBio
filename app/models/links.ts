export const AppLinks = {
  Home: '/',

  PreviewPage: (pageName: string) => `/${pageName}`,

  AddEditPhoto: `/add-edit-photo`,
  DeletePhoto: '/delete-photo',
  SetProfilePicture: '/set-profile-picture',
  SaveSocialMediaLinks: '/save-social-media-links',

  Join: '/join',
  Login: '/login',
  Logout: '/logout',

  Onboarding: {
    ChoooseTemplate: '/choose-template',
  },

  CaptureEmail: '/capture-email',

  Plans: '/plans',
  PrivacyPolicy: '/privacy-policy',
  Terms: '/tos',
  Allan: 'https://allansimoyi.com',
} as const;
