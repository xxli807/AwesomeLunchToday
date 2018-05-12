const SERVER_ADDRESS = '';

export const post = (url, params) => {
  return fetch(SERVER_ADDRESS + url, {
    // credentials: 'same-origin',
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(params)
  })
  .then(resp => resp.json())
  .catch(error => console.log(error));
}

export const get = url =>
  fetch(SERVER_ADDRESS + url, {
    // credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET'
  }).then(resp => resp.json());