import React, { createContext, useState, useContext } from 'react';

interface PhotoContextType {
  photos: string[];
  addPhoto: (uri: string) => void;
  removePhoto: (index: number) => void;
  clearPhotos: () => void;
  message: string;
  setMessage: (text: string) => void;
}

const PhotoContext = createContext<PhotoContextType | null>(null);

export const PhotoProvider: React.FC<{children: React.ReactNode}> = ({ children }: { children: React.ReactNode }) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const addPhoto = (uri: string) => {
    if (photos.length < 5) {
      setPhotos([...photos, uri]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const clearPhotos = () => setPhotos([]);

  return (
    <PhotoContext.Provider value={{ 
      photos, 
      addPhoto, 
      removePhoto, 
      clearPhotos,
      message,
      setMessage
    }}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotoContext = () => useContext(PhotoContext)!;