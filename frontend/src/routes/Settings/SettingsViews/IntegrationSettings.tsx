import { useState, ChangeEvent } from "react";
import Divider from "../../../components/Divider/Divider";
import { ConfirmButton } from "../Settings.styled";
import {
  Description,
  IntegrationName,
  InputLabel,
} from "./IntegrationSettings.styled";
import Input from "../../../components/Input/Input";

const IntegrationSettings = () => {
  const [webhook, setWebhook] = useState("");
  const [botToken, setBotToken] = useState("");
  const [chatId, setChatId] = useState("");
  const [discordAnyChanges, setAnyChanges] = useState<boolean>(false);

  const handleDiscordWebhookChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWebhook(e.target.value);
    setAnyChanges(true);
  };

  const handleTelegramBotTokenChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBotToken(e.target.value);
    setAnyChanges(true);
  };

  const handleTelegramChatIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChatId(e.target.value);
    setAnyChanges(true);
  };
  // const sendDiscordEvent = () => {
  //   fetch(
  //     "https://discord.com/api/webhooks/1238097350749065276/7ooqFQAnedLAPF9FiwPO-GwTqN9xmDOgmAQ_39ik4g7V55F7larU-Ba2vic5s9zIKxfF",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ content: "test" }),
  //     }
  //   );
  // };

  // const sendTelegramEvent = async () => {
  //   const botToken = "6696190820:AAFOW68zBudIb6obJwF4RGn8uR5RRggu-PY";
  //   const chat_id = "-1002016276047";
  //   const message = "some message";
  //   const res = await fetch(
  //     `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chat_id}&text=${message}`,
  //     {
  //       method: "GET",
  //     }
  //   );
  //   console.log({ res });
  // };

  return (
    <>
      {/* <button onClick={sendTelegramEvent}>send message </button> */}
      <Description>
        Here you can define your own communication channels to which you will
        receive notification if a threat is detected in the network
      </Description>
      <IntegrationName>Discord</IntegrationName>
      <InputLabel>Discord webhook</InputLabel>
      <Input
        placeholder="webhook url"
        fullWidth={false}
        onChange={handleDiscordWebhookChange}
        value={webhook}
      />
      <Divider spacing="medium" />
      <IntegrationName>Telegram</IntegrationName>
      <InputLabel>bot token</InputLabel>
      <Input
        placeholder="XYZ:XYZ"
        fullWidth={false}
        onChange={handleTelegramBotTokenChange}
        value={botToken}
      />
      <InputLabel>chat_id</InputLabel>
      <Input
        placeholder="-123456789"
        fullWidth={false}
        onChange={handleTelegramChatIdChange}
        value={chatId}
      />
      <ConfirmButton disabled={!discordAnyChanges}>Save</ConfirmButton>
    </>
  );
};

export default IntegrationSettings;
