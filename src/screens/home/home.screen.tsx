import Models from 'imports/models.import';
import React, { useEffect } from 'react';
import './home.screen.scss';

const Home = (props: any) => {
  useEffect(() => {
    getCoinList();
  }, []);

  const getCoinList = async () => {
    try {
      // const coins = await Models.coin.list({ limit: 20, skip: 0 });
      const coin = await Models.coin.get({ _id: '62c5d45f732d067c8d225202' });
      console.log('coins', coin);
    } catch (err) {
      console.log('err', err);
    }
  };

  return <div>Home</div>;
};

export default Home;
