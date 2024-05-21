const QandAModel = require("../models/QandA.model");

async function vectorSearchQandA(queryEmbeddings, limit) {
  const embeddings = await QandAModel.aggregate([
    {
      $vectorSearch: {
        queryVector: queryEmbeddings,
        path: "embedding",
        numCandidates: 200,
        limit: limit,
        index: "qandas",
      },
    },
  ]);
  return embeddings.map((embedding) => embedding.text);
}

module.exports = {
  vectorSearchQandA,
};
