const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  pdf: {
    type: String,
    required: true,
  },
});

const PdfDetails = mongoose.model("PdfDetails", pdfSchema);
module.exports = PdfDetails;
