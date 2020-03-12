export const TYPE = {
  START: 'notificationReducer::start',
  STOP: 'notificationReducer::stop',
};

export const start = (notification) => ({
  type: TYPE.START,
  notification,
});

export const stop = () => ({
  type: TYPE.STOP,
});

export default {
  start,
  stop,
}