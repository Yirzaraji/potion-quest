import Cauldron from './Cauldron';
import Mortar from './Mortar';
import './Craft.css';

const Craft = () => {
  return (
    <div className="craft-container">
      <Mortar/>
      <Cauldron/>
    </div>
  );
}

export default Craft;