interface ICoin {
  coinList: any[];
}
export interface reducers {
  test: object;
  user: object;
  coin: ICoin;
}
export interface storeAction {
  type: string;
  payload: any;
}
