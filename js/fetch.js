const URLS = {
  GET: 'https://23.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://reqres.in/api/users'
}


const request = (onSuccess, onError, method, data) => {
  fetch(URLS[method], {
    method: method,
    body: data,
  })
  .then((response) => response.json())
  .then((data) => {
    onSuccess(data)
  })
  .catch(() =>
    onError()
    )


}

export{ request }
