import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  cityData: any;
}

export function SeuEleitoradoCards({ cityData }: Props) {
  return (
    <div className="cityStaticDataContainer flex w-full mt-4">
      <Swiper
        className="p-2 w-full"
        slidesPerView={2}
        // breakpoints={{
        //   550: {
        //     slidesPerView: 2,
        //   },
        //   768: {
        //     slidesPerView: 2.6,
        //   },
        //   1360: {
        //     slidesPerView: 4,
        //   },
        // }}
      >
        <SwiperSlide>
          <div className="Container relative w-64 h-28 bg-gray-10 py-2 px-8 shadow-md border-1 rounded-xl border-[#959595] transition duration-200 hover:cursor-pointer hover:scale-105">
            <div
              className={`verticalBar absolute left-3 h-20 border-2 border-[#5162FF] rounded-full`}
            />
            <header className="Header text-lg text-gray-100">Cidade:</header>
            <div className="flex w-full justify-between">
              <div className="Feedback flex justify-between gap-5">
                <div className="FeddbackGroup flex flex-col mt-3 gap-0.5">
                  <div className="Group flex gap-0.5 items-center">
                    <strong className="text-xl leading-[0.9]">
                      {cityData ? cityData.name : "Carregando..."}
                      {cityData ? " - " : ""}
                      {cityData ? cityData.state : ""}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="Feedback flex justify-between gap-5">
                <div className="FeddbackGroup flex flex-col mt-3 gap-0.5">
                  <div className="Group flex gap-0.5 items-center">
                    <strong className="text-lg leading-[0.9]">
                      {cityData
                        ? String(cityData?.population.total).length > 6
                          ? (cityData.population.total / 1000000).toFixed(1) +
                            "M"
                          : String(cityData?.population.total).length <= 6 &&
                              String(cityData?.population.total).length > 3
                            ? (cityData.population.total / 1000).toFixed(1) +
                              "K"
                            : cityData?.population.total
                        : ""}
                    </strong>
                  </div>
                  <span className="text-sm text-gray-90">
                    {cityData && "Habitantes"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* <SwiperSlide>
          <div className="Container relative w-64 h-28 bg-gray-10 py-2 px-8 shadow-md border-1 rounded-xl border-[#959595] transition duration-200 hover:cursor-pointer hover:scale-105">
            <div
              className={`verticalBar absolute left-3 h-20 border-2 border-[#5162FF] rounded-full`}
            />
            <header className="Header text-lg text-gray-100">
              Verba Disponível:
            </header>
            <div className="flex w-full justify-evenly items-center">
              <div className="Feedback flex justify-between gap-5">
                <div className="FeddbackGroup flex flex-col mt-3 gap-0.5">
                  <div className="Group flex gap-0.5 items-center">
                    <strong className="text-xl leading-[0.9]">
                      {cityData ? "196.000 Mil" : "Carregando..."}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="Feedback flex justify-between gap-5">
                <div className="FeddbackGroup flex flex-col mt-3 gap-0.5">
                  <div className="Group flex gap-0.5 items-center">
                    <span className="text-lg leading-[0.9]">
                      {cityData && "Reais"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide> */}
        <SwiperSlide>
          <div className="Container relative w-64 h-28 bg-gray-10 py-2 px-8 shadow-md border-1 rounded-xl border-[#959595] transition duration-200 hover:cursor-pointer hover:scale-105">
            <div
              className={`verticalBar absolute left-3 h-20 border-2 border-[#5162FF] rounded-full`}
            />
            <header className="Header text-lg text-gray-100">
              Eleitores no Município:
            </header>
            <div className="flex w-full justify-evenly items-center">
              <div className="Feedback flex justify-between gap-5">
                <div className="FeddbackGroup flex flex-col mt-3 gap-0.5">
                  <div className="Group flex gap-0.5 items-center">
                    <strong className="text-xl leading-[0.9]">
                      {cityData
                        ? String(cityData?.electorate.total).length > 6
                          ? (cityData.electorate.total / 1000000).toFixed(1) +
                            "M"
                          : String(cityData?.electorate.total).length <= 6 &&
                              String(cityData?.electorate.total).length > 3
                            ? (cityData.electorate.total / 1000).toFixed(1) +
                              "K"
                            : cityData?.electorate.total
                        : "Carregando..."}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="Feedback flex justify-between gap-5">
                <div className="FeddbackGroup flex flex-col mt-3 gap-0.5">
                  <div className="Group flex gap-0.5 items-center">
                    <span className="text-lg leading-[0.9]">
                      {cityData && "Eleitores"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* <SwiperSlide>
          <div className="Container relative w-64 h-28 bg-gray-10 py-2 px-8 shadow-md border-1 rounded-xl border-[#959595] transition duration-200 hover:cursor-pointer hover:scale-105">
            <div
              className={`verticalBar absolute left-3 h-20 border-2 border-[#5162FF] rounded-full`}
            />
            <header className="Header text-lg text-gray-100">
              Concorrentes:
            </header>
            <div className="flex w-full justify-evenly items-center">
              <div className="Feedback flex justify-between gap-5">
                <div className="FeddbackGroup flex flex-col mt-3 gap-0.5">
                  <div className="Group flex gap-0.5 items-center">
                    <strong className="text-xl leading-[0.9]">
                      {cityData ? cityData.politician : "Carregando..."}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="Feedback flex justify-between gap-5">
                <div className="FeddbackGroup flex flex-col mt-3 gap-0.5">
                  <div className="Group flex gap-0.5 items-center">
                    <span className="text-lg leading-[0.9]">
                      {cityData && "Prefeitos"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
}
