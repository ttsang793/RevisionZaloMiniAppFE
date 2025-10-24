// ZaUI stylesheet
import "zmp-ui/zaui.css";
// Tailwind stylesheet
import "@/css/tailwind.scss";
// Your stylesheet
import "@/css/app.scss";

// React core
import React from "react";
import { createRoot } from "react-dom/client";

// Mount the app
import Layout from "@/components/layout";

// Expose app configuration
import appConfig from "../app-config.json";

// ReactPDF Worker
import { pdfjs } from 'react-pdf';

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig as any;
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const root = createRoot(document.getElementById("app")!);
root.render(React.createElement(Layout));
