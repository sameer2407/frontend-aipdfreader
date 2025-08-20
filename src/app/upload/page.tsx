"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import UploadPDFButton from "@/components/UploadPDFButton";
import { useState } from "react";

export default function UploadPage() {
  const router = useRouter();
  const [hasUploaded, setHasUploaded] = useState(false);

  const handleUploadSuccess = () => {
    setHasUploaded(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Upload Your PDF</h1>
          <p className="text-muted-foreground">
            Upload your PDF document to start chatting with it. We support PDF
            and TXT files.
          </p>
        </div>

        <div className="bg-card rounded-lg border p-8">
          <UploadPDFButton onUploadSuccess={handleUploadSuccess} />

          {hasUploaded && (
            <div className="mt-6 flex justify-center">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => router.push("/")}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Ask AI about the PDF</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
