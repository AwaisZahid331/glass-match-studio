import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageGrid } from '@/components/shared/ImageGrid';
import { useCompare } from '@/contexts/CompareContext';

interface MyImagesStepProps {
  onNext: () => void;
  onAddMore: () => void;
}

export function MyImagesStep({ onNext, onAddMore }: MyImagesStepProps) {
  const { images, removeImage } = useCompare();
  const [currentPage, setCurrentPage] = useState(1);

  const IMAGES_PER_PAGE = 10;
  const canProceed = images.length >= 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-full flex flex-col p-6"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold mb-2">My Images</h1>
          <p className="text-muted-foreground">
            {images.length} images uploaded · Hover to delete unwanted images
          </p>
        </div>
        <Button variant="glass" onClick={onAddMore}>
          <Upload className="w-4 h-4 mr-2" />
          Add More Images
        </Button>
      </div>

      {/* Image Grid */}
      <div className="flex-1 overflow-hidden">
        {images.length > 0 ? (
          <ImageGrid
            images={images}
            onRemove={removeImage}
            imagesPerPage={IMAGES_PER_PAGE}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
                <ImageIcon className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-4">No images uploaded yet</p>
              <Button onClick={onAddMore}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Images
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className={`w-2 h-2 rounded-full ${canProceed ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
          {canProceed ? 'Ready to process' : `Need at least ${3 - images.length} more image${3 - images.length > 1 ? 's' : ''}`}
        </div>
        
        <Button 
          variant="neon" 
          size="lg" 
          onClick={onNext}
          disabled={!canProceed}
        >
          Next: Start Processing
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}
