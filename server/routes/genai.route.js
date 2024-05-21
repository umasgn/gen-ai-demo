const { loadPDFToEmbeddings, getQandAResponse } = require("../controllers/app.controller");

const router = require("express").Router({ mergeParams: true });

router.post("/upload-qanda-pdf", loadPDFToEmbeddings);

router.post("/q-and-a", getQandAResponse)

module.exports = router;
