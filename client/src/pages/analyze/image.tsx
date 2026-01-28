import Navbar from "@/components/Navbar";
import SEO from "@/components/seo";
import ImageUpload from "@/components/ImageUpload";

export default function AnalyzePage() {
  return (
    <>
      <SEO
        title="Analyze Image - Deepfake Detector"
        description="Upload and analyze images to detect AI-generated or manipulated content. Get instant results with confidence scores using our advanced machine learning models. Free deepfake detection tool with 93.7% accuracy."
        url="https://thuliyam-ai.vercel.app/analyze"
        keywords="analyze image for deepfake, upload image detector, AI image checker, fake image analyzer, deepfake scanner, image verification tool, detect manipulated photos"
        pageType="website"
      />
      <Navbar />
      <ImageUpload />
    </>
  );
}