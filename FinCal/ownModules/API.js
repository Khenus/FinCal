var url = 'http://10.0.2.2:3000'; //This must be without the last slash

export async function getLedger(action, email, uuid) {
  let data = {
    Email: email,
    UUID: uuid,
    Action: action,
  };

  var result = await fetch(url + '/getLedger/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      throw err;
    });

  return result;
}