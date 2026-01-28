// client/src/pages/how-it-works.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/seo";
import HowItWorks from "@/components/HowItWorks";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <>
      <SEO
        title="How It Works - AI Detection Process"
        description="Understand how Thuliyam AI detects deepfakes and AI-generated images. Learn about our three-step process: image upload, AI analysis with neural networks, and detailed confidence scoring for accurate results."
        url="https://thuliyam-ai.vercel.app/how-it-works"
        keywords="how deepfake detection works, AI image analysis process, neural network detection, image authenticity verification, AI detection technology, computer vision analysis"
        pageType="website"
      />
      <Navbar />
      <HowItWorks />
      <Footer />
    </>
  );
}