import React from "react";
import { DateSearch } from "../components/DateSearch/DateSearch";
import SocialFooter from "../components/Footer/SocialFooter";
import { Navbar } from "../components/NavBar/NavBar";
import {Cards} from "../components/Cards/Cards"
import ContactFooter from "../components/Footer/ContactFooter";
import { Sponsors } from "../components/Sponsors/Sponsors";



const Home = () => {
  return (
    <div className="w-full relative bg-white flex flex-col items-start justify-start pt-0 px-0 pb-0 box-border gap-[52px_0px] tracking-[normal] mq900:gap-[26px_0px]"> 
       
      <div className="flex-1 overflow-hidden flex flex-col items-start justify-start pt-[22px] px-[245px] pb-[126.70000000000005px] box-border relative gap-[143.7px_0px] max-w-full z-[1] text-left text-40xl-5 text-midnightblue font-inter mq900:gap-[36px_0px] mq900:pl-[61px] mq900:pr-[61px] mq900:pb-[53px] mq900:box-border mq1300:gap-[72px_0px] mq1300:pt-5 mq1300:px-[122px] mq1300:pb-[82px] mq1300:box-border">
      
      <div className="w-[1320px] h-[296.4px] relative hidden max-w-full z-[0]" />
      
      <div className="w-full h-[732.6px] absolute !m-[0] top-[5px] right-[0px] left-[0px]">
      <Navbar/>

        <img
          className="absolute top-[-1443.1px] left-[-204.3px] w-[2000.2px] h-[2175.7px] "
          alt=""
          src="/ellipse-shape.svg"
        />
       
      </div>   
      
      <div className="w-[880px] flex flex-row items-start justify-start py-7 px-[70px] box-border max-w-full mq1300:pl-[35px] mq1300:pr-[35px] mq1300:box-border">
      
        <div className="flex-1 flex flex-col items-start justify-start gap-[21px_0px] max-w-full">
       
          <div className="w-[539px] h-[151px] relative leading-[80px] font-semibold flex items-center shrink-0 max-w-full z-[3] mq450:text-17xl mq450:leading-[43px] mq900:text-29xl mq900:leading-[58px]">
            frase clave
          </div>
          

          <div className="self-stretch flex flex-col items-start justify-start gap-[64.2px_0px] max-w-full text-mini-6 mq450:gap-[16px_0px] mq900:gap-[32px_0px]">
            <div className="h-[48.1px] relative leading-[28.13px] flex items-center shrink-0 max-w-full z-[3]">
              
              <span>
                <p className="m-0">
                  textotextotextotextotextotextovv
                </p>
                <p className="m-0">anytime, anywhere</p>
              </span>
             
            

            </div>
           
            <DateSearch />
            
          </div>
         
        </div> 
          
      </div>
      <Cards/> 
    </div>
       

      <section className="w-[1889.2px] flex flex-row items-start justify-center pt-0 px-5 pb-[95.70000000000005px] box-border max-w-full shrink-0 text-left text-[29.3px] text-midnightblue font-inter mq450:pb-[62px] mq450:box-border">
        <div className="w-[1231.2px] flex flex-col items-start justify-start gap-[40px_0px] max-w-full mq900:gap-[20px_0px]">
          <b className="w-[267.3px] relative leading-[45px] flex items-center mq450:text-4xl mq450:leading-[36px]">
            Por que BOSCO
          </b>
          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0.5 pl-0 gap-[0px_73px] text-mid-7 mq450:gap-[0px_18px] mq900:gap-[0px_36px] mq1300:flex-wrap">
            <div className="flex-1 flex flex-col items-start justify-start gap-[30px_0px] min-w-[167px]">
              <img
                className="w-[60px] h-[60px] relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/ticketsvg.svg"
              />
              <div className="self-stretch h-[117.3px] flex flex-col items-start justify-start gap-[14px_0px]">
                <div className="relative leading-[27px] font-medium">
                  TITULO
                </div>
                <div className="flex-1 relative text-mini-9 leading-[28.13px] flex items-center">
                  <span>
                    <p className="m-0">textotextotextotextotexto</p>
                    <p className="m-0">textotextotextotextotexto</p>
                    <p className="m-0">textotextotextotextotexto</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-start gap-[30px_0px] min-w-[167px]">
              <img
                className="w-[60px] h-[60px] relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/hotairballoonsvg.svg"
              />
              <div className="self-stretch h-[117.3px] flex flex-col items-start justify-start gap-[14px_0px]">
                <div className="relative leading-[27px] font-medium">
                TITULO
                </div>
                <div className="flex-1 relative text-mini-6 leading-[28.13px] flex items-center">
                  <span>
                    <p className="m-0">textotextotextotextotexto</p>
                    <p className="m-0">
                    textotextotextotextotextotextovv
                    </p>
                    <p className="m-0">textotextotextotexto</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-[0.9202] flex flex-col items-start justify-start py-0 pr-[20.5px] pl-0 box-border gap-[30px_0px] min-w-[167px] text-lg mq450:flex-1">
              <img
                className="w-[60px] h-[60px] relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/diamondsvg.svg"
              />
              <div className="self-stretch h-[89.1px] flex flex-col items-start justify-start gap-[14px_0px]">
                <h2 className="m-0 relative text-inherit leading-[27px] font-medium font-inherit">
                TITULO
                </h2>
                <div className="flex-1 relative text-mini-6 leading-[28.13px] flex items-center">
                  <span>
                    <p className="m-0">textotextotextotextotexto</p>
                    <p className="m-0">textotextotextotextotexto</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="h-[179.1px] flex flex-col items-start justify-start gap-[30px_0px] text-[17.9px]">
              <img
                className="w-[60px] h-[60px] relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/medalsvg.svg"
              />
              <div className="flex-1 flex flex-col items-start justify-start gap-[14px_0px]">
                <div className="relative leading-[27px] font-medium">
                TITULO
                </div>
                <div className="flex-1 relative text-mini-5 leading-[28.13px] flex items-center">
                  <span>
                    <p className="m-0">textotextotextotextotexto</p>
                    <p className="m-0">textotextotextotextotexto</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Sponsors />


      <section className="self-stretch overflow-hidden flex flex-row items-start justify-between py-[120px] px-[315px] box-border relative max-w-full shrink-0 gap-[20px] text-left text-[39.4px] text-white font-inter mq900:p-[78px] mq900:box-border mq1300:pl-[157px] mq1300:pr-[157px] mq1300:box-border mq1650:flex-wrap mq1650:justify-center">
        <img
          className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src="/shape-container@2x.png"
        />
        <div className="flex flex-col items-start justify-start pt-[94.80000000000018px] px-0 pb-0 box-border min-w-[408.4px] max-w-full mq450:pt-[62px] mq450:box-border mq1300:min-w-full mq1650:flex-1">
          <div className="flex flex-col items-start justify-start gap-[14px_0px] max-w-full">
           
            <div className="flex flex-col items-start justify-start gap-[64.1px_0px] text-mini-6 mq450:gap-[32px_0px]">
              <div className="h-[76.3px] relative leading-[28.13px] flex items-center shrink-0 z-[1]">
                <span style={{ marginTop: '-190px' }}>
                  <p className="m-0">
                    Traveling under your own power and at your own pace,
                  </p>
                  <p className="m-0">
                    you'll connect more meaningfully with your destination and
                  </p>
                  <p className="m-0">have more fun!</p>
                </span>
              </div>
             
            </div>
          </div>
        </div>
        <div className="w-[590px] flex flex-row items-start justify-start gap-[0px_30px] min-w-[590px] max-w-full text-center text-[38.9px] text-chocolate-100 mq900:flex-wrap mq1300:min-w-full mq1650:flex-1">
          <div className="flex-1 flex flex-col items-start justify-start gap-[30px_0px] min-w-[182px]">
          <div className="self-stretch rounded-xl bg-white flex flex-col items-start justify-start pt-10 pb-[35.90000000000009px] pr-[78px] pl-[78.20000000000005px] gap-[20px_0px] z-[1] mq450:pl-5 mq450:pr-5 mq450:box-border mx-auto"> {/* Agregamos mx-auto para centrar */}
              <div className="flex flex-row items-start justify-start py-0 pr-8 pl-[31.799999999999955px]">
                 <img
                     className="h-[60px] w-[60px] relative overflow-hidden shrink-0"
                      loading="lazy"
                       alt=""
                    src="/1svg.svg"
                   />
           </div>
           <div className="self-stretch flex flex-col items-start justify-start items-center justify-center"> {/* Agregamos items-center y justify-center para centrar */}
               <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[23px] pl-[23.299999999999955px]">
                  <b className="flex-1 relative leading-[56px] mq450:text-4xl mq450:leading-[34px] mq900:text-[31px] mq900:leading-[45px]">
                         240
                  </b>
                </div>
                <div className="self-stretch relative text-mini-5 leading-[28.13px] text-midnightblue">
                 Ciudades
             </div>
            </div>
          </div>
            <div className="self-stretch rounded-xl bg-white flex flex-col items-start justify-start pt-10 pb-[35.90000000000009px] pr-[78px] pl-[78.20000000000005px] gap-[20px_0px] z-[1] mq450:pl-5 mq450:pr-5 mq450:box-border mx-auto"> 
              <div className="flex flex-row items-center justify-start py-0 pr-8 pl-[31.799999999999955px]">
                <img
                  className="h-[60px] w-[60px] relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="/3svg.svg"
                />
              </div>
              <div className="self-stretch flex flex-col items-start justify-start">
                <b className="self-stretch relative leading-[56px] mq450:text-3xl mq450:leading-[34px] mq900:text-11xl mq900:leading-[45px]">
                  92,842
                </b>
                <div className="self-stretch flex flex-row items-start justify-start py-0 pr-2 pl-[7px] text-mini-8 text-midnightblue">
                  <div className="flex-1 relative leading-[28.13px] whitespace-nowrap">
                    Usuarios felices
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-start pt-[135px] px-0 pb-0 box-border min-w-[182px] text-[36.6px] mq450:pt-[88px] mq450:box-border">
            <div className="self-stretch rounded-xl bg-white flex flex-col items-center justify-start pt-10 px-5 pb-[35.90000000000009px] gap-[20px_0px] z-[1]">
              <div className="flex flex-row items-start justify-start py-0 pr-5 pl-[20.299999999999955px]">
                <img
                  className="h-[60px] w-[60px] relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="/2svg.svg"
                />
              </div>
              <div className="w-[100.8px] flex flex-col items-start justify-start">
                <div className="self-stretch flex flex-row items-start justify-start py-0 pr-1 pl-[3.699999999999932px]">
                  <b className="flex-1 relative leading-[56px] whitespace-nowrap mq450:text-3xl mq450:leading-[34px] mq900:text-[29px] mq900:leading-[45px]">
                    3672
                  </b>
                </div>
                <div className="self-stretch relative text-mini-3 leading-[28.13px] text-midnightblue">
                  Hospedajes
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="w-[1862.2px] flex flex-row items-start justify-center pt-0 px-5 pb-[77px] box-border max-w-full shrink-0 text-left text-[29.8px] text-midnightblue font-inter mq450:pb-[50px] mq450:box-border">
        <div className="w-[1290.2px] flex flex-col items-start justify-start gap-[45px_0px] max-w-full mq900:gap-[22px_0px]">
          <div className="self-stretch flex flex-row items-end justify-between gap-[20px] mq450:flex-wrap">
            <b className="relative leading-[45px] mq450:text-5xl mq450:leading-[36px]">
              Special Offers
            </b>
            <div className="flex flex-row items-start justify-start gap-[0px_9.8px] text-mini-3">
              <div className="relative leading-[28.13px]">Mas ofertas</div>
              <div className="w-[16.2px] flex flex-col items-start justify-start pt-1.5 px-0 pb-0 box-border text-base">
                <h2 className="m-0 self-stretch h-4 relative text-inherit leading-[16px] font-normal font-inherit flex items-center shrink-0">
                  
                </h2>
              </div>
            </div>
          </div>
          <div className="self-stretch grid flex-row items-start justify-start gap-[0px_30px] max-w-full grid-cols-[repeat(3,_minmax(307px,_1fr))] text-base-9 text-white mq900:grid-cols-[minmax(307px,_1fr)] mq1300:justify-center mq1300:grid-cols-[repeat(2,_minmax(307px,_533px))]">
            <div className="flex flex-col items-start justify-start py-[58.59999999999991px] px-[30px] box-border relative gap-[5.1px_0px] max-w-full">
              <img
                className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-xl max-w-full overflow-hidden max-h-full object-cover"
                loading="lazy"
                alt=""
                src="/image@2x.png"
              />
              <b className="relative leading-[20.8px] inline-block max-w-[20%] z-[1]">
                Enjoy Upto
              </b>
              <b className="relative text-[23.8px] leading-[31.2px] capitalize inline-block max-w-[27%] z-[1] mq450:text-lgi mq450:leading-[25px]">
                60 % OFF
              </b>
              <b className="relative text-base-6 leading-[20.8px] inline-block max-w-[30%] z-[1]">
                on Your Booking
              </b>
            </div>
            <div className="h-[200px] flex flex-col items-start justify-start pt-[75.90000000000009px] px-[30px] pb-[36.10000000000037px] box-border relative gap-[5px_0px] max-w-full text-base">
              <img
                className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-xl max-w-full overflow-hidden max-h-full object-cover"
                loading="lazy"
                alt=""
                src="/image-1@2x.png"
              />
              <h2 className="m-0 relative text-inherit leading-[20.8px] font-bold font-inherit inline-block max-w-[27%] z-[1]">
                80% Discount
              </h2>
              <b className="flex-1 relative text-[23.3px] leading-[31.2px] capitalize flex items-center max-w-[41%] z-[1] mq450:text-lgi mq450:leading-[25px]">
                <span>
                  <p className="m-0">Are You Ready</p>
                  <p className="m-0">To Turkey Tour</p>
                </span>
              </b>
            </div>
            <div className="h-[200px] flex flex-row items-start justify-start py-12 px-[30px] box-border relative max-w-full text-[23.4px] text-black">
              <img
                className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-xl max-w-full overflow-hidden max-h-full object-cover"
                loading="lazy"
                alt=""
                src="/image-2@2x.png"
              />
              <b className="relative leading-[31.2px] capitalize z-[1] mq450:text-lgi mq450:leading-[25px]">
                <p className="m-0">Discover the wow</p>
                <p className="m-0">of europe</p>
              </b>
            </div>
          </div>
        </div>
      </section>


      <footer className="self-stretch bg-midnightblue flex flex-col items-start justify-start pt-0 px-0 pb-0 box-border max-w-full shrink-0 text-left text-mini-5 text-white font-inter">
        <SocialFooter />
        <ContactFooter />
        
        <div className="self-stretch flex flex-row items-start justify-between pt-[23.09999999999991px] pb-[22px] pr-[310px] pl-[315px] gap-[20px] border-t-[1px] border-solid border-gray-300 mq900:pl-[78px] mq900:pr-[77px] mq900:box-border mq1300:flex-wrap mq1300:pl-[157px] mq1300:pr-[155px] mq1300:box-border">
          <div className="flex flex-col items-start justify-start pt-[1.900000000000091px] px-0 pb-0">
            <div className="h-5 relative leading-[28.13px] flex items-center shrink-0">
              © Copyright EmaFacenini 2024
            </div>
          </div>
          <div className="flex flex-row items-start justify-center [row-gap:20px] mq450:flex-wrap">
            <img
              className="h-6 w-12 relative overflow-hidden shrink-0 object-cover min-h-[24px]"
              loading="lazy"
              alt=""
              src="/image-3@2x.png"
            />
            <img
              className="h-6 w-12 relative overflow-hidden shrink-0 object-cover min-h-[24px]"
              loading="lazy"
              alt=""
              src="/image-4@2x.png"
            />
            <img
              className="h-6 w-12 relative overflow-hidden shrink-0 object-cover min-h-[24px]"
              loading="lazy"
              alt=""
              src="/image-5@2x.png"
            />
            <img
              className="h-6 w-12 relative overflow-hidden shrink-0 object-cover min-h-[24px]"
              loading="lazy"
              alt=""
              src="/image-6@2x.png"
            />
            <img
              className="h-6 w-12 relative overflow-hidden shrink-0 object-cover min-h-[24px]"
              loading="lazy"
              alt=""
              src="/image-7@2x.png"
            />
            <img
              className="h-6 w-12 relative overflow-hidden shrink-0 object-cover min-h-[24px]"
              loading="lazy"
              alt=""
              src="/image-8@2x.png"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
