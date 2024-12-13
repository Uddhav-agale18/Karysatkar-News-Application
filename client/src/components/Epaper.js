import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

export default function Epaper() {
  const [pdfUrl, setPdfUrl] = useState(null);

  const fetchPdf = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/pdf/get-files');
      if (response.data.fileUrl !== pdfUrl) {
        setPdfUrl(response.data.fileUrl);  // Update only if the URL has changed
      }
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  useEffect(() => {
    fetchPdf();  // Initial fetch
    const interval = setInterval(fetchPdf, 30000); // Poll every 30 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Uploaded Epaper</h2>

      {pdfUrl ? (
        <div className="mt-4 border" style={{ height: '600px' }}>
          <Worker workerUrl={pdfjsWorker}>
            <Viewer fileUrl={pdfUrl} />
          </Worker>
        </div>
      ) : (
        <p>No PDF uploaded yet.</p>
      )}
    </div>
  );
}
