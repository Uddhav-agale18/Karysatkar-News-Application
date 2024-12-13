import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
import axios from 'axios';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

export default function UploadEpaper() {
  const [formData, setFormData] = useState({ title: '', pdfFile: null });
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showPdf, setShowPdf] = useState(false);
  const navigate = useNavigate();

  // Fetch PDF URL on initial load from localStorage or backend
  useEffect(() => {
    const storedPdfUrl = localStorage.getItem('pdfUrl');
    if (storedPdfUrl) {
      setPdfUrl(storedPdfUrl);
      setShowPdf(true);
    } else {
      fetchLatestPdf();
    }
  }, []);

  // Fetch the latest PDF URL from the backend if not in localStorage
  const fetchLatestPdf = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/pdf/get-latest');
      if (response.data.fileUrl) {
        setPdfUrl(response.data.fileUrl);
        localStorage.setItem('pdfUrl', response.data.fileUrl);
        setShowPdf(true);
      }
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData({ ...formData, pdfFile: file });
      setShowPdf(false);
    } else {
      alert('Please upload a valid PDF file');
      setFormData({ ...formData, pdfFile: null });
      setShowPdf(false);
    }
  };

  useEffect(() => {
    if (formData.pdfFile) {
      const url = URL.createObjectURL(formData.pdfFile);
      setPdfUrl(url);
      localStorage.setItem('pdfUrl', url);
    }

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [formData.pdfFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.pdfFile || !formData.title) {
      alert('Please upload a PDF file and provide a title');
      return;
    }

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('file', formData.pdfFile);

      const result = await axios.post(
        'http://localhost:5000/api/pdf/upload-files',
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (result.data.status === 'ok') {
        alert('Uploaded Successfully!!!');
        const uploadedPdfUrl = result.data.fileUrl;
        localStorage.setItem('pdfUrl', uploadedPdfUrl);
        setPdfUrl(uploadedPdfUrl);
        setShowPdf(true);
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred while uploading the file.');
    }
  };

  const handleThumbnailClick = (pageIndex) => {
    console.log('Navigating to page:', pageIndex + 1);
    navigate('/page-viewer', {
      state: { pdfFile: pdfUrl, pageNumber: pageIndex + 1 },
    });
  };

  const thumbnailPluginInstance = thumbnailPlugin();
  const { Thumbnails } = thumbnailPluginInstance;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upload Epaper</h2>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={handleTitleChange}
        className="block border p-2 mb-2 w-full"
      />
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="block mb-2"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 mb-4"
      >
        Submit
      </button>

      {showPdf && pdfUrl && (
        <div className="mt-4 border" style={{ height: '600px' }}>
          <Worker workerUrl={pdfjsWorker}>
            <div style={{ display: 'flex' }}>
              <div
                className="thumbnail-sidebar"
                style={{ width: '120px', overflowY: 'auto' }}
              >
                <Thumbnails />
              </div>
              <div className="pdf-viewer-content" style={{ flex: 1, height: '100%' }}>
                <Viewer
                  fileUrl={pdfUrl}
                  plugins={[thumbnailPluginInstance]}
                  defaultScale={1.5}
                />
              </div>
            </div>
          </Worker>
        </div>
      )}
    </div>
  );
}
