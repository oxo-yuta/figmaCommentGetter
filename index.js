const axios = require('axios');
const { createObjectCsvWriter } = require('csv-writer');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// .envファイルから環境変数を読み込む
dotenv.config();

// distフォルダーのパスを設定
const distDir = path.join(__dirname, 'dist');
const outputPath = path.join(distDir, 'figma-comments.csv');

// distフォルダーが存在しない場合は作成
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// CSVファイルのヘッダーを定義
const csvWriter = createObjectCsvWriter({
  path: outputPath,
  header: [
    { id: 'message', title: 'Comment' },
    { id: 'link', title: 'Link' },
    { id: 'created_at', title: 'Created At' },
    { id: 'author', title: 'Author' }
  ]
});

async function getFigmaComments(fileKey, accessToken) {
  try {
    const response = await axios.get(`https://api.figma.com/v1/files/${fileKey}/comments`, {
      headers: {
        'X-Figma-Token': accessToken
      }
    });

    return response.data.comments;
  } catch (error) {
    console.error('Error fetching comments:', error.message);
    throw error;
  }
}

async function exportCommentsToCSV() {
  // 環境変数から認証情報を取得
  const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
  const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

  if (!FIGMA_ACCESS_TOKEN || !FIGMA_FILE_KEY) {
    console.error('Please set FIGMA_ACCESS_TOKEN and FIGMA_FILE_KEY in .env file');
    return;
  }

  try {
    // Figmaからコメントを取得
    const comments = await getFigmaComments(FIGMA_FILE_KEY, FIGMA_ACCESS_TOKEN);

    // コメントデータを整形
    const formattedComments = comments.map(comment => ({
      message: comment.message,
      link: `https://www.figma.com/file/${FIGMA_FILE_KEY}?node-id=${comment.client_meta?.node_id}#${comment.id}`,
      created_at: new Date(comment.created_at).toLocaleString(),
      author: comment.user.handle
    }));

    // CSVファイルに書き出し
    await csvWriter.writeRecords(formattedComments);
    console.log(`Comments have been exported to ${outputPath}`);

  } catch (error) {
    console.error('Export failed:', error);
  }
}

// スクリプトを実行
exportCommentsToCSV();
