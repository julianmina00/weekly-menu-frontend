export interface ReduxAction<P> {
  type: string;
  payload: P;
}
