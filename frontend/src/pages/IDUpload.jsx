import { useState } from "react";
import axios from "axios";

function IDUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("id", file);

    setUploading(true);

    try {
      const response = await axios.post(
        "https://nestlocker.onrender.com/api/uploads/id",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("ID upload successful:", response.data);

      alert("ID uploaded successfully!");

      setFile(null);
    } catch (error) {
      console.log(
        "ID upload failed:",
        error.response?.data?.message ||
          "Something went wrong"
      );

      alert(
        error.response?.data?.message ||
          "ID upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 px-6 py-10">
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md">

        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Upload ID
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Upload your identity document
        </p>

        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select ID Document
          </label>

          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            disabled={uploading}
            className="w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        {file && (
          <p className="mt-4 text-sm text-gray-600">
            Selected: {file.name}
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`mt-6 w-full text-white py-3 rounded-lg font-semibold ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload ID"}
        </button>

      </div>
    </div>
  );
}

export default IDUpload;