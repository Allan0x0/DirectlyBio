export enum UploadState {
  Uploading = 'uploading',
  Uploaded = 'uploaded',
  Error = 'error',
  Idle = 'idle',
}

export interface ImageUploadResult {
  publicId: string;
  url: string;
  height: number;
  width: number;
}
