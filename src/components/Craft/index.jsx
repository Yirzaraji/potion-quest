import "./Craft.css";
import Cauldron from "@/assets/images/cauldron.png";

const Craft = () => { 

    return(
        <div className="cauldron">
            <img className="test no-repeat bg-cover fixed bottom-[215px] right-[780px]" src={Cauldron} alt="" style={{ backgroundImage: `url(${Cauldron})`, width:'395px' }} />
        </div>
    );
}

export default Craft;