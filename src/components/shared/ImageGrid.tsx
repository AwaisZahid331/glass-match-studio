import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { UploadedImage } from '@/contexts/CompareContext';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface ImageGridProps {
  images: UploadedImage[];
  onRemove?: (id: string) => void;
  readonly?: boolean;
  imagesPerPage?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function ImageGrid({
  images,
  onRemove,
  readonly = false,
  imagesPerPage = 10,
  currentPage,
  onPageChange,
}: ImageGridProps) {
  const totalPages = Math.ceil(images.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = images.slice(startIndex, endIndex);

  const getVisiblePages = () => {
    const pages: number[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= Math.min(maxVisible, totalPages); i++) pages.push(i);
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) pages.push(i);
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Image Grid - 2 per row */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {currentImages.map((img, index) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative group aspect-video rounded-xl overflow-hidden bg-muted border border-border"
              >
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                  <p className="text-sm text-white truncate w-full text-center mb-1 font-medium">{img.name}</p>
                  <p className="text-xs text-white/70">{img.size}</p>
                </div>

                {/* Index Badge */}
                <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-primary/90 text-primary-foreground text-xs font-medium">
                  #{startIndex + index + 1}
                </div>

                {/* Delete Button - Only on hover and if not readonly */}
                {!readonly && onRemove && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(img.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {images.length === 0 && (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <p>No images to display</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pt-6 border-t border-border mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {getVisiblePages().map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => onPageChange(page)}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext
                  onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          
          <p className="text-center text-sm text-muted-foreground mt-2">
            Page {currentPage} of {totalPages} · {images.length} images total
          </p>
        </div>
      )}
    </div>
  );
}
