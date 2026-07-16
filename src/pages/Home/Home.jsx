import React from "react";
import { Helmet } from "react-helmet-async";
import Hero from "../../components/Hero/Hero";
import AboutSection from "../../components/About/AboutSection";
import ServicesSection from "../../components/Services/ServicesSection";
import BecomePartner from "../../components/Partners/BecomePartner";
import JourneySection from "../../components/Journey/JourneySection";
import SolutionsSection from "../../components/Solutions/SolutionsSection";
import TestimonialsSection from "../../components/Testimonials/TestimonialsSection";
import PartnerSection from "../../components/Partners/PartnerSection";
import JoinForm from "../../components/Contact/JoinForm";

const Home = () => (
  <>
    <Helmet>
      <title>SiD Pay – One Platform for BBPS, Recharge & Payment Services</title>
      <meta name="description" content="SiD Pay by Shashwat — India's trusted fintech platform for BBPS, recharge, payments, banking, travel, and API-led financial services." />
      <meta name="keywords" content="BBPS, recharge, payment gateway, fintech, UPI, SiD Pay, Shashwat" />
    </Helmet>

    {/* 1. Hero + Stats */}
    <Hero />

    {/* 2. About Us */}
    <AboutSection />

    {/* Why Businesses Trust Us (8-icon grid) */}
    <SolutionsSection />

    {/* Strategic Partnerships (Carousel) */}
    <PartnerSection />

    {/* 3. What We Do (Card Slider) */}
    <ServicesSection />

    {/* 4. Become a Partner */}
    <BecomePartner />

    {/* 5. Onboarding On-boarding Timeline Journey */}
    <JourneySection />

    {/* 7. What Our Partners Say (Testimonials) */}
    <TestimonialsSection />

    {/* 9. Join Form + Google Maps Embed */}
    <JoinForm />
  </>
);

export default Home;
