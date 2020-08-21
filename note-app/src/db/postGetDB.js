
export async function sendData(items) {

  const url = 'http://localhost:5000/item/post';
  const data = items;

  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
  let result = await response.json();
  return result;
}

export async function getData() {
  const url = 'http://localhost:5000/list/get';
  let response = await fetch(url);
  return response.json();
}

export async function deleteList(list) {
  const url = 'http://localhost:5000/list/delete';
  const data = list;
  let response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
  let result = await response.json();
  return result;
}

export async function updateList(list) {
  const url = 'http://localhost:5000/list/update';
  const data = list;
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
  let result = await response.json();
  return result;
}

export async function updateItem(list) {
  const url = 'http://localhost:5000/item/update';
  const data = list;
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
  let result = await response.json();
  return result;
}