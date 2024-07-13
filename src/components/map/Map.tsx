"use client"
import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import MarkerIcon from "../node_modules/leaflet/dist/images/marker-icon-2x.png"
import MarkerShadow from "../node_modules/leaflet/dist/images/marker-shadow.png"
// import MarkerIcon from "leaflet/dist/images/marker-icon.png"
import "leaflet/dist/leaflet.css"

const Map = () => {
  return (
    <div className=' border-2 h-full w-full'>
    <MapContainer className='h-full w-full' center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
 <TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
<Marker position={[51.505, -0.09]}>
  <Popup>
    A pretty CSS3 popup. <br /> Easily customizable.
  </Popup>
</Marker>
</MapContainer>
    </div>
  )
}

export default Map
