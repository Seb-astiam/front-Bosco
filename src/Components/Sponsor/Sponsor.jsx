

const Sponsor = ({ images }) => {
  return (
    <div className="flex flex-row items-start justify-center gap-[0px_30px] mq1300:flex-wrap">
      {images.map((image, index) => (
        <img
          key={index}
          className="h-[30px] w-[190px] relative object-cover min-h-[30px]"
          loading="lazy"
          alt={`Sponsor ${index + 1}`}
          src={image}
        />
      ))}
    </div>
  );
};

export default Sponsor;
