import cauldronLayer from "@/assets/images/cauldron.png";
import "./Mortar.css";

const Mortar = () => {
  return (
    <div className="mortar-wrapper">
      {/* <div className="mortar-layer" style={{ backgroundImage: `url(${cauldronLayer})` }}></div> */}
      <button type="button" className="mortar-btn" aria-label="Motar"></button>
    </div>
  );
};

export default Mortar;