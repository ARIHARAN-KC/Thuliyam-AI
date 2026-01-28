import SEO from "@/components/seo";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
    return (
        <>
            <SEO
                title="Home - AI Deepfake Detection"
                description="Detect AI-generated and manipulated images using advanced machine learning. Thuliyam AI provides fast, accurate deepfake detection with 93.7% accuracy. Upload and analyze images instantly."
                url="https://thuliyam-ai.vercel.app"
                keywords="deepfake detection, AI image detection, fake image detector, AI-generated image detection, deepfake analyzer, image authenticity, machine learning detection"
                pageType="website"
            />

            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
            <Footer />
        </>
    );
}