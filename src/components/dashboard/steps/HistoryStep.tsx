import { motion } from 'framer-motion';
import { ArrowLeft, Image, Clock, RotateCcw, Trash2, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HistoryStepProps {
  onBack: () => void;
}

const historyItems = [
  {
    id: 1,
    name: 'Beach Sunset Comparison',
    date: 'Dec 8, 2024',
    time: '2:34 PM',
    similarity: 92.3,
    method: 'CLIP',
  },
  {
    id: 2,
    name: 'Product Photo Match',
    date: 'Dec 8, 2024',
    time: '11:20 AM',
    similarity: 78.5,
    method: 'ORB',
  },
  {
    id: 3,
    name: 'Portrait Analysis',
    date: 'Dec 7, 2024',
    time: '4:15 PM',
    similarity: 95.1,
    method: 'AKAZE',
  },
  {
    id: 4,
    name: 'Architecture Detection',
    date: 'Dec 7, 2024',
    time: '10:00 AM',
    similarity: 67.8,
    method: 'Hybrid',
  },
  {
    id: 5,
    name: 'Logo Similarity Check',
    date: 'Dec 6, 2024',
    time: '3:45 PM',
    similarity: 99.2,
    method: 'CLIP',
  },
];

export function HistoryStep({ onBack }: HistoryStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-full flex flex-col p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold mb-2">Save & History</h1>
          <p className="text-muted-foreground">
            View and manage your past comparisons
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="glass" size="lg">
            <Share2 className="w-4 h-4" />
            Share Results
          </Button>
          <Button variant="neon" size="lg">
            <Download className="w-4 h-4" />
            Export All
          </Button>
        </div>
      </div>

      {/* History Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid gap-4">
          {historyItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card-hover p-4 group"
            >
              <div className="flex items-center gap-4">
                {/* Thumbnail Placeholder */}
                <div className="flex gap-2 shrink-0">
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Image className="w-6 h-6 text-primary/50" />
                  </div>
                  <div className="w-16 h-16 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Image className="w-6 h-6 text-secondary/50" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.date} at {item.time}
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-xs">
                      {item.method}
                    </span>
                  </div>
                </div>

                {/* Similarity Score */}
                <div className="text-right shrink-0">
                  <div className={`text-2xl font-display font-bold ${
                    item.similarity >= 90 ? 'text-primary' : 
                    item.similarity >= 70 ? 'text-secondary' : 'text-muted-foreground'
                  }`}>
                    {item.similarity}%
                  </div>
                  <div className="text-xs text-muted-foreground">Similarity</div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-9 h-9 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-lg bg-muted hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-display font-bold text-primary">{historyItems.length}</div>
          <div className="text-sm text-muted-foreground">Total Comparisons</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-display font-bold text-secondary">
            {(historyItems.reduce((acc, item) => acc + item.similarity, 0) / historyItems.length).toFixed(1)}%
          </div>
          <div className="text-sm text-muted-foreground">Avg. Similarity</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-display font-bold text-foreground">
            {historyItems.filter(i => i.similarity >= 90).length}
          </div>
          <div className="text-sm text-muted-foreground">High Matches</div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-between">
        <Button variant="ghost" size="lg" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
          Back to Results
        </Button>
      </div>
    </motion.div>
  );
}
