import React, { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PDFViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  return (
    <div style={styles.viewerContainer}>
      <div style={{
        display: loading ? "none" : "block",
      }}>
        <button
          style={{ ...styles.navButton, left: -100 }}
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          ◀
        </button>

        <div style={styles.pdfContainer}>
          {loading && (
            <div style={styles.loadingContainer}>
              Loading
            </div>
          )}
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadStart={() => setLoading(true)}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <p style={styles.pageInfo}>
            Page {pageNumber} of {numPages}
          </p>
        </div>

        <button
          style={{ ...styles.navButton, right: -100 }}
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

const styles = {
  viewerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  navButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    padding: "10px 15px",
    fontSize: "20px",
    cursor: "pointer",
    background: "white",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
  },
  pdfContainer: {
    textAlign: "center",
    maxWidth: "100%",
    maxHeight: "90vh",
    overflow: "auto",
    position: "relative",
  },
  pageInfo: {
    marginTop: "10px",
    fontSize: "16px",
  },
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

export default PDFViewer;
