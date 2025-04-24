const DeviceCard = ({ device }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold">{device.id}</h2>
      <p className="text-gray-600">{device.type}</p>
      <p className="text-gray-600">{device.ip}</p>
      <p className="text-gray-600">{device.location}</p>
    </div>
  )
}

export default DeviceCard
