export const fetchDevices = async () => {
  const response = await fetch('http://localhost:8000/devices')
  const data = await response.json()
  return data
}
