export const TYPE = {
  START: 'loadingReducer::start_loading',
  STOP: 'loadingReducer::stop_loading',
};

export const startLoading = (loadingType) => ({
  type: TYPE.START,
  loading: loadingType,
});

export const stopLoading = (loadingType) => ({
  type: TYPE.STOP,
  loading: loadingType,
});


export default {
  startLoading,
  stopLoading,
}