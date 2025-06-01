"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button"; // adjust the path as per your project
import { uploadFile } from "@/app/actions/uploadFile"; // adjust to the correct server action path

export default function UploadPDFButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleUpload = async (formData: FormData) => {
    setStatus("Uploading...");

    try {
      const result = await uploadFile(formData);
      setStatus(`Uploaded: ${result.fileName}`);
    } catch (err) {
      setStatus("Upload failed.");
    }
  };

  return (
    <form action={handleUpload} className="flex flex-col items-start gap-2">
      <input
        ref={inputRef}
        type="file"
        name="file"
        accept=".pdf,.txt"
        className="hidden"
        onChange={() => {
          if (inputRef.current?.files?.length) {
            const form = inputRef.current.closest("form");
            if (form) form.requestSubmit(); // trigger form submit manually
          }
        }}
      />

      <Button
        type="button"
        size="lg"
        className="gap-2"
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="h-4 w-4" />
        Upload PDF
      </Button>

      {status && <p className="text-sm text-muted-foreground">{status}</p>}
    </form>
  );
}
