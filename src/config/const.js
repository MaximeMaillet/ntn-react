export const LOADING = {
  LOGIN:            1 << 0,
  TORRENTS:         1 << 1,
  SERVER:           1 << 2,
  PROFILE:          1 << 3,
  FORM_META_SIMPLE: 1 << 4,
  FORM_PROFILE:     1 << 5,
  FORM_TORRENT:     1 << 6,
};

export const ROLES = {
  NONE: 0,
  BOT:    1 << 0,
  USER:   1 << 1,
  ADMIN:  1 << 2,
};