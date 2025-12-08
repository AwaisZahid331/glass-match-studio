import { motion } from 'framer-motion';
import { Upload, Image, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadStepProps {
  onNext: () => void;
}

export function UploadStep({ onNext }: UploadStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-full flex flex-col p-6"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold mb-2">Upload Images</h1>
        <p className="text-muted-foreground">
          Upload two images to compare and find matching features
        </p>
      </div>

      {/* Upload Areas */}
      <div className="flex-1 grid md:grid-cols-2 gap-6">
        {/* Image 1 */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="glass-card-hover p-6 flex flex-col"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-primary">Image 1</span>
            <span className="text-xs text-muted-foreground">Source</span>
          </div>
          
          <div className="flex-1 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors cursor-pointer min-h-[200px]">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="font-medium mb-1">Drag & drop or click to upload</p>
              <p className="text-sm text-muted-foreground">PNG, JPG, WEBP up to 10MB</p>
            </div>
          </div>

          {/* Placeholder Preview */}
          <div className="mt-4 p-4 bg-muted rounded-xl hidden">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                <Image className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">image1.jpg</div>
                <div className="text-xs text-muted-foreground">2.4 MB</div>
              </div>
              <button className="w-8 h-8 rounded-lg hover:bg-destructive/10 flex items-center justify-center text-destructive transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Image 2 */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="glass-card-hover p-6 flex flex-col"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-secondary">Image 2</span>
            <span className="text-xs text-muted-foreground">Target</span>
          </div>
          
          <div className="flex-1 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-4 hover:border-secondary/50 transition-colors cursor-pointer min-h-[200px]">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
              <Upload className="w-8 h-8 text-secondary" />
            </div>
            <div className="text-center">
              <p className="font-medium mb-1">Drag & drop or click to upload</p>
              <p className="text-sm text-muted-foreground">PNG, JPG, WEBP up to 10MB</p>
            </div>
          </div>

          {/* Placeholder Preview */}
          <div className="mt-4 p-4 bg-muted rounded-xl hidden">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                <Image className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">image2.jpg</div>
                <div className="text-xs text-muted-foreground">1.8 MB</div>
              </div>
              <button className="w-8 h-8 rounded-lg hover:bg-destructive/10 flex items-center justify-center text-destructive transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Ready to upload
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="glass" size="lg">
            Select Images
          </Button>
          <Button variant="neon" size="lg" onClick={onNext}>
            Next: Processing
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
