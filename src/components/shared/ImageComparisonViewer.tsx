import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useCompare } from '@/contexts/CompareContext';

interface Keypoint {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  confidence: number;
  color: string;
}

// Generate random keypoints for demo
const generateKeypoints = (count: number): Keypoint[] => {
  const colors = [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(142, 76%, 36%)',
    'hsl(38, 92%, 50%)',
    'hsl(280, 87%, 65%)',
    'hsl(199, 89%, 48%)',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x1: 10 + Math.random() * 80,
    y1: 10 + Math.random() * 80,
    x2: 10 + Math.random() * 80,
    y2: 10 + Math.random() * 80,
    confidence: 0.6 + Math.random() * 0.4,
    color: colors[i % colors.length],
  }));
};

interface ImageComparisonViewerProps {
  sourceImage?: string;
  targetImage?: string;
}

export function ImageComparisonViewer({ sourceImage, targetImage }: ImageComparisonViewerProps) {
  const { images } = useCompare();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [keypoints] = useState(() => generateKeypoints(12));

  // Use first two uploaded images if available
  const img1 = sourceImage || images[0]?.url;
  const img2 = targetImage || images[1]?.url;

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const imageWidth = (dimensions.width - 100) / 2; // Gap in middle for lines
  const imageHeight = dimensions.height;

  // Calculate actual pixel positions for keypoints
  const getLeftPoint = (kp: Keypoint) => ({
    x: (kp.x1 / 100) * imageWidth,
    y: (kp.y1 / 100) * imageHeight,
  });

  const getRightPoint = (kp: Keypoint) => ({
    x: imageWidth + 100 + (kp.x2 / 100) * imageWidth,
    y: (kp.y2 / 100) * imageHeight,
  });

  return (
    <div ref={containerRef} className="w-full h-full relative flex">
      {/* Source Image */}
      <div 
        className="relative bg-muted/30 rounded-xl overflow-hidden border border-border"
        style={{ width: imageWidth, height: imageHeight }}
      >
        {img1 ? (
          <img src={img1} alt="Source" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <span className="text-sm">Source Image</span>
          </div>
        )}
        
        {/* Keypoint markers on source */}
        {keypoints.map((kp) => {
          const pos = getLeftPoint(kp);
          const isHovered = hoveredPoint === kp.id;
          return (
            <motion.div
              key={`left-${kp.id}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isHovered ? 1.5 : 1, 
                opacity: 1,
              }}
              transition={{ delay: kp.id * 0.05, duration: 0.3 }}
              onMouseEnter={() => setHoveredPoint(kp.id)}
              onMouseLeave={() => setHoveredPoint(null)}
              className="absolute cursor-pointer z-10"
              style={{
                left: pos.x - 6,
                top: pos.y - 6,
              }}
            >
              <div 
                className="w-3 h-3 rounded-full border-2 border-white shadow-lg"
                style={{ 
                  backgroundColor: kp.color,
                  boxShadow: isHovered 
                    ? `0 0 20px ${kp.color}, 0 0 40px ${kp.color}` 
                    : `0 0 10px ${kp.color}`,
                }}
              />
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-5 left-1/2 -translate-x-1/2 bg-background/95 backdrop-blur px-2 py-1 rounded text-xs whitespace-nowrap border border-border"
                >
                  Point #{kp.id + 1} · {(kp.confidence * 100).toFixed(0)}%
                </motion.div>
              )}
            </motion.div>
          );
        })}
        
        {/* Label */}
        <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-primary/90 text-primary-foreground text-sm font-medium">
          Source
        </div>
      </div>

      {/* Connection Lines SVG */}
      <svg 
        className="absolute inset-0 pointer-events-none z-20"
        width={dimensions.width}
        height={dimensions.height}
      >
        <defs>
          {keypoints.map((kp) => (
            <linearGradient 
              key={`gradient-${kp.id}`} 
              id={`line-gradient-${kp.id}`}
              x1="0%" y1="0%" x2="100%" y2="0%"
            >
              <stop offset="0%" stopColor={kp.color} />
              <stop offset="100%" stopColor={kp.color} stopOpacity="0.5" />
            </linearGradient>
          ))}
        </defs>
        
        {keypoints.map((kp) => {
          const left = getLeftPoint(kp);
          const right = getRightPoint(kp);
          const isHovered = hoveredPoint === kp.id;
          
          // Create curved path
          const midX = (left.x + right.x) / 2;
          const controlY = Math.min(left.y, right.y) - 30;
          
          return (
            <motion.g key={`line-${kp.id}`}>
              {/* Connection line */}
              <motion.path
                d={`M ${left.x} ${left.y} Q ${midX} ${controlY} ${right.x} ${right.y}`}
                fill="none"
                stroke={`url(#line-gradient-${kp.id})`}
                strokeWidth={isHovered ? 3 : 1.5}
                strokeDasharray={isHovered ? "0" : "4 4"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: isHovered ? 1 : 0.6,
                }}
                transition={{ 
                  delay: kp.id * 0.08, 
                  duration: 0.8,
                  ease: "easeOut",
                }}
              />
              
              {/* Animated dot along path when hovered */}
              {isHovered && (
                <motion.circle
                  r="4"
                  fill={kp.color}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <animateMotion
                    dur="1.5s"
                    repeatCount="indefinite"
                    path={`M ${left.x} ${left.y} Q ${midX} ${controlY} ${right.x} ${right.y}`}
                  />
                </motion.circle>
              )}
            </motion.g>
          );
        })}
      </svg>

      {/* Gap indicator */}
      <div className="w-[100px] flex items-center justify-center relative">
        <div className="absolute inset-y-0 w-px left-1/2 bg-gradient-to-b from-transparent via-border to-transparent" />
        <div className="bg-background/80 backdrop-blur px-3 py-2 rounded-lg border border-border text-xs text-muted-foreground">
          {keypoints.length} matches
        </div>
      </div>

      {/* Target Image */}
      <div 
        className="relative bg-muted/30 rounded-xl overflow-hidden border border-border"
        style={{ width: imageWidth, height: imageHeight }}
      >
        {img2 ? (
          <img src={img2} alt="Target" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <span className="text-sm">Target Image</span>
          </div>
        )}
        
        {/* Keypoint markers on target */}
        {keypoints.map((kp) => {
          const pos = getRightPoint(kp);
          const isHovered = hoveredPoint === kp.id;
          return (
            <motion.div
              key={`right-${kp.id}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isHovered ? 1.5 : 1, 
                opacity: 1,
              }}
              transition={{ delay: kp.id * 0.05 + 0.3, duration: 0.3 }}
              onMouseEnter={() => setHoveredPoint(kp.id)}
              onMouseLeave={() => setHoveredPoint(null)}
              className="absolute cursor-pointer z-10"
              style={{
                left: pos.x - imageWidth - 100 - 6,
                top: pos.y - 6,
              }}
            >
              <div 
                className="w-3 h-3 rounded-full border-2 border-white shadow-lg"
                style={{ 
                  backgroundColor: kp.color,
                  boxShadow: isHovered 
                    ? `0 0 20px ${kp.color}, 0 0 40px ${kp.color}` 
                    : `0 0 10px ${kp.color}`,
                }}
              />
            </motion.div>
          );
        })}
        
        {/* Label */}
        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-secondary/90 text-secondary-foreground text-sm font-medium">
          Target
        </div>
      </div>
    </div>
  );
}
