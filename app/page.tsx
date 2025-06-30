import React from 'react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  // No fetching required, so pure server component.
  console.log('[HomePage] Rendering');

  return (
    <main className="min-h-screen bg-gradient-to-r from-indigo-50 via-white to-indigo-100 flex flex-col justify-center items-center p-8">
      <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-700 mb-4">
        Welcome to Our Cool Home Page
      </h1>
      <p className="text-base md:text-lg text-gray-600 mb-6 text-center max-w-2xl">
        Explore endless possibilities with our platform. We empower developers and teams to build modern apps.
      </p>
      <Button variant="default" className="px-6 py-3 text-base font-semibold" onClick={() => console.log('Button clicked!')}>
        Get Started
      </Button>
    </main>
  );
}
