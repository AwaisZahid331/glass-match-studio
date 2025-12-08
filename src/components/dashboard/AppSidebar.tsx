import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusCircle, 
  History, 
  Settings, 
  Sun, 
  Moon, 
  ChevronLeft, 
  ChevronRight,
  Image,
  Clock
} from 'lucide-react';
import { useState } from 'react';

interface AppSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const historyItems = [
  { id: 1, name: 'Beach vs Sunset', time: '2 hours ago' },
  { id: 2, name: 'Product Photos', time: '5 hours ago' },
  { id: 3, name: 'Portrait Match', time: 'Yesterday' },
  { id: 4, name: 'Architecture Set', time: '2 days ago' },
];

export function AppSidebar({ isCollapsed, onToggle }: AppSidebarProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 64 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-full bg-sidebar border-r border-sidebar-border flex flex-col relative"
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/25 z-10 hover:scale-110 transition-transform"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Main Actions */}
      <div className="p-4 space-y-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium transition-all ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <PlusCircle className="w-5 h-5 shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
              >
                New Compare
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* History Section */}
      <div className="flex-1 px-4 py-2 overflow-y-auto">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <History className="w-4 h-4" />
                <span>Recent History</span>
              </div>
              
              <div className="space-y-2">
                {historyItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 4 }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-sidebar-accent text-left transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Image className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {item.name}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isCollapsed && (
          <div className="flex flex-col items-center gap-3">
            <button className="w-10 h-10 rounded-xl hover:bg-sidebar-accent flex items-center justify-center transition-colors">
              <History className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <button
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sidebar-accent transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <Settings className="w-5 h-5 text-muted-foreground shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="text-sm text-muted-foreground"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sidebar-accent transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          {isDarkMode ? (
            <Moon className="w-5 h-5 text-muted-foreground shrink-0" />
          ) : (
            <Sun className="w-5 h-5 text-muted-foreground shrink-0" />
          )}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="text-sm text-muted-foreground"
              >
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
