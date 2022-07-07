import Models from 'imports/models.import';
import { reducers } from 'interfaces/common.interface';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Functions from 'utils/functions.utils';
import { setCoinList } from 'utils/redux.utils';
import uuid from 'react-uuid';
import InfiniteScroll from 'react-infinite-scroll-component';
import './coins.screen.scss';
import { CoinComponent } from 'imports/components.import';
import { useNavigate } from 'react-router-dom';

const Coins = (props: any) => {
  const [state, setState] = Functions.useSetState({
    limit: 50,
    skip: 0,
    loading: true,
    total: 400,
  });
  const coinList = useSelector((state: reducers) => state.coin.coinList);
  const navigate = useNavigate();

  useEffect(() => {
    getCoins();
  }, [state.skip]);

  const getCoins = async () => {
    try {
      let query = {
        limit: state.limit,
        skip: state.skip,
      };
      const coins: any = await Models.coin.list(query);
      console.log('coins', coins);
      if (state.skip === 0) {
        setCoinList(coins.data.data);
      } else {
        setCoinList([...coinList, ...coins.data.data]);
      }
      setState({ loading: false });
    } catch (err) {
      Functions.Failure('Failed to get coins');
    }
  };

  return (
    <div className="coin_screen">
      {state.loading ? (
        <div>Loading...</div>
      ) : (
        <div className="coin_screen_wrapper" id="scrollableDiv">
          <InfiniteScroll
            scrollableTarget="scrollableDiv"
            dataLength={coinList.length} //This is important field to render the next data
            next={() => setState({ skip: state.skip + state.limit })}
            hasMore={state.total === coinList.length ? false : true}
            loader={<h4>Loading...</h4>}
            className="coin_infinity_scroll"
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>
                &#8593; Release to refresh
              </h3>
            }>
            {coinList.map((coin) => (
              <div className="coin_content" key={uuid()}>
                <CoinComponent
                  name={coin.name}
                  id={coin._id}
                  image={coin?.image?.large}
                  onClick={() => navigate('/' + coin.id)}
                />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default Coins;
