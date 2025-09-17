import React, { useState, useEffect } from 'react';
import {
  MapPin, Shield, Battery, Wifi, Phone, Clock,
  AlertTriangle, CheckCircle, Users, Navigation, User,
  Share2, Copy, ExternalLink
} from 'lucide-react';
interface DeviceMonitorProps {
  user: any;
}

const DeviceMonitor: React.FC<DeviceMonitorProps> = ({ user }) => {
  const [deviceData, setDeviceData] = useState({
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: "Loading location...",
      timestamp: new Date()
    },
    networkStatus: 'connected',
    safetyStatus: 'safe',
    lastUpdate: new Date(),
    emergencyContacts: []
  });
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  // Load emergency contacts from localStorage on component mount
  useEffect(() => {
    const savedContacts = localStorage.getItem('emergencyContacts');
    if (savedContacts) {
      try {
        const contacts = JSON.parse(savedContacts);
        setDeviceData(prev => ({
          ...prev,
          emergencyContacts: contacts
        }));
      } catch (error) {
        console.error('Error loading emergency contacts:', error);
      }
    }
  }, []);

  // Function to get address from coordinates using reverse geocoding
  const getAddressFromCoordinates = async (lat: number, lng: number) => {
    try {
      // Using a free geocoding service (you can replace with Google Maps API if you have a key)
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      const data = await response.json();
      
      if (data.city && data.principalSubdivision) {
        return `${data.city}, ${data.principalSubdivision}, ${data.countryCode}`;
      } else if (data.locality) {
        return `${data.locality}, ${data.countryCode}`;
      } else {
        return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      }
    } catch (error) {
      console.error('Error getting address:', error);
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  };

  // Get user's current location
  useEffect(() => {
    const getCurrentLocation = () => {
      if (!navigator.geolocation) {
        setLocationError('Geolocation is not supported by this browser');
        setIsLoadingLocation(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const address = await getAddressFromCoordinates(latitude, longitude);
          
          setDeviceData(prev => ({
            ...prev,
            location: {
              lat: latitude,
              lng: longitude,
              address: address,
              timestamp: new Date()
            }
          }));
          setIsLoadingLocation(false);
          setLocationError(null);
        },
        (error) => {
          let errorMessage = 'Unable to retrieve location';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied by user';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
          }
          setLocationError(errorMessage);
          setIsLoadingLocation(false);
          
          // Set fallback location
          setDeviceData(prev => ({
            ...prev,
            location: {
              lat: 40.7128,
              lng: -74.0060,
              address: "Location unavailable",
              timestamp: new Date()
            }
          }));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    };

    getCurrentLocation();

    // Update location every 5 minutes
    const locationInterval = setInterval(getCurrentLocation, 300000);

    return () => clearInterval(locationInterval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'emergency': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Function to add and save emergency contact
  const handleAddEmergencyContact = () => {
    const name = prompt("Enter contact name:");
    if (!name || !name.trim()) return;

    const phone = prompt("Enter contact phone number:");
    if (!phone || !phone.trim()) return;

    const newContact = {
      name: name.trim(),
      phone: phone.trim(),
      status: 'available' as const,
      id: Date.now() // Add unique ID for better management
    };

    const updatedContacts = [...deviceData.emergencyContacts, newContact];

    // Update state
    setDeviceData(prev => ({
      ...prev,
      emergencyContacts: updatedContacts
    }));

    // Save to localStorage
    try {
      localStorage.setItem('emergencyContacts', JSON.stringify(updatedContacts));
    } catch (error) {
      console.error('Error saving emergency contacts to localStorage:', error);
      alert('Failed to save contact. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Device Monitor</h1>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            isLoadingLocation ? 'bg-yellow-500 animate-pulse' : 
            locationError ? 'bg-red-500' : 'bg-green-500 animate-pulse'
          }`}></div>
          <span className="text-sm text-gray-600">
            {isLoadingLocation ? 'Locating...' : locationError ? 'Offline' : 'Live'}
          </span>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Safety Status</p>
              <p className={`text-lg font-semibold ${getStatusColor(deviceData.safetyStatus).split(' ')[0]}`}>
                {deviceData.safetyStatus.charAt(0).toUpperCase() + deviceData.safetyStatus.slice(1)}
              </p>
            </div>
            <Shield className={`h-10 w-10 ${getStatusColor(deviceData.safetyStatus)}`} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Network</p>
              <p className={`text-lg font-semibold ${
                locationError ? 'text-red-600' : 'text-green-600'
              }`}>
                {locationError ? 'Limited' : 'Connected'}
              </p>
            </div>
            <Wifi className={`h-10 w-10 ${
              locationError ? 'text-red-600' : 'text-green-600'
            }`} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Last Update</p>
              <p className="text-lg font-semibold text-blue-600">
                {deviceData.lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <Clock className="h-10 w-10 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Location Tracking */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Current Location</h2>
            <MapPin className="h-6 w-6 text-blue-600" />
          </div>
          
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${
              locationError ? 'bg-red-50' : isLoadingLocation ? 'bg-yellow-50' : 'bg-blue-50'
            }`}>
              <div className="flex items-center space-x-3 mb-2">
                <Navigation className={`h-5 w-5 ${
                  locationError ? 'text-red-600' : isLoadingLocation ? 'text-yellow-600' : 'text-blue-600'
                }`} />
                <span className={`font-semibold ${
                  locationError ? 'text-red-900' : isLoadingLocation ? 'text-yellow-900' : 'text-blue-900'
                }`}>
                  {isLoadingLocation ? 'Getting Location...' : locationError ? 'Location Error' : 'Live Location'}
                </span>
              </div>
              <p className={`${
                locationError ? 'text-red-800' : isLoadingLocation ? 'text-yellow-800' : 'text-blue-800'
              }`}>
                {locationError || deviceData.location.address}
              </p>
              {!locationError && (
                <p className={`text-sm mt-1 ${
                  isLoadingLocation ? 'text-yellow-600' : 'text-blue-600'
                }`}>
                Coordinates: {deviceData.location.lat.toFixed(4)}, {deviceData.location.lng.toFixed(4)}
                </p>
              )}
              {locationError && (
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-2 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                >
                  Retry Location Access
                </button>
              )}
            </div>
            
            {/* Previous location - Location History
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Location History (Last 24 hours)</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Home</span>
                  <span className="text-xs text-gray-500">8 hours ago</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Office Downtown</span>
                  <span className="text-xs text-gray-500">12 hours ago</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Shopping Center</span>
                  <span className="text-xs text-gray-500">18 hours ago</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Emergency Contacts</h2>
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div className="space-y-4">
            {deviceData.emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Phone className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={handleAddEmergencyContact}
              className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              + Add Emergency Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceMonitor;