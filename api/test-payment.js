import requests

# Your actual Basic Auth token from PayHero
YOUR_BASIC_AUTH_TOKEN = "Basic QWpBeXNOMFpSWDZIalBBTVVXb206UkNmczh0UkN1RmRZTFdMdFBaaHU0UlkxQjVEODQ0ZWNqeHgzaml4WQ=="

BASE_URL = "https://backend.payhero.co.ke"
ENDPOINT = "/api/v2/payment_channels"

url = f"{BASE_URL}{ENDPOINT}"

headers = {
    "Authorization": f"Basic {YOUR_BASIC_AUTH_TOKEN}",
    "Content-Type": "application/json"
}

try:
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        print("Successfully retrieved payment channels:")
        print(response.json())
    else:
        print(f"Error: {response.status_code} - {response.text}")

except requests.exceptions.RequestException as e:
    print(f"An error occurred: {e}")
