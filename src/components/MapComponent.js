// MapComponent.js
import React, { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  useEffect(() => {
    // Create colored icon
    const coloredIcon = (color) => {
      return new L.Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
    };

    // Example transaction data with colors
    const transactionData = [
      { location: [10.7769, 106.7009], description: 'Transaction 1', color: 'red' },
      { location: [21.0285, 105.8542], description: 'Transaction 2', color: 'blue' },
      // Add more transaction data as needed
    ];

    const bounds = [
      [8.18, 102.14], // Southwest coordinates
      [23.39, 109.46] // Northeast coordinates
    ];

    // Create Leaflet map
    const map = L.map('map').setView([16.4, 106.04], 5);
    map.setMaxBounds(bounds);
    map.on('drag', () => {
      map.panInsideBounds(bounds, { animate: false });
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Loop through transaction data and add markers to the map
    transactionData.forEach((transaction, index) => {
      const marker = L.marker(transaction.location, { icon: coloredIcon(transaction.color) });
      marker.bindPopup(transaction.description);
      marker.addTo(map);
    });

    return () => {
      // Clean up when component unmounts
      map.remove();
    };
  }, []); // Empty dependency array ensures that this effect runs once on mount

  return (
    <div id="map" style={{ height: '400px' }}>a</div>
  );
};

export default MapComponent;