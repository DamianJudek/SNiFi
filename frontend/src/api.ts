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

export const getIntegrations = () =>
  fetch(`${apiBase}/integrations`, { method: "GET" });

type SetIntegrationsBody = {
  discordWebhookUrl?: undefined | string;
  telegramBotToken?: undefined | string;
  telegramChatId?: undefined | string;
};

export const setIntegrations = (
  webhook: string,
  botToken: string,
  chatId: string
) => {
  const body: SetIntegrationsBody = {};
  if (webhook !== undefined) {
    body.discordWebhookUrl = webhook;
  }

  if (botToken !== undefined) {
    body.telegramBotToken = botToken;
  }

  if (chatId !== undefined) {
    body.telegramChatId = chatId;
  }

  return fetch(`${apiBase}/integrations`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};
