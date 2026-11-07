import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ExpertiseSection from '@/components/sections/ExpertiseSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import AgentSection from '@/components/sections/AgentSection';
import EducationSection from '@/components/sections/EducationSection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* SECTION 1 - HERO */}
      <HeroSection />

      {/* SECTION 2 - ABOUT ME */}
      <AboutSection />

      {/* SECTION 3 - EXPERTISE */}
      <ExpertiseSection />

      {/* SECTION 4 - AI PROJECTS */}
      <ProjectsSection />

      {/* SECTION 5 - SHARANG AI CENTRAL AGENT */}
      <AgentSection />

      {/* SECTION 6 - EDUCATION & CERTIFICATIONS */}
      <EducationSection />

      {/* SECTION 7 - RESUME & CONTACT */}
      <ContactSection />
    </div>
  );
}
