export const TYPE = {
  LOADING: 'loadingReducer::loading',
};

export const startLoading = () => ({
  type: TYPE.LOADING,
  loading: true,
});

export const stopLoading = () => ({
  type: TYPE.LOADING,
  loading: false,
});


export default {
  startLoading,
  stopLoading,
}