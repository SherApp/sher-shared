export type UploadStatus = 'uploading' | 'success' | 'cancelled' | 'error';

export interface Upload {
  key: string;
  url?: string;
  name: string;
  size: number;
  progress: number;
  status: UploadStatus;
  directoryId: string;
}
