export const TYPE = {
  START: 'notificationReducer::start',
  STOP: 'notificationReducer::stop',
};

export const start = (style, formatted) => ({
  type: TYPE.START,
  style,
  formatted,
});

export const stop = () => ({
  type: TYPE.STOP,
});

export default {
  start,
  stop,
}