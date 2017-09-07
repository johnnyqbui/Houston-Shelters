import config from '../config';

export const getAll = () =>
  fetch(config.api.baseURL)
    .then(res => res.json())

export const search = (query) =>
  fetch(`${config.api.baseURL}/?${query}`)
    .then(res => res.json())
