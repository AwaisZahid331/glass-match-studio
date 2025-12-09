import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCompare, UploadedImage } from '@/contexts/CompareContext';

interface NewCompareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

const MIN_IMAGES = 3;
const MAX_IMAGES = 100;

export function NewCompareModal({ open, onOpenChange, onComplete }: NewCompareModalProps) {
  const { addImages, clearImages } = useCompare();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [localImages, setLocalImages] = useState<UploadedImage[]>([]);
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
      if (file.size > 10 * 1024 * 1024) return;

      newImages.push({
        id: crypto.randomUUID(),
        name: file.name,
        size: formatFileSize(file.size),
        url: URL.createObjectURL(file),
      });
    });

    setLocalImages((prev) => {
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

  const removeLocalImage = (id: string) => {
    setLocalImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.url);
      return prev.filter((i) => i.id !== id);
    });
  };

  const handleCreate = () => {
    if (localImages.length >= MIN_IMAGES && name.trim()) {
      clearImages();
      addImages(localImages);
      setLocalImages([]);
      setName('');
      setDescription('');
      onOpenChange(false);
      onComplete();
    }
  };

  const canCreate = localImages.length >= MIN_IMAGES && name.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">New Comparison</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="compare-name">Comparison Name *</Label>
            <Input
              id="compare-name"
              placeholder="e.g., Product Photos Batch 1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="compare-desc">Description (optional)</Label>
            <Textarea
              id="compare-desc"
              placeholder="Add notes about this comparison..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          {/* Upload Area */}
          <div className="space-y-2">
            <Label>Upload Images ({MIN_IMAGES}-{MAX_IMAGES})</Label>
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
              onClick={() => fileInputRef.current?.click()}
              className={`
                border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
                ${isDragging 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:border-primary/50'
                }
              `}
            >
              <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
              <p className="font-medium">Drag & drop or click to upload</p>
              <p className="text-sm text-muted-foreground">PNG, JPG, WEBP up to 10MB each</p>
            </div>
          </div>

          {/* Image Count */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">
              {localImages.length} / {MAX_IMAGES} images
            </span>
            {localImages.length > 0 && localImages.length < MIN_IMAGES && (
              <div className="flex items-center gap-1 text-amber-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Need at least {MIN_IMAGES - localImages.length} more</span>
              </div>
            )}
          </div>

          {/* Preview Grid */}
          {localImages.length > 0 && (
            <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
              {localImages.map((img) => (
                <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden">
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeLocalImage(img.id);
                    }}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!canCreate}>
              Create & Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
