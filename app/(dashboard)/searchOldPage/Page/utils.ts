import axios from "axios";

const downloadPDF = async (brochureUrl: string) => {
  try {
    const response = await axios.get(brochureUrl, {
      responseType: "blob", // Important for handling binary data
    });
    console.log("response", response.data);

    // Create a new Blob object using the response data
    const pdfBlob = new Blob([response.data], { type: "application/pdf" });

    // Create a link element
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(pdfBlob);
    link.download = "brochure.pdf"; // The name of the downloaded file

    // Append the link to the body and trigger a click to start download
    document.body.appendChild(link);
    link.click();

    // Clean up and remove the link
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading the PDF", error);
  }
};
export default downloadPDF;
