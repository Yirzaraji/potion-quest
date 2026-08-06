import Cauldron from './Cauldron';
import Mortar from './Mortar';
import './Craft.css';

const Craft = ({
  cauldronItems,
  onDropInCauldron,
  onRemoveFromCauldron,
  onLightFire,
  onDropInMortar,
}) => {
  return (
    <div className="craft-container">
      <Mortar onDropIngredient={onDropInMortar} />
      <Cauldron
        cauldronItems={cauldronItems}
        onDropIngredient={onDropInCauldron}
        onRemoveIngredient={onRemoveFromCauldron}
        onLightFire={onLightFire}
      />
    </div>
  );
};

export default Craft;