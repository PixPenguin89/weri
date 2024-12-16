import requests
import json

# Define the URL for querying the Cosmos blockchain (public RPC endpoint)
COSMOS_API_URL = "https://rpc.cosmos.network"

def get_latest_block_height():
    """Get the latest block height from the Cosmos blockchain."""
    try:
        # Send a request to the Cosmos blockchain's /status endpoint
        response = requests.get(f"{COSMOS_API_URL}/status")
        
        # Check if the response was successful
        if response.status_code == 200:
            data = response.json()
            block_height = data['result']['sync_info']['latest_block_height']
            print(f"Latest Block Height: {block_height}")
        else:
            print("Failed to fetch block height. Status code:", response.status_code)
    except Exception as e:
        print(f"Error fetching data: {e}")

def get_block_by_height(block_height):
    """Get the block details by block height."""
    try:
        # Send a request to the Cosmos blockchain's /block endpoint
        response = requests.get(f"{COSMOS_API_URL}/block/{block_height}")
        
        # Check if the response was successful
        if response.status_code == 200:
            data = response.json()
            block_data = json.dumps(data, indent=4)
            print(f"Block Data for Height {block_height}:\n{block_data}")
        else:
            print(f"Failed to fetch block data for block height {block_height}. Status code:", response.status_code)
    except Exception as e:
        print(f"Error fetching data for block {block_height}: {e}")

def get_validator_info():
    """Get information about the validators in the Cosmos blockchain."""
    try:
        # Send a request to the Cosmos blockchain's /validators endpoint
        response = requests.get(f"{COSMOS_API_URL}/validators")
        
        # Check if the response was successful
        if response.status_code == 200:
            data = response.json()
            validators = data['result']['validators']
            print("Validators Information:")
            for validator in validators:
                print(f"Validator Name: {validator['description']['moniker']}, Status: {validator['status']}")
        else:
            print("Failed to fetch validators. Status code:", response.status_code)
    except Exception as e:
        print(f"Error fetching validators data: {e}")

if __name__ == "__main__":
    # Example 1: Get the latest block height
    get_latest_block_height()
    
    # Example 2: Get the block data for a specific block height (e.g., 100000)
    get_block_by_height(100000)
    
    # Example 3: Get information about validators in the Cosmos blockchain
    get_validator_info()
