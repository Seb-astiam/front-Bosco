import React from 'react';
import Sponsor from '../Sponsor/Sponsor'; // Asegúrate de que la ruta del archivo sea correcta

export const Sponsors = () => {
  // Aquí supongamos que tenemos un array de URLs de imágenes de sponsors
  const sponsorImages = [
    "/divdflex@2x.png",
    "/divdflex-1@2x.png",
    "/divdflex-2@2x.png",
    "/divdflex-3@2x.png",
    "/divdflex-4@2x.png",
    "/divdflex@2x.png"
    
  ];

  return (
    <section className="self-stretch flex flex-row items-start justify-center pt-0 pb-[95.90000000000008px] pr-5 pl-10 box-border max-w-full shrink-0 text-center text-mini-5 text-midnightblue font-inter">
      <div className="w-[1290px] flex flex-col items-end justify-start gap-[60px_0px] max-w-full mq900:gap-[30px_0px]">
        <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 ">
          <div className="w-[193.6px] relative leading-[28.13px] flex items-center justify-center shrink-0">
            Empresas que confían en BOSCO
          </div>
        </div>
        <Sponsor images={sponsorImages} />
      </div>
    </section>
  );
};
