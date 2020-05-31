var url = 'http://10.0.2.2:3000'; //This must be without the last slash

export function loginUser(email, password) {
  let data = {
    Email: email,
    Password: password,
  };
  console.log(email + password);

  fetch(url + '/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(newObj => console.log(newObj));
}

export function registerUser(email, password, phone, name) {
  let data = {
    Email: email,
    Password: password,
    Phone: phone,
    Name: name,
  };

  fetch(url + '/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(newObj => console.log(newObj));
}
