import { ArrowLeftSVG } from "../../../../public/messages/arrow-left";
import { ArrowRightSVG } from "../../../../public/messages/arrow-right";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

export function Messages() {
  const messages = [
    {
      message:
        "“Usar a plataforma da Axion revolucionou a forma como lidamos com nossos casos e processo, é incrivel ter todos os dados de uma empresa centralizado em um único local.”",
      author: "Carlos Alberto",
      company: "M2S Advocacia",
    },
    {
      message:
        "“Usar a plataforma da Axion revolucionou a forma como lidamos com nossos casos e processo, é incrivel ter todos os dados de uma empresa centralizado em um único local.”",
      author: "Carlos Alberto",
      company: "M2S Advocacia",
    },
    {
      message:
        "“Usar a plataforma da Axion revolucionou a forma como lidamos com nossos casos e processo, é incrivel ter todos os dados de uma empresa centralizado em um único local.”",
      author: "Carlos Alberto",
      company: "M2S Advocacia",
    },
  ];

  const [step, setStep] = useState(0);

  const control = useAnimation();

  function handleNext() {
    control.start({ opacity: [0], transition: { duration: 0.5 } });

    setTimeout(() => {
      control.start({ opacity: [1], transition: { duration: 1 } });
      if (step === messages.length - 1) {
        return setStep(0);
      }
      setStep((state) => state + 1);
    }, 300);
  }

  function handlePrevious() {
    control.start({ opacity: [0], transition: { duration: 0.5 } });
    setTimeout(() => {
      control.start({ opacity: [1], transition: { duration: 0.5 } });
      if (step === 0) {
        return setStep(messages.length - 1);
      }
      setStep((state) => state - 1);
    }, 300);
  }

  return (
    <div>
      <div
        className="Container border rounded-xl bg-gradient-to-b from-[rgba(255,255,255,0.3)] to-[rgba(255,255,255,0)] backdrop-blur-sm w-[90%] text-justify
      p-12 text-white lg:text-lg m-auto absolute bottom-12 left-[5%]
      "
      >
        <motion.div initial={{ opacity: 1 }} animate={control}>
          <p>{messages[step].message}</p>
        </motion.div>
        <div className="AuthorAndArrows flex flex-col md:flex-row items-center gap-4 md:justify-between">
          <motion.div initial={{ opacity: 1 }} animate={control}>
            <div className="Author flex flex-col">
              <strong className="text-2xl">{messages[step].author}</strong>
              <span className="text-sm">{messages[step].company}</span>
            </div>
          </motion.div>
          <div className="Arrows flex text-white gap-4">
            <div
              className="rounded-full w-8 h-8 flex items-center justify-center border border-white transition duration-200 hover:cursor-pointer hover:bg-[rgba(0,0,0,0.3)]"
              onClick={handlePrevious}
            >
              <ArrowLeftSVG />
            </div>
            <div
              className="rounded-full w-8 h-8 flex items-center justify-center border border-white transition duration-200 hover:cursor-pointer hover:bg-[rgba(0,0,0,0.3)]"
              onClick={handleNext}
            >
              <ArrowRightSVG />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
