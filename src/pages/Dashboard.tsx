import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AppNavbar } from '@/components/dashboard/AppNavbar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { UploadStep } from '@/components/dashboard/steps/UploadStep';
import { ProcessingStep } from '@/components/dashboard/steps/ProcessingStep';
import { ResultsStep } from '@/components/dashboard/steps/ResultsStep';
import { HistoryStep } from '@/components/dashboard/steps/HistoryStep';

const Dashboard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <UploadStep onNext={() => setCurrentStep(2)} />;
      case 2:
        return (
          <ProcessingStep
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <ResultsStep
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        );
      case 4:
        return <HistoryStep onBack={() => setCurrentStep(3)} />;
      default:
        return <UploadStep onNext={() => setCurrentStep(2)} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Navbar */}
      <AppNavbar currentStep={currentStep} onStepChange={setCurrentStep} />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <AppSidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Step Content */}
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
