import "./Spinner.css";
const Spinner = ({ name }) => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="aqua-loader">
        <div className="aqua-loader-inner"></div>
      </div>
      <p className="ml-3 font-poppins text-lg text-[#626472]">
        Loading Aqua Auto {name}...
      </p>
    </div>
  );
};

export default Spinner;
