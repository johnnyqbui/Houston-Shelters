const api = "https://api.harveyneeds.org/api/v1/shelters"

export const getAll = () =>
  fetch(api)
    .then(res => res.json())

export const search = (query) =>
  fetch(`${api}/?${query}`)
    .then(res => res.json())
