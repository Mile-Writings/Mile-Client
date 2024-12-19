export type FileType = File | null | Blob;

export type HandleImageUploadTypes = {
  url: string;
  fileName: string;
  imageFile: FileType;
  imageUrl: string | undefined;
};

export type DirectToS3Types = Omit<HandleImageUploadTypes, 'imageUrl'>;
