const backendBase = "http://localhost:5000";
const mlBase = "http://localhost:5001";

export const getDevices = () =>
  fetch(`${backendBase}/devices`, { method: "GET" });

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

  return fetch(`${backendBase}/device/${mac}/update`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
};

export const getDnsStats = () =>
  fetch(`${backendBase}/dns_stats`, { method: "GET" });

export const getIntegrations = () =>
  fetch(`${backendBase}/integrations`, { method: "GET" });

type SetIntegrationsBody = {
  discordWebhookUrl?: undefined | string;
  telegramBotToken?: undefined | string;
  telegramChatId?: undefined | string;
};

export const setIntegrations = async (
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

  return fetch(`${backendBase}/integrations`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export const getNotifications = () =>
  fetch(`${backendBase}/notifications`, { method: "GET" });

export const sendPcapFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return fetch(`${mlBase}/predict`, {
    method: "POST",
    body: formData,
  });
};

export const getPredictStatus = async (scanId: string) =>
  fetch(`${mlBase}/predict/${scanId}`, {
    method: "GET",
  });

export const getPredictResult = async (scanId: string) =>
  fetch(`${mlBase}/predict/result/${scanId}`, {
    method: "GET",
  });

export const getDnsList = () =>
  fetch(`${backendBase}/dns_queries`, { method: "GET" });
