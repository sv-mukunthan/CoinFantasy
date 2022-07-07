import { Image } from 'imports/components.import';
import React from 'react';
import './coin.component.scss';

interface ICoin {
  name: string;
  id: string;
  image?: string;
  onClick?: any;
}

const CoinComponent = (props: ICoin) => {
  const { name, id, image, onClick } = props;
  return (
    <div className="coin_component" onClick={onClick}>
      <div className="coin_component_wrapper">
        <div className="coin_image_wrapper">
          <Image
            src={image}
            alt={'image' + id}
            width={'50px'}
            height="50px"
            borderRadius="50%"
            boxShadow="none"
          />
        </div>
        <div className="coin_name head3">{name}</div>
      </div>
    </div>
  );
};

export default CoinComponent;
