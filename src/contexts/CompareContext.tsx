import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface UploadedImage {
  id: string;
  name: string;
  size: string;
  url: string;
}

export interface Comparison {
  id: string;
  name: string;
  description: string;
  images: UploadedImage[];
  createdAt: Date;
}

interface CompareContextType {
  images: UploadedImage[];
  comparisons: Comparison[];
  currentComparison: Comparison | null;
  addImages: (newImages: UploadedImage[]) => void;
  removeImage: (id: string) => void;
  clearImages: () => void;
  createComparison: (name: string, description: string) => void;
  setCurrentComparison: (comparison: Comparison | null) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [comparisons, setComparisons] = useState<Comparison[]>([]);
  const [currentComparison, setCurrentComparison] = useState<Comparison | null>(null);

  const addImages = useCallback((newImages: UploadedImage[]) => {
    setImages((prev) => {
      const combined = [...prev, ...newImages];
      return combined.slice(0, 100);
    });
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.url);
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const clearImages = useCallback(() => {
    images.forEach((img) => URL.revokeObjectURL(img.url));
    setImages([]);
  }, [images]);

  const createComparison = useCallback((name: string, description: string) => {
    const newComparison: Comparison = {
      id: crypto.randomUUID(),
      name,
      description,
      images: [...images],
      createdAt: new Date(),
    };
    setComparisons((prev) => [newComparison, ...prev]);
    setCurrentComparison(newComparison);
  }, [images]);

  return (
    <CompareContext.Provider
      value={{
        images,
        comparisons,
        currentComparison,
        addImages,
        removeImage,
        clearImages,
        createComparison,
        setCurrentComparison,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
