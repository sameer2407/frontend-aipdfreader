"use client";

import { useRef, useState } from "react";
import { Upload, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/app/actions/uploadFile";
import { cn } from "@/lib/utils";

type UploadStep = {
  label: string;
  status: "pending" | "current" | "completed";
};

interface UploadPDFButtonProps {
  onUploadSuccess?: () => void;
}

export default function UploadPDFButton({
  onUploadSuccess,
}: UploadPDFButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const uploadSteps: UploadStep[] = [
    { label: "Uploading PDF", status: "pending" },
    { label: "Processing Document", status: "pending" },
    { label: "Generating Embeddings", status: "pending" },
    { label: "Storing in Vector DB", status: "pending" },
    { label: "Finalizing", status: "pending" },
  ];

  const handleUpload = async (formData: FormData) => {
    setIsUploading(true);
    setStatus("Starting upload...");
    setIsSuccess(false);
    setCurrentStep(0);

    try {
      // Simulate step progression
      const stepInterval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= uploadSteps.length - 1) {
            clearInterval(stepInterval);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);

      const result = await uploadFile(formData);
      clearInterval(stepInterval);
      setCurrentStep(uploadSteps.length - 1);
      setStatus(`Successfully uploaded: ${result.fileName}`);
      setIsSuccess(true);
      onUploadSuccess?.();
    } catch (err) {
      setStatus("Upload failed.");
      setIsSuccess(false);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      await handleUpload(formData);
    }
  };

  const resetUpload = () => {
    setStatus(null);
    setIsSuccess(false);
    setCurrentStep(0);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        ref={inputRef}
        type="file"
        name="file"
        accept=".pdf,.txt"
        className="hidden"
        onChange={handleFileChange}
      />

      {!isSuccess ? (
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <Button
            type="button"
            size="lg"
            className="gap-2 relative min-w-[140px]"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
          >
            <Upload className="h-4 w-4" />
            <span>Upload PDF</span>
          </Button>

          {isUploading && (
            <div className="w-full space-y-4">
              {/* Progress Bar */}
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-in-out"
                  style={{
                    width: `${((currentStep + 1) / uploadSteps.length) * 100}%`,
                  }}
                />
              </div>

              {/* Steps */}
              <div className="space-y-2">
                {uploadSteps.map((step, index) => (
                  <div
                    key={step.label}
                    className={cn(
                      "flex items-center gap-2 text-sm",
                      index === currentStep
                        ? "text-primary"
                        : index < currentStep
                        ? "text-green-500"
                        : "text-muted-foreground"
                    )}
                  >
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        index === currentStep
                          ? "bg-primary animate-pulse"
                          : index < currentStep
                          ? "bg-green-500"
                          : "bg-muted-foreground"
                      )}
                    />
                    {step.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Upload Complete</span>
          </div>
          <Button
            type="button"
            size="lg"
            variant="outline"
            className="gap-2"
            onClick={resetUpload}
          >
            <Upload className="h-4 w-4" />
            <span>Upload Another</span>
          </Button>
        </div>
      )}

      {status && !isSuccess && (
        <p
          className={cn(
            "text-sm text-center",
            status.includes("Successfully")
              ? "text-green-500"
              : status.includes("failed")
              ? "text-red-500"
              : "text-muted-foreground"
          )}
        >
          {status}
        </p>
      )}
    </div>
  );
}
