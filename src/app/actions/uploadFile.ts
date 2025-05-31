"use server";
import { supabase } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("No file provided");
  }

  // Validate file type
  if (!file.type.includes("pdf")) {
    throw new Error("Only PDF files are allowed");
  }

  try {
    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Generate unique filename
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('pdfs') // Your bucket name
      .upload(fileName, buffer, {
        contentType: 'application/pdf',
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('pdfs')
      .getPublicUrl(fileName);

    // Here you can trigger your RAG processing with the publicUrl

    revalidatePath("/");
    return {
      success: true,
      url: publicUrl,
      fileName: fileName
    };
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error("Failed to upload file");
  }
}