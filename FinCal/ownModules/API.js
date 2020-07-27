var url = 'http://10.0.2.2:3000'; //This must be without the last slash

export async function register(email, uuid, name, phone) {
  let data = {
    Email: email,
    uuid: uuid,
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

export async function login(uuid) {
  let data = {
    uuid: uuid,
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

export async function fetchTransact(uuid, numEntry) {
  let data = {
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

export async function getAllTrans(fromUUID, toUUID) {
  let data = {
    fromUUID: fromUUID,
    toUUID: toUUID,
  };

  var result = await fetch(url + '/getAllTrans/', {
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

export async function addJio(
  peepsArr,
  creatorUUID,
  creatorName,
  orderObj,
  resIdx,
  jioTitle,
  jioComments,
) {
  let data = {
    peepsArr: peepsArr,
    creatorUUID: creatorUUID,
    creatorName: creatorName,
    orderObj: orderObj,
    resIdx: resIdx,
    jioTitle: jioTitle,
    jioComments: jioComments,
  };

  var result = await fetch(url + '/addJio/', {
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

export async function getJio(queryUUID) {
  let data = {
    queryUUID: queryUUID,
  };

  var result = await fetch(url + '/fetchJio/', {
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

export async function updateOrder(currUUID, jioUUID, orderObj, orderStatus) {
  let data = {
    currUUID: currUUID,
    jioUUID: jioUUID,
    orderObj: orderObj,
    orderStatus: orderStatus,
  };

  var result = await fetch(url + '/updateOrder/', {
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

export async function fetchFullMyJio(jobUUID) {
  let data = {
    jobUUID: jobUUID,
  };

  var result = await fetch(url + '/fetchFullMyJio/', {
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

export async function closeJio(
  jobUUID,
  currName,
  currUUID,
  detailsArr,
  jioTitle,
) {
  let data = {
    jobUUID: jobUUID,
    currName: currName,
    currUUID: currUUID,
    detailsArr: detailsArr,
    jioTitle: jioTitle,
  };

  var result = await fetch(url + '/closeJio/', {
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

export async function deleteLedger(ledgerUUID) {
  let data = {
    ledgerUUID: ledgerUUID,
  };

  var result = await fetch(url + '/deleteLedger/', {
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

export async function paidLedger(ledgerUUID) {
  let data = {
    ledgerUUID: ledgerUUID,
  };

  var result = await fetch(url + '/paidLedger/', {
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

export async function newLedger(
  fromObj,
  toArr,
  amt,
  type,
  catIdx,
  category,
  detail,
  currDate,
) {
  let data = {
    fromObj: fromObj,
    toArr: toArr,
    Amount: amt,
    Type: type,
    catIdx: catIdx,
    Category: category,
    Detail: detail,
    currDate: currDate,
  };

  var result = await fetch(url + '/newLedger/', {
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
