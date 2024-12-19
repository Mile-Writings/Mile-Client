export const convertImageToWebP = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    const blobUrl = URL.createObjectURL(file);
    img.src = blobUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob(async (blob) => {
        if (blob) {
          resolve(blob);

          //메모리에 참조하고 있는 Blob객체를 지워 명시적으로 해제시키는 과정을 통해 js gc동작하도록 함
          URL.revokeObjectURL(blobUrl);
        } else {
          reject(new Error('Image conversion failed'));
        }
      }, 'image/webp');
    };
    img.onerror = reject;
  });
};
