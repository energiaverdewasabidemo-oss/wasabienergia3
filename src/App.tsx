import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import OptimizedHeader from './components/OptimizedHeader';
import OptimizedHero from './components/OptimizedHero';

// Lazy load components for better performance
const OptimizedBenefits = lazy(() => import('./components/OptimizedBenefits'));
const OptimizedOffer = lazy(() => import('./components/OptimizedOffer'));
const OptimizedHowItWorks = lazy(() => import('./components/OptimizedHowItWorks'));
const OptimizedTestimonials = lazy(() => import('./components/OptimizedTestimonials'));
const OptimizedContactForm = lazy(() => import('./components/OptimizedContactForm'));
const OptimizedFooter = lazy(() => import('./components/OptimizedFooter'));
const SubirFactura = lazy(() => import('./pages/SubirFactura'));

// Loading component optimizado
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-12 h-12 border-4 border-[#A8FF00] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const HomePage = () => (
  <>
    <OptimizedHeader />

    <main>
      <OptimizedHero />

      <Suspense fallback={<LoadingSpinner />}>
        <OptimizedBenefits />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <OptimizedOffer />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <OptimizedHowItWorks />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <OptimizedTestimonials />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <OptimizedContactForm />
      </Suspense>
    </main>

    <Suspense fallback={<LoadingSpinner />}>
      <OptimizedFooter />
    </Suspense>
  </>
);

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A] overflow-x-hidden">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/subir-factura"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <SubirFactura />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;