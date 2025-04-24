import { useState, useEffect } from 'react'
import DeviceCard from './components/DeviceCard'
import { fetchDevices } from './api/devices'

function App() {
  const [devices, setDevices] = useState([])

  useEffect(() => {
    const loadDevices = async () => {
      const data = await fetchDevices()
      setDevices(data.devices)
    }
    loadDevices()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Network Management Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices.map(device => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>
    </div>
  )
}

export default App
