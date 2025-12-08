import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image, ArrowRight, X, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadStepProps {
  onNext: () => void;
}

interface UploadedImage {
  id: string;
  name: string;
  size: string;
  url: string;
}

const MIN_IMAGES = 3;
const MAX_IMAGES = 100;

export function UploadStep({ onNext }: UploadStepProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;

    const newImages: UploadedImage[] = [];
    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];

    Array.from(files).forEach((file) => {
      if (!allowedTypes.includes(file.type)) return;
      if (file.size > 10 * 1024 * 1024) return; // 10MB limit

      newImages.push({
        id: crypto.randomUUID(),
        name: file.name,
        size: formatFileSize(file.size),
        url: URL.createObjectURL(file),
      });
    });

    setImages((prev) => {
      const combined = [...prev, ...newImages];
      return combined.slice(0, MAX_IMAGES);
    });
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.url);
      return prev.filter((i) => i.id !== id);
    });
  };

  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.url));
    setImages([]);
  };

  const canProceed = images.length >= MIN_IMAGES;
  const isAtMax = images.length >= MAX_IMAGES;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-full flex flex-col p-6"
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold mb-2">Upload Images</h1>
        <p className="text-muted-foreground">
          Select {MIN_IMAGES} to {MAX_IMAGES} images to compare and find matching features
        </p>
      </div>

      {/* Upload Area */}
      <motion.div
        whileHover={{ scale: 1.005 }}
        className="glass-card-hover p-6 mb-6"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !isAtMax && fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-4 
            transition-all cursor-pointer min-h-[180px]
            ${isDragging 
              ? 'border-primary bg-primary/10 scale-[1.02]' 
              : isAtMax 
                ? 'border-muted cursor-not-allowed opacity-50' 
                : 'border-border hover:border-primary/50'
            }
          `}
        >
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
            isDragging ? 'bg-primary/20' : 'bg-primary/10'
          }`}>
            <Upload className={`w-8 h-8 transition-colors ${isDragging ? 'text-primary' : 'text-primary/70'}`} />
          </div>
          <div className="text-center">
            <p className="font-medium mb-1">
              {isAtMax ? 'Maximum images reached' : 'Drag & drop or click to upload'}
            </p>
            <p className="text-sm text-muted-foreground">
              PNG, JPG, WEBP up to 10MB each
            </p>
          </div>
        </div>
      </motion.div>

      {/* Image Count & Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">
            {images.length} / {MAX_IMAGES} images
          </span>
          {images.length > 0 && images.length < MIN_IMAGES && (
            <div className="flex items-center gap-1 text-amber-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Need at least {MIN_IMAGES - images.length} more</span>
            </div>
          )}
          {canProceed && (
            <div className="flex items-center gap-1 text-emerald-500 text-sm">
              <Check className="w-4 h-4" />
              <span>Ready to process</span>
            </div>
          )}
        </div>
        {images.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll} className="text-destructive hover:text-destructive">
            Clear All
          </Button>
        )}
      </div>

      {/* Image Preview Grid */}
      <div className="flex-1 overflow-auto">
        {images.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Image className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p>No images uploaded yet</p>
              <p className="text-sm">Upload at least {MIN_IMAGES} images to continue</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            <AnimatePresence mode="popLayout">
              {images.map((img, index) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="relative group aspect-square rounded-xl overflow-hidden bg-muted border border-border"
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2">
                    <p className="text-xs text-white truncate w-full text-center mb-1">{img.name}</p>
                    <p className="text-xs text-white/70">{img.size}</p>
                  </div>

                  {/* Index Badge */}
                  <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary/90 text-primary-foreground text-xs flex items-center justify-center font-medium">
                    {index + 1}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(img.id);
                    }}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive/90 text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className={`w-2 h-2 rounded-full ${canProceed ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
          {canProceed ? 'Ready to process' : `Select ${MIN_IMAGES - images.length} more image${MIN_IMAGES - images.length > 1 ? 's' : ''}`}
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="glass" 
            size="lg"
            onClick={() => fileInputRef.current?.click()}
            disabled={isAtMax}
          >
            Add More Images
          </Button>
          <Button 
            variant="neon" 
            size="lg" 
            onClick={onNext}
            disabled={!canProceed}
          >
            Start Processing
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
