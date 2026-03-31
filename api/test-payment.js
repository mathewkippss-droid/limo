import requests

# Replace with your actual Basic Authorization Token
# You obtain this from your PayHero account's API Keys section.
YOUR_BASIC_AUTH_TOKEN = "YOUR_GENERATED_BASIC_AUTH_TOKEN"

# The base URL for PayHero API
BASE_URL = "https://backend.payhero.co.ke"

# The endpoint to retrieve payment channels
ENDPOINT = "/api/v2/payment_channels"

# Construct the full URL
url = f"{BASE_URL}{ENDPOINT}"

# Set the headers for the request
headers = {
    "Authorization": f"Basic {Basic QWpBeXNOMFpSWDZIalBBTVVXb206UkNmczh0UkN1RmRZTFdMdFBaaHU0UlkxQjVEODQ0ZWNqeHgzaml4WQ==}",
    "Content-Type": "application/json"
}

try:
    # Make the GET request
    response = requests.get(url, headers=headers)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        print("Successfully retrieved payment channels:")
        print(response.json())
    else:
        print(f"Error: {response.status_code} - {response.text}")

except requests.exceptions.RequestException as e:
    print(f"An error occurred: {e}")
