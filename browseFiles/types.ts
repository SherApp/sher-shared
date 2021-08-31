export interface UserFile {
  id: string;
  fileName: string;
  contentType: string;
  slug: string;
  length: number;
  isDeleted: boolean;
}

export interface FetchFilesCriteria {
  requiredFileNamePart?: string;
}

export interface Directory {
  id: string;
  parentDirectoryId?: string;
  name: string;
  files: UserFile[];
  directories: Directory[];
  path: DirectorySummary[];
  isDeleted?: boolean;
}

export type DirectorySummary = Pick<
  Directory,
  'id' | 'parentDirectoryId' | 'name'
>;

export interface CreateDirectoryRequest {
  id: string;
  name: string;
  parentDirectoryId?: string;
}
