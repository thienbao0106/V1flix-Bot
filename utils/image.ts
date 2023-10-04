export const getImage = (images: any, type: string): string => {
  return images.find((image: any) => image.type === type);
};
