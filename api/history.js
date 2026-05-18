export default async function handler(req, res) {

  const serviceKey = process.env.DATA_GO_KR_API_KEY;

  const url =
    `https://apis.data.go.kr/1741000/museums_and_art_galleries/history` +
    `?serviceKey=${serviceKey}` +
    `&pageNo=1` +
    `&numOfRows=30` +
    `&resultType=json`;

  try {

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
}
