import cauldronLayer from "@/assets/images/cauldron.png";
import "./Craft.css";

const Craft = () => {
  return (
    <div className="cauldron-wrapper">
      <div className="cauldron-layer" style={{ backgroundImage: `url(${cauldronLayer})` }}></div>
      <button type="button" className="cauldron-btn" aria-label="Chaudron"></button>
    </div>
  );
};

export default Craft;