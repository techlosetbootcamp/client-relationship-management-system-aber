"use client";
import React from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Polygon,
  Tooltip,
  Pane,
  SVGOverlay,
} from "react-leaflet";
// import MarkerIcon from "../node_modules/leaflet/dist/images/marker-icon-2x.png";
// import MarkerShadow from "../node_modules/leaflet/dist/images/marker-shadow.png";
// import MarkerIcon from "leaflet/dist/images/marker-icon.png"
import "leaflet/dist/leaflet.css";

import { statesData } from "@/constants/TempData";
import { color } from "chart.js/helpers";
import ReactLeafletTextPath from "react-leaflet-textpath";
import { LatLngExpression } from "leaflet";
const calculateCentroid = (coords: string | any[]) => {
  let centroidX = 0,
    centroidY = 0;
  for (let i = 0; i < coords.length; i++) {
    centroidX += coords[i][0];
    centroidY += coords[i][1];
  }
  centroidX /= coords.length;
  centroidY /= coords.length;
  return [centroidX, centroidY];
};

const CustomSVGOverlay = ({ coordinates,label,centroid }:any) => (
  <SVGOverlay
    bounds={coordinates}  // Define the bounds of your SVG overlay
    attribution="Custom SVG Overlay"
    className="flex items-center justify-center overflow-hidden"
  >
    <text x={"35%"} y={"55%"} overflow="hidden" fill="white" fontSize="6px" className="border border-secondaryRed">{label}</text>
  </SVGOverlay>
);

const Map = () => {
  return (
    <div className=" border-2 h-full w-full">
      <MapContainer
        className="h-full w-full"
        center={[38.0311988, -102.1390331]}
        zoom={4}
        scrollWheelZoom={false}
      >
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=af7g8iXCQ6841F3rXk0i"
          // url='https://maps.app.goo.gl/Aw2JvVjkXxZPSAao8'
        />
        {/* <Marker position={[38.0311988, -102.1390331]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}

        {statesData.features.map((state) => {
          const coordinate : LatLngExpression[] | any= state.geometry.coordinates[0].map((item) => [
            item[1],
            item[0],
          ]);

          // console.log("here is coordinate",coordinate[0])
          const population = state.properties.density;
          const stateName = state.properties.name;
          const stateType = state.geometry.type==="Polygon"
          const centroid = calculateCentroid(coordinate);
          // console.log("centroid", centroid)

          return (
            <Polygon
            key={state.id}
              positions={coordinate}
              pathOptions={{
                // fillColor:`"#a220cd",`
                fillColor: `${population > 80 ? "#47178E" : "#CFAFFF"}`,
                fillOpacity: 1,
                weight: 1,
                opacity: 1,
                // dashArray:'3',
                color: "white",
              }}
        
              eventHandlers={{
                mouseover: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    filOpacity: 0.7,
                    weight: 1,
                    dashArray: "",
                    color: "#666",
                  });
                },
                mouseout: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    filOpacity: 0.7,
                    weight: 1,
                    // dashArray: "3",
                    color: "white",
                  });
                },
                click: (e) => {},
              }}
            >
              {/* <ReactLeafletTextPath
        positions={coordinate}
        text={stateName}
        // center
        offset={10}
    /> */}

    {/* {
      centroid!=null && 
              <ReactLeafletTextPath
                positions={[41.476292, -72.812885]}
                offset={10}
                 
                options={{
                  repeat: true,
                  attributes: { "fill": "white", "font-size": "12px",

                    "dx":5,
                    "dy":10
                   },
                }}
                
                center
                align
                text={stateName}
              />
    } */}
                
              {/* </ReactLeafletTextPath> */}
              {/* <Pane>hello</Pane> */}
              {/* <div>hello</div> */}
              <Tooltip>{stateName}</Tooltip>
              {/* <p className="border-2 text-[#000] text-[20px]">population</p> */}


              <CustomSVGOverlay label={stateName} centroid={centroid} coordinates={coordinate} />
            </Polygon>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
