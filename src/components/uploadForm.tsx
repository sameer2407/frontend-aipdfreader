"use client";
import { uploadFile } from "@/app/actions/uploadFile";
import { useState, useTransition } from "react";

export function UploadForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        await uploadFile(formData);
        setSuccess("File uploaded successfully!");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to upload file");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Uploading..." : "Upload"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </form>
  );
}
