export interface UserFile {
  id: string;
  fileName: string;
  slug: string;
  length: number;
  isDeleted: boolean;
}

export interface FetchFilesCriteria {
  requiredFileNamePart?: string;
}
