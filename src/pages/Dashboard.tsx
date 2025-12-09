import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AppNavbar } from '@/components/dashboard/AppNavbar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { MyImagesStep } from '@/components/dashboard/steps/MyImagesStep';
import { ProcessingStep } from '@/components/dashboard/steps/ProcessingStep';
import { ResultsStep } from '@/components/dashboard/steps/ResultsStep';
import { HistoryStep } from '@/components/dashboard/steps/HistoryStep';
import { NewCompareModal } from '@/components/dashboard/NewCompareModal';
import { CompareProvider } from '@/contexts/CompareContext';

const DashboardContent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showNewCompareModal, setShowNewCompareModal] = useState(false);

  const handleNewCompareComplete = () => {
    setCurrentStep(1); // Go to My Images step
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <MyImagesStep 
            onNext={() => setCurrentStep(2)} 
            onAddMore={() => setShowNewCompareModal(true)}
          />
        );
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
        return (
          <MyImagesStep 
            onNext={() => setCurrentStep(2)} 
            onAddMore={() => setShowNewCompareModal(true)}
          />
        );
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
          onNewCompare={() => setShowNewCompareModal(true)}
        />

        {/* Step Content */}
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
        </main>
      </div>

      {/* New Compare Modal */}
      <NewCompareModal
        open={showNewCompareModal}
        onOpenChange={setShowNewCompareModal}
        onComplete={handleNewCompareComplete}
      />
    </div>
  );
};

const Dashboard = () => {
  return (
    <CompareProvider>
      <DashboardContent />
    </CompareProvider>
  );
};

export default Dashboard;
