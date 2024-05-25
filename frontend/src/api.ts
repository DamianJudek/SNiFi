const apiBase = "http://localhost:5000";

export const getDevices = () => fetch(`${apiBase}/devices`, { method: "GET" });

type UpdateDeviceBody = {
  isNew?: undefined | boolean;
  name?: undefined | string;
  isBlocked?: undefined | boolean;
};

export const updateDevice = (
  mac: string,
  isNew?: undefined | boolean,
  name?: undefined | string,
  isBlocked?: undefined | boolean
) => {
  const body: UpdateDeviceBody = {};
  if (name !== undefined) {
    body.name = name;
  }

  if (isNew !== undefined) {
    body.isNew = isNew;
  }

  if (isBlocked !== undefined) {
    body.isBlocked = isBlocked;
  }

  return fetch(`${apiBase}/device/${mac}/update`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
};

export const getDnsStats = () =>
  fetch(`${apiBase}/dns_stats`, { method: "GET" });
