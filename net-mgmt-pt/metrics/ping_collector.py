import subprocess
import time
import requests
from datetime import datetime

PUSHGATEWAY_URL = "http://localhost:9091"
DEVICES = [
    {"name": "SW1", "ip": "192.168.1.10"},
]

def ping(host):
    try:
        output = subprocess.check_output(
            ["ping", "-n", "1", host],
            stderr=subprocess.STDOUT,
            universal_newlines=True
        )
        return "TTL=" in output
    except subprocess.CalledProcessError:
        return False

def main():
    while True:
        for device in DEVICES:
            status = 1 if ping(device["ip"]) else 0
            metric = f'network_device_up{{device="{device["name"]}"}} {status}'
            
            try:
                requests.post(f"{PUSHGATEWAY_URL}/metrics/job/ping_collector", 
                            data=metric)
            except requests.exceptions.RequestException as e:
                print(f"Error pushing metrics: {e}")
        
        time.sleep(60)

if __name__ == "__main__":
    main()
