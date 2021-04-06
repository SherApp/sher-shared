export interface Upload {
  id: string;
  name: string;
  size: number;
  progress: number;
  error?: boolean;
  success?: boolean;
}
