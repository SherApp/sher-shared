let documentTypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
];

export const getFileKindFromContentType = (contentType: string) => {
  let kind = FileKind.Unknown;

  if (contentType.startsWith('image/')) {
    kind = FileKind.Image;
  } else if (documentTypes.includes(contentType)) {
    kind = FileKind.Document;
  } else if (contentType.startsWith('audio/')) {
    kind = FileKind.Audio;
  } else if (contentType.startsWith('video/')) {
    kind = FileKind.Video;
  }

  return kind;
};

export enum FileKind {
  Unknown,
  Image,
  Audio,
  Video,
  Document
}
