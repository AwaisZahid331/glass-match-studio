import { useState } from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { AboutSection } from '@/components/landing/AboutSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { MissionSection } from '@/components/landing/MissionSection';
import { Footer } from '@/components/landing/Footer';
import { AuthModals } from '@/components/auth/AuthModals';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onLoginClick={() => setIsLoginOpen(true)}
        onSignupClick={() => setIsSignupOpen(true)}
      />
      
      <HeroSection onGetStarted={() => setIsSignupOpen(true)} />
      <AboutSection />
      <PricingSection />
      <MissionSection />
      <Footer />

      <AuthModals
        isLoginOpen={isLoginOpen}
        isSignupOpen={isSignupOpen}
        onLoginClose={() => setIsLoginOpen(false)}
        onSignupClose={() => setIsSignupOpen(false)}
        onSwitchToSignup={() => setIsSignupOpen(true)}
        onSwitchToLogin={() => setIsLoginOpen(true)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default Index;
