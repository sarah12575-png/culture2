export default async function handler(req, res) {

  const keyword = req.query.keyword || "";

  const serviceKey = process.env.DATA_GO_KR_API_KEY;

  const url =
    `https://apis.data.go.kr/1741000/museums_and_art_galleries/info` +
    `?serviceKey=${serviceKey}` +
    `&pageNo=1` +
    `&numOfRows=50` +
    `&resultType=json`;

  try {

    const response = await fetch(url);
    const data = await response.json();

    let list = [];

    if (data.body && data.body.items) {
      list = data.body.items;
    }

    if (keyword) {
      list = list.filter(item =>
        (item.BPLCNM || "").includes(keyword)
      );
    }

    res.status(200).json({
      success: true,
      count: list.length,
      data: list
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
}
