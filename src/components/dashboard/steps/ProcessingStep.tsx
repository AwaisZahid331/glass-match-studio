import { motion } from 'framer-motion';
import { Zap, Target, Brain, Layers, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ProcessingStepProps {
  onNext: () => void;
  onBack: () => void;
}

const methods = [
  {
    id: 'orb',
    name: 'Fast (ORB)',
    icon: Zap,
    description: 'Oriented FAST and Rotated BRIEF. Best for quick comparisons with good accuracy.',
    speed: 'Very Fast',
    accuracy: 'Good',
    color: 'primary',
  },
  {
    id: 'akaze',
    name: 'Accurate (AKAZE)',
    icon: Target,
    description: 'Accelerated KAZE algorithm. Excellent for detailed feature matching.',
    speed: 'Medium',
    accuracy: 'Excellent',
    color: 'secondary',
  },
  {
    id: 'clip',
    name: 'Deep Model (CLIP)',
    icon: Brain,
    description: 'Neural network-based matching. Best for semantic similarity detection.',
    speed: 'Slower',
    accuracy: 'Superior',
    color: 'primary',
  },
  {
    id: 'hybrid',
    name: 'Hybrid Mode',
    icon: Layers,
    description: 'Combines multiple algorithms for the most comprehensive analysis.',
    speed: 'Variable',
    accuracy: 'Maximum',
    color: 'secondary',
  },
];

export function ProcessingStep({ onNext, onBack }: ProcessingStepProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [threshold, setThreshold] = useState(75);
  const [keypoints, setKeypoints] = useState(500);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-full flex flex-col p-6"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold mb-2">Processing Options</h1>
        <p className="text-muted-foreground">
          Select the matching algorithm that best fits your needs
        </p>
      </div>

      {/* Method Cards */}
      <div className="flex-1 grid md:grid-cols-2 gap-4 overflow-y-auto">
        {methods.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedMethod(method.id)}
            className={`glass-card p-6 cursor-pointer transition-all duration-300 ${
              selectedMethod === method.id
                ? method.color === 'primary'
                  ? 'border-primary/50 shadow-[0_0_30px_hsl(var(--primary)/0.2)]'
                  : 'border-secondary/50 shadow-[0_0_30px_hsl(var(--secondary)/0.2)]'
                : 'hover:border-border/80'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  method.color === 'primary' ? 'bg-primary/10' : 'bg-secondary/10'
                }`}
              >
                <method.icon
                  className={`w-6 h-6 ${
                    method.color === 'primary' ? 'text-primary' : 'text-secondary'
                  }`}
                />
              </div>
              {selectedMethod === method.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    method.color === 'primary' ? 'bg-primary' : 'bg-secondary'
                  }`}
                >
                  <Check className="w-4 h-4 text-primary-foreground" />
                </motion.div>
              )}
            </div>

            <h3 className="text-lg font-display font-semibold mb-2">{method.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{method.description}</p>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Speed:</span>
                <span className={method.color === 'primary' ? 'text-primary' : 'text-secondary'}>
                  {method.speed}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Accuracy:</span>
                <span className={method.color === 'primary' ? 'text-primary' : 'text-secondary'}>
                  {method.accuracy}
                </span>
              </div>
            </div>

            {/* Sliders (shown when selected) */}
            {selectedMethod === method.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 pt-4 border-t border-border space-y-4"
              >
                {/* Threshold Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Threshold</span>
                    <span className="text-sm font-medium">{threshold}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary/25"
                  />
                </div>

                {/* Keypoints Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Max Keypoints</span>
                    <span className="text-sm font-medium">{keypoints}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="100"
                    value={keypoints}
                    onChange={(e) => setKeypoints(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary/25"
                  />
                </div>

                <Button
                  variant={method.color === 'primary' ? 'neon' : 'neon-purple'}
                  size="lg"
                  className="w-full mt-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                  }}
                >
                  Use This Method
                </Button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-between">
        <Button variant="ghost" size="lg" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="flex items-center gap-3">
          <Button variant="neon" size="lg" onClick={onNext} disabled={!selectedMethod}>
            Next: Results
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
