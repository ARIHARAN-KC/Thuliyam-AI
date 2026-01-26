import ImageUpload from "@/components/ImageUpload";
import Navbar from "@/components/Navbar";

export default function UploadPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[96px] bg-gray-50">
        <ImageUpload />
      </main>
    </>
  );
}
