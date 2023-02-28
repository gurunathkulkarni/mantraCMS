export const get = (url, header = {}) => {
  return fetch(url, header)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error(
          `Bad response from server ${url} - status: ${response.status} - message -${response.statusText}`
        );
      }
      if (response.status < 400) {
        return response.json();
      }
      return response.json();
    })
    .then((response) => {
      return response;
    });
};

export const post = async (url, obj, header = {}) => {
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...header,
    },
    body: JSON.stringify(obj),
  })
    .then((response) => {
      if (response.status >= 400) {
        throw new Error(
          `Bad response from server ${url} - status: ${response.status} - message -${response.statusText}`
        );
      }
      if (response.status < 400) {
        return response.json();
      }
      return response.json();
    })
    .then((response) => {
      return response;
    });
};

export const put = (url, obj, header = {}) => {
  return fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...header,
    },
    body: JSON.stringify(obj),
  })
    .then((response) => {
      if (response.status >= 400) {
        throw new Error(
          `Bad response from server ${url} - status: ${response.status} - message -${response.statusText}`
        );
      }
      if (response.status < 400) {
        return response.json();
      }
      return response.json();
    })
    .then((response) => {
      return response;
    });
};

export const deleteMethod = (url, header = {}) => {
  return fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...header,
    },
  })
    .then((response) => {
      if (response.status >= 400) {
        throw new Error(
          `Bad response from server ${url} - status: ${response.status} - message -${response.statusText}`
        );
      }
      if (response.status < 400) {
        return response.json();
      }
      return response.json();
    })
    .then((response) => {
      return response;
    });
};
