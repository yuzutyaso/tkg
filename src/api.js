// src/api.js

const INVIDIOUS_INSTANCE = 'https://lekker.gay'; // 使用するInvidiousインスタンス

/**
 * 動画を検索します。
 * @param {string} query 検索クエリ
 * @returns {Promise<Array>} 検索結果の動画リスト
 */
export async function searchVideos(query) {
  if (!query) return [];
  const url = `${INVIDIOUS_INSTANCE}/api/v1/search?q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("動画の検索中にエラーが発生しました:", error);
    return [];
  }
}

/**
 * 特定の動画の詳細情報を取得します。
 * @param {string} videoId 動画ID
 * @returns {Promise<Object>} 動画詳細情報
 */
export async function getVideoDetails(videoId) {
  if (!videoId) return null;
  const url = `${INVIDIOUS_INSTANCE}/api/v1/videos/${videoId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("動画詳細の取得中にエラーが発生しました:", error);
    return null;
  }
}

/**
 * 地域ごとの人気動画を取得します。
 * @param {string} region 地域コード (例: "JP", "US")
 * @returns {Promise<Array>} 人気動画のリスト
 */
export async function getTrendingVideos(region = 'JP') {
  const url = `${INVIDIOUS_INSTANCE}/api/v1/trending?region=${encodeURIComponent(region)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("人気動画の取得中にエラーが発生しました:", error);
    return [];
  }
}

/**
 * formatStreamsから最適な動画URLを選択します。
 * @param {Array} formatStreams Invidious APIのformatStreams配列
 * @returns {string|null} 最適な動画URL、またはnull
 */
export function getOptimalVideoUrl(formatStreams) {
  if (!formatStreams || formatStreams.length === 0) return null;

  const mp4Streams = formatStreams.filter(stream =>
    stream.mimeType && stream.mimeType.includes('video/mp4') && stream.url
  );

  mp4Streams.sort((a, b) => {
    const getQualityValue = (quality) => {
      if (!quality) return 0;
      const pMatch = quality.match(/(\d+)p/);
      if (pMatch) return parseInt(pMatch[1]);
      const kMatch = quality.match(/(\d+)k/);
      if (kMatch) return parseInt(kMatch[1]);
      return 0;
    };
    return getQualityValue(b.quality) - getQualityValue(a.quality);
  });

  if (mp4Streams.length > 0) {
    return mp4Streams[0].url;
  }

  const firstVideoUrl = formatStreams.find(stream => stream.mimeType && stream.mimeType.startsWith('video/') && stream.url);
  if (firstVideoUrl) {
    return firstVideoUrl.url;
  }

  return null;
}
