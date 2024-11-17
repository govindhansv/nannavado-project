import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import MainSection from '@/components/home/MainSection';
import Footer from '@/components/footer/Footer';


export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <main className="flex-grow">
        <MainSection />
        {/* <FeaturesSection />
        <TestimonialSection /> */}
        {/* <CTASection /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
