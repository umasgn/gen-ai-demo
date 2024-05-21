const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");
const QandAModel = require("../models/QandA.model");
const {
  convertToEmbeddings,
  getAnswerFromContext,
} = require("../services/gemini.service");
const { vectorSearchQandA } = require("../services/app.service");

exports.loadPDFToEmbeddings = asyncHandler(async (req, res) => {
  try {
    const buffer = fs.readFileSync(path.resolve("server/public/InnomindsITPolicies.pdf"));

    const context = await pdf(buffer);
    const chunks = context.text.split(/([\n]){2,}/);

    const splits = chunks.filter((row) => row && row !== "\n");
    splits.forEach(async (split, i) => {
      const embedding = await convertToEmbeddings(split);
      QandAModel.create({
        text: split,
        embedding,
      });
    });
    res.status(201).json("File uploaded successfully");
  } catch (error) {
    throw new Error(error);
  }
});

exports.getQandAResponse = asyncHandler(async (req, res) => {
  const { question } = req.body;

  const questionEmbedding = await convertToEmbeddings(question);

  const context = await vectorSearchQandA(questionEmbedding, 1);

  const response = await getAnswerFromContext(
    context?.join().replace("\n", " "),
    question
  );

  res.status(200).json({ response });
});
