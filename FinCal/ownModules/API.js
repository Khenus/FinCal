var url = 'http://10.0.2.2:3000'; //This must be without the last slash

export async function register(email, pass, name, phone) {
  let data = {
    Email: email,
    Password: pass,
    Name: name,
    Phone: phone,
  };

  var result = await fetch(url + '/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw err;
    });

  return result;
}

export async function login(email, pass) {
  let data = {
    Email: email,
    Password: pass,
  };

  var result = await fetch(url + '/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw err;
    });

  return result;
}

export async function fetchTransact(email, uuid, numEntry) {
  let data = {
    Email: email,
    uuid: uuid,
    numEntry: numEntry,
  };

  var result = await fetch(url + '/fetchTransact/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw err;
    });

  return result;
}

export async function addTransact(
  email,
  uuid,
  date,
  title,
  amt,
  type,
  catIdx,
  category,
  desc,
  unixDate,
) {
  let data = {
    Email: email,
    uuid: uuid,
    date: date,
    Title: title,
    Amount: amt,
    Type: type,
    catIdx: catIdx,
    Category: category,
    Desc: desc,
    unixDate: unixDate,
  };

  var result = await fetch(url + '/addTransact/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw err;
    });

  return result;
}

export async function getLedger(action, email, uuid) {
  let data = {
    Email: email,
    uuid: uuid,
    Action: action,
  };

  var result = await fetch(url + '/getLedger/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw err;
    });

  return result;
}

export async function getTransHist(fromUUID, toUUID) {
  let data = {
    fromUUID: fromUUID,
    toUUID: toUUID,
  };

  var result = await fetch(url + '/getTransHist/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw err;
    });

  return result;
}

export async function searchNum(phone) {
  let data = {
    Phone: phone,
  };

  var result = await fetch(url + '/searchNum/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw err;
    });

  return result;
}

// export async function getThisMonthTransact(email, uuid) {
//   let data = {
//     Email: email,
//     uuid: uuid,
//   };

//   var result = await fetch(url + '/getThisMonthTransact/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
//     .then((res) => {
//       return res.json();
//     })
//     .catch((err) => {
//       throw err;
//     });

//   return result;
// }
