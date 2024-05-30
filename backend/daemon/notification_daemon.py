def load_notification_config(collection):
    integrations = [integration for integration in collection.find({})]
    for integration in integrations:
        if integration["type"] == "telegram":
            init_telegram()
        elif integration["type"] == "discord":
            init_discord()
        else:
            print("Unsupported notification integration:", integration["type"])


def init_telegram():
    pass


def init_discord():
    pass
