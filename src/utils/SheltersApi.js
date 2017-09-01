const api = "https://sheetsu.com/apis/v1.0/1d3a0d0e1b21/sheets"

export const getAll = () =>
  fetch(`${api}/Shelters`)
    .then(res => res.json())

export const search = (query) =>
  fetch(`${api}/Shelters/search?${query}&ignore_case=false`)
    .then(res => res.json())
