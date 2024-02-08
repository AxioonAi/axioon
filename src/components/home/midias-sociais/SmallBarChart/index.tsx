interface pageData {
  pageData: any;
}

export function SmallBarChart({ pageData }: pageData) {
  const redHeight = (
    (pageData?.commentsStatistics.sentimentStatistics.countSentiment0To350 /
      (pageData?.commentsStatistics.sentimentStatistics.countSentiment0To350 +
        pageData?.commentsStatistics.sentimentStatistics
          .countSentiment351To650 +
        pageData?.commentsStatistics.sentimentStatistics
          .countSentiment651To1000)) *
    100
  ).toFixed(0);

  const yellowHeight = (
    (pageData?.commentsStatistics.sentimentStatistics.countSentiment351To650 /
      (pageData?.commentsStatistics.sentimentStatistics.countSentiment0To350 +
        pageData?.commentsStatistics.sentimentStatistics
          .countSentiment351To650 +
        pageData?.commentsStatistics.sentimentStatistics
          .countSentiment651To1000)) *
    100
  ).toFixed(0);

  const greenHeight = (
    (pageData?.commentsStatistics.sentimentStatistics.countSentiment651To1000 /
      (pageData?.commentsStatistics.sentimentStatistics.countSentiment0To350 +
        pageData?.commentsStatistics.sentimentStatistics
          .countSentiment351To650 +
        pageData?.commentsStatistics.sentimentStatistics
          .countSentiment651To1000)) *
    100
  ).toFixed(0);

  return (
    <div className="Container flex flex-col sm:flex-row gap-4 sm:gap-12 items-center">
      <div className="chartContainer flex relative h-20 w-24 justify-around items-end">
        <div
          className={`chartBar w-3 bg-[#EF322C]`}
          style={{ height: `${redHeight}%` }}
        />
        <div
          className={`chartBar w-3 bg-[#FAC816]`}
          style={{ height: `${yellowHeight}%` }}
        />
        <div
          className="chartBar w-3 bg-[#66AA43]"
          style={{ height: `${greenHeight}%` }}
        />
        <div className="w-[120%] h-px bg-[#606060] absolute bottom-0 left-0" />
        <div className="w-px h-[120%] bg-[#606060] absolute bottom-0 left-0" />
      </div>
      <div>
        <div className="flex items-center gap-4" color="#EF322C">
          <div className="circle w-3 h-3 rounded-full bg-[#EF322C]" />
          <span>0 - 350: Ruim</span>
        </div>
        <div className="flex items-center gap-4" color="#FAC816">
          <div className="circle w-3 h-3 rounded-full bg-[#FAC816]" />
          <span>350 - 650: Regular</span>
        </div>
        <div className="flex items-center gap-4" color="#66AA43">
          <div className="circle w-3 h-3 rounded-full bg-[#66AA43]" />
          <span>650 - 1000: Muito Bom</span>
        </div>
      </div>
    </div>
  );
}
