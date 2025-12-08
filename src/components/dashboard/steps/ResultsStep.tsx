import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Download, FileJson, Eye, Flame, Columns, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ResultsStepProps {
  onNext: () => void;
  onBack: () => void;
}

const tabs = [
  { id: 'lines', name: 'Match Lines', icon: Eye },
  { id: 'heatmap', name: 'Heatmap', icon: Flame },
  { id: 'sidebyside', name: 'Side-by-Side', icon: Columns },
];

export function ResultsStep({ onNext, onBack }: ResultsStepProps) {
  const [activeTab, setActiveTab] = useState('lines');

  // Dummy keypoints for visualization
  const keypoints = [
    { x1: 20, y1: 30, x2: 75, y2: 35 },
    { x1: 35, y1: 45, x2: 60, y2: 50 },
    { x1: 50, y1: 25, x2: 45, y2: 30 },
    { x1: 25, y1: 60, x2: 70, y2: 65 },
    { x1: 45, y1: 70, x2: 55, y2: 75 },
    { x1: 60, y1: 40, x2: 40, y2: 45 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-full flex flex-col p-6"
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold mb-2">Results Preview</h1>
        <p className="text-muted-foreground">
          Review the matching results and keypoint analysis
        </p>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Main Preview Area */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="flex items-center gap-2 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </div>

          {/* Preview Content */}
          <div className="flex-1 glass-card p-4 relative overflow-hidden">
            {activeTab === 'lines' && (
              <div className="h-full flex gap-4">
                {/* Image 1 */}
                <div className="flex-1 relative bg-muted/50 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-3 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Eye className="w-10 h-10 text-primary/50" />
                      </div>
                      <span className="text-sm">Source Image</span>
                    </div>
                  </div>
                  
                  {/* Keypoint dots */}
                  {keypoints.map((kp, i) => (
                    <motion.div
                      key={`kp1-${i}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="absolute w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50"
                      style={{ left: `${kp.x1}%`, top: `${kp.y1}%` }}
                    />
                  ))}
                </div>

                {/* Connection Lines (SVG overlay would go here in real implementation) */}
                <div className="w-16 flex items-center justify-center">
                  <div className="h-full w-px bg-gradient-to-b from-primary via-secondary to-primary opacity-30" />
                </div>

                {/* Image 2 */}
                <div className="flex-1 relative bg-muted/50 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-3 rounded-2xl bg-secondary/10 flex items-center justify-center">
                        <Eye className="w-10 h-10 text-secondary/50" />
                      </div>
                      <span className="text-sm">Target Image</span>
                    </div>
                  </div>
                  
                  {/* Keypoint dots */}
                  {keypoints.map((kp, i) => (
                    <motion.div
                      key={`kp2-${i}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      className="absolute w-3 h-3 rounded-full bg-secondary shadow-lg shadow-secondary/50"
                      style={{ left: `${kp.x2}%`, top: `${kp.y2}%` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'heatmap' && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-destructive/20 flex items-center justify-center">
                    <Flame className="w-12 h-12 text-primary/50" />
                  </div>
                  <p className="text-muted-foreground">Heatmap visualization</p>
                  <p className="text-sm text-muted-foreground/60">Showing similarity density</p>
                </div>
              </div>
            )}

            {activeTab === 'sidebyside' && (
              <div className="h-full grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Columns className="w-12 h-12 mx-auto mb-2 text-primary/50" />
                    <span className="text-sm text-muted-foreground">Source</span>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Columns className="w-12 h-12 mx-auto mb-2 text-secondary/50" />
                    <span className="text-sm text-muted-foreground">Target</span>
                  </div>
                </div>
              </div>
            )}

            {/* Fullscreen button */}
            <button className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-muted/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="w-72 shrink-0 flex flex-col gap-4">
          {/* Similarity Score */}
          <div className="glass-card p-6">
            <h3 className="text-sm text-muted-foreground mb-2">Similarity Score</h3>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-display font-bold text-primary neon-text">87.4</span>
              <span className="text-lg text-muted-foreground mb-1">%</span>
            </div>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '87.4%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-primary to-secondary"
              />
            </div>
          </div>

          {/* Matched Points */}
          <div className="glass-card p-6">
            <h3 className="text-sm text-muted-foreground mb-2">Matched Points</h3>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-display font-bold text-secondary neon-text-purple">247</span>
              <span className="text-lg text-muted-foreground mb-1">/ 312</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">79.2% keypoints matched</p>
          </div>

          {/* Confidence */}
          <div className="glass-card p-6">
            <h3 className="text-sm text-muted-foreground mb-2">Confidence Score</h3>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-display font-bold text-primary">High</span>
            </div>
            <div className="flex gap-1 mt-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full ${
                    i <= 4 ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Export Buttons */}
          <div className="space-y-2">
            <Button variant="glass" size="lg" className="w-full" disabled>
              <Download className="w-4 h-4" />
              Download Result
            </Button>
            <Button variant="glass" size="lg" className="w-full" disabled>
              <FileJson className="w-4 h-4" />
              Export JSON
            </Button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-between">
        <Button variant="ghost" size="lg" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <Button variant="neon" size="lg" onClick={onNext}>
          Next: Save & History
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}
