import { motion } from 'framer-motion';
import { Sparkles, Upload, Settings2, BarChart2, Save, User, ChevronDown, LogOut } from 'lucide-react';
import { useState } from 'react';

interface AppNavbarProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

const steps = [
  { id: 1, name: 'Upload Images', icon: Upload },
  { id: 2, name: 'Processing Options', icon: Settings2 },
  { id: 3, name: 'Results Preview', icon: BarChart2 },
  { id: 4, name: 'Save / Export', icon: Save },
];

export function AppNavbar({ currentStep, onStepChange }: AppNavbarProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 bg-card/80 backdrop-blur-xl border-b border-border px-4 flex items-center justify-between"
    >
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 shrink-0">
        <div className="relative">
          <Sparkles className="w-6 h-6 text-primary" />
          <div className="absolute inset-0 blur-lg bg-primary/50 -z-10" />
        </div>
        <span className="text-lg font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:block">
          MatchVision
        </span>
      </a>

      {/* Step Tabs */}
      <div className="flex items-center gap-1 bg-muted/50 rounded-xl p-1 overflow-x-auto">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => onStepChange(step.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              currentStep === step.id
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <step.icon className="w-4 h-4" />
            <span className="hidden md:inline">{step.name}</span>
          </button>
        ))}
      </div>

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-muted transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown */}
        {isUserMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 top-full mt-2 w-48 glass-card py-2"
          >
            <div className="px-4 py-2 border-b border-border">
              <div className="font-medium">John Doe</div>
              <div className="text-sm text-muted-foreground">john@example.com</div>
            </div>
            <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <User className="w-4 h-4" />
              Profile
            </a>
            <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Settings2 className="w-4 h-4" />
              Settings
            </a>
            <div className="border-t border-border mt-2 pt-2">
              <a href="/" className="flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                <LogOut className="w-4 h-4" />
                Sign Out
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
