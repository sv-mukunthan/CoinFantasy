import Models from 'imports/models.import';
import React, { useEffect } from 'react';
import { filterDays } from 'utils/constant.utils';
import Functions from 'utils/functions.utils';
import './home.screen.scss';
import { Chart, Image } from 'imports/components.import';
import Assets from 'imports/assets.import';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import uuid from 'react-uuid';

const Home = (props: any) => {
  const [state, setState] = Functions.useSetState({
    value: 1,
    find: 'hour',
    currentPrice: 0,
    marketCap: 0,
    rank: 0,
    volume: 0,
    average: 0,
    symbol: '',
    name: '',
    persentage24: 0,
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
      const coinDetails: any = await Models.coin.marketChart({
        ids: [coin],
        coinId: coin,
        vs_currency: 'usd',
        sparkline: true,
      });
      setState({
        rank: coinDetails.coinData?.market_cap_rank,
        currentPrice: coinDetails.marketData[0].current_price,
        symbol: coinDetails.coinData.symbol,
        name: coinDetails.coinData.name,
        persentage24: coinDetails.marketData[0].price_change_percentage_24h,
        marketCap: coinDetails.marketData[0].market_cap,
        volume: coinDetails.marketData[0].total_volume,
        loading: false,
      });
    } catch (err) {
      Functions.Failure('Failed to get coin details');
    }
  };

  const average = async (arr) => {
    return (await arr.reduce((p, c) => p + c[1], 0)) / arr.length;
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
      setState({ series: coinData.data.data.prices });
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
                  {state.name + ' (' + state.symbol.toUpperCase() + ')'}
                </div>
                <div className="coin_price head2">${state.currentPrice}</div>
                <div className="coin_priority">
                  Gain/loss 24hr:{' '}
                  <span
                    className={`${
                      state.persentage24 > 0 ? 'green_text' : 'red_text'
                    }`}>
                    {state.persentage24 > 0 ? '+' : '-'}
                    {Functions.formatPersentage(state.persentage24)}
                  </span>
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
                    }
                    key={uuid()}>
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
                      <div>{Functions.formatDoller(state.marketCap, 10)}</div>
                    </div>
                  </div>
                </div>
                <div className="coin_content second_content">
                  <div className="coin_detail_header">Market Cap Rank</div>
                  <div className="head3">{'#' + state.rank}</div>
                </div>
                <div className="coin_content third_content">
                  <div className="coin_detail_header">24 hr Volume</div>
                  <div className="head3">
                    {Functions.formatDoller(state.volume, 10)}
                  </div>
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
