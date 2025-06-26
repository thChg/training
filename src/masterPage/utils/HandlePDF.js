import axios from "./AxiosInstance";

export const handlePDF = async (uri, records) => {
  const response = await axios.post(uri, records, {
    responseType: "blob",
  });
  const blob = new Blob([response.data], { type: "application/pdf" });
  const fileURL = URL.createObjectURL(blob);
  window.open(fileURL);
};
