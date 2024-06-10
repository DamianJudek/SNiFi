import requests
class Integration:
    def __init__(self):
        self.discordConfigured = False
        self.discordWebhookUrl = ''
        self.telegramConfigured = False
        self.telegramBotToken = ''
        self.telegramChatId = ''
    
    def load_notification_config(self, collection):
        integrations = [integration for integration in collection.find({})]
        for integration in integrations:
            if integration["type"] == "telegram":
                self.init_telegram(integration["details"])
            elif integration["type"] == "discord":
                self.init_discord(integration["details"])
            else:
                print("Unsupported notification integration:", integration["type"])

    def init_telegram(self, details):
        if(details["telegramBotToken"] and details["telegramChatId"]):
            self.telegramConfigured = True
            self.telegramBotToken=details["telegramBotToken"]
            self.telegramChatId=details["telegramChatId"]


    def init_discord(self, details):
        if(details["discordWebhookUrl"]):
            self.discordConfigured = True
            self.discordWebhookUrl=details["discordWebhookUrl"]

    def create_message(self, notification):
        if(notification["type"] == "new_device"):
            return f'We detected new device with {notification["device"]["mac"]} mac address on your network'
        if(notification["type"] == "ip_change"):
            return  "One of the devices on your network has changed its IP address"
        if(notification["type"] == "device_offline"):
            return "One of the devices has disappeared from your network"
        if(notification["type"] == "blocked_query"):
            return f'We have blocked the DNS query to a suspicious domain: {notification["query"]}'
    

    def send_notification(self, notification):
        message = self.create_message(notification)
        
        if(self.discordConfigured):
            headers = {
                'Content-Type': 'application/json'
            } 
            payload = {
                'content': message
            }

            requests.post(self.discordWebhookUrl, headers=headers,json=payload)
        
        if(self.telegramConfigured):
            url = f'https://api.telegram.org/bot{self.telegramBotToken}/sendMessage?chat_id={self.telegramChatId}&text={message}'
            requests.get(url)
    

integration = Integration()
