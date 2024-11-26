import { useState } from 'react';

import { UploadState } from '~/models/cloudinary';
import { getErrorMessage } from '~/models/errors';

import { useCloudinaryUpload } from './useUploadToCloudinary';

export function useUploadImage(initImageId: string) {
  const uploadToCloudinary = useCloudinaryUpload();

  const [imageId, setImageId] = useState(initImageId || '');
  const [uploadState, setUploadState] = useState(UploadState.Idle);
  const [error, setError] = useState('');

  async function uploadImage(file: File) {
    try {
      setError('');
      setImageId('');
      setUploadState(UploadState.Uploading);

      if (file.size > 5_000_000) {
        throw new Error(`Provice an image less than 5MB in size`);
      }

      const result = await uploadToCloudinary(file);
      if (result instanceof Error) {
        throw result;
      }
      setImageId(result.publicId);
      setUploadState(UploadState.Uploaded);
      setError('');
      return result.publicId;
    } catch (error) {
      setUploadState(UploadState.Error);
      setError(getErrorMessage(error) || 'Upload failed, please try again');
    }
  }

  return { imageId, uploadState, error, uploadImage };
}
