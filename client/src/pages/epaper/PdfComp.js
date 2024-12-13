import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfComp({ pdfFile }) {
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Log pdfFile value whenever it changes
  useEffect(() => {
    console.log("PDF file received in PdfComp:", pdfFile);
  }, [pdfFile]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    setError("Failed to load PDF file.");
    console.error("Error loading PDF:", error);
    setLoading(false);
  };

  return (
    <div className="pdf-div">
      {error && <p className="error-text">{error}</p>}
      {loading && <p>Loading PDF...</p>}
      {numPages && !loading && <p>{`Total Pages: ${numPages}`}</p>}
      {pdfFile && (
        <Document
          file={{ url: pdfFile }}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
        >
          {Array.from(new Array(numPages), (x, i) => (
            <Page
              key={`page_${i + 1}`}
              pageNumber={i + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
        </Document>
      )}
    </div>
  );
}

export default PdfComp;
