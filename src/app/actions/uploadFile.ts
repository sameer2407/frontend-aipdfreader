"use server";
import { revalidatePath } from "next/cache";

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  console.log(formData);
  if (!file) {
    throw new Error("No file provided");
  }

  // Validate file type
  if (!file.type.includes("pdf") && !file.type.includes("txt  ")) {
    throw new Error("Only PDF and TXT files are allowed");
  }

  try {
    // Generate unique filename
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;

    // Process the PDF with the RAG service
    try {
      console.log('Sending PDF to RAG service');

      // Create FormData with the correct key 'pdf'
      const processFormData = new FormData();
      processFormData.append('pdf', file);

      const response = await fetch('https://pdf-gateway-service.onrender.com/api/pdf/process', {
        method: 'POST',
        body: processFormData
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('RAG service error response:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(`PDF processing failed: ${response.statusText}. Details: ${errorText}`);
      }

      const processingResult = await response.json();
      console.log('PDF processing result:', processingResult);
    } catch (error) {
      console.error('Error processing PDF:', error);
      // We don't throw here to allow the upload to be considered successful
      // even if processing fails
    }

    revalidatePath("/");
    return {
      success: true,
      fileName: fileName
    };
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error("Failed to upload file");
  }
}