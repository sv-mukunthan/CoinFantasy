import Models from 'imports/models.import';
import React, { useEffect } from 'react';
import { filterDays } from 'utils/constant.utils';
import Functions from 'utils/functions.utils';
import './home.screen.scss';
import { Chart, Image } from 'imports/components.import';
import Assets from 'imports/assets.import';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const Home = (props: any) => {
  const [state, setState] = Functions.useSetState({
    value: 1,
    find: 'hour',
    coin: {},
    loading: true,
    series: [],
    category: [],
  });
  const { coin } = useParams();

  useEffect(() => {
    getCoinList();
  }, [state.value]);

  useEffect(() => {
    getCoinDetails();
  }, []);

  const getCoinDetails = async () => {
    try {
      const coinDetails: any = await Models.coin.marketChart({ coinId: coin });
      console.log('coinDetails', coinDetails);
      setState({ coin: coinDetails.data.data, loading: false });
    } catch (err) {
      Functions.Failure('Failed to get coin details');
    }
  };

  const getCoinList = async () => {
    try {
      let timestamb = await Functions.getTimeStamp(state.find, state.value);
      const coinData: any = await Models.coin.marketDataRange({
        coinId: coin,
        vs_currency: 'usd',
        from: timestamb,
        to: moment().unix(),
      });
      console.log('coins', coinData);
      let series = coinData.data.data.prices.map((data) => data[0]);
      let categories = coinData.data.data.prices.map((data) => data[1]);
      setState({ series, category: categories });
    } catch (err) {
      console.log('err', err);
      Functions.Failure('Failed to get coin market range');
    }
  };

  return (
    <div className="home_screen">
      <div className="home_screen_container">
        {!state.loading ? (
          <div className="home_screen_wrapper">
            <div className="head_wrapper">
              <div className="head_content">
                <div className="coin_name head3">
                  {state.coin.name +
                    ' (' +
                    state.coin.symbol.toUpperCase() +
                    ')'}
                </div>
                <div className="coin_price head2">
                  $ {state.coin.coingecko_score}
                </div>
                <div className="coin_priority">
                  Gain/loss 24hr: <span className="green_text">+7.12%</span>
                </div>
              </div>
              <div className="head_content_filter">
                {filterDays.map((filter) => (
                  <div
                    className={`filter_text ${
                      state.value == filter.value && 'active_filter'
                    }`}
                    onClick={() =>
                      setState({ find: filter.find, value: filter.value })
                    }>
                    {filter.title}
                  </div>
                ))}
              </div>
            </div>
            <div className="chart_container">
              <div className="chart_wrapper">
                <Chart series={state.series} category={state.category} />
              </div>
            </div>
            <div className="coin_details_container">
              <div className="coin_details_wrapper">
                <div className="coin_content first_content">
                  <div className="coin_detail_header">Market Cap</div>
                  <div className="market_cap_content">
                    <Image
                      src={Assets.ArrowGreen}
                      alt="green_arrow"
                      width="17px"
                      height="10px"
                    />
                    <div className="padding_right head3">
                      {'$' +
                        state.coin.market_data.market_cap[state.coin.symbol]}
                    </div>
                  </div>
                </div>
                <div className="coin_content second_content">
                  <div className="coin_detail_header">Market Cap Rank</div>
                  <div className="head3">
                    {'#' + state.coin.market_cap_rank}
                  </div>
                </div>
                <div className="coin_content third_content">
                  <div className="coin_detail_header">24 hr Volume</div>
                  <div className="head3">Test</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Home;
