"use client";
import React, { useState } from "react";
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
import { LatLngExpression } from "leaflet";
import { axiosInstance } from "@/helpers/axiosInstance";
import { useCalendarContext } from "@/providers/calendarContextProvider/CalendarContextProvider";
import { format } from "date-fns";
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

const CustomSVGOverlay = ({ coordinates, label, centroid, type }: any) => (
  <SVGOverlay
    bounds={coordinates} // Define the bounds of your SVG overlay
    attribution="Custom SVG Overlay"
    className="flex items-center justify-center overflow-hidden"
  >
    <text
      x={type === "MultiPolygon" ? "55%" : "35%"}
      y={type === "MultiPolygon" ? "45%" : "55%"}
      // x={"35%"}
      // y={"55%"}
      overflow="hidden"
      fill="white"
      fontSize="6px"
      className="border border-secondaryRed"
    >
      {label}
    </text>
  </SVGOverlay>
);

const Map = ({ hover, zoom, fill, longitude, latitude }: any) => {
  const obj = useCalendarContext();

  const [hoveredPolygonId, setHoveredPolygonId] = useState<string | null>(null);
  const [orderCount, setOrderCount] = useState(0);
  const getStatesOrderCount = async (stateName: string) => {
    console.log(" i am called", stateName);
    const response = await axiosInstance.post("/order/get-states-order", {
      state: stateName,
    });
    setOrderCount(response?.data?.orderCount);
    console.log("inside map component", response);
  };
  return (
    <div className=" border-2 h-full w-full  relative z-0">
      <MapContainer
        className="h-full w-full "
        // center={[38.0311988, -102.1390331]}
        center={[longitude, latitude]}
        zoom={zoom}
        // zoom={4}
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
          let coordinate: LatLngExpression[] | any;

          if (state.geometry.type === "Polygon") {
            // Handle Polygon geometry
            coordinate = state.geometry.coordinates[0].map((item) => [
              item[1],
              item[0],
            ]);
          } else if (state.geometry.type === "MultiPolygon") {
            // Handle MultiPolygon geometry
            coordinate = state.geometry.coordinates.map((polygon) =>
              polygon[0].map((item: any) => [item[1], item[0]])
            );
          }

          ///////////////////KEEP THIS/////////////////
          // const coordinate: LatLngExpression[] | any =
          //   state.geometry.coordinates[0].map((item) => [item[1], item[0]]);
          ///////////////////KEEP THIS/////////////////

          const population = state.properties.density;
          const stateName = state.properties.name;
          const stateType = state.geometry.type === "Polygon";
          const centroid = calculateCentroid(coordinate);
          const currentDate = new Date();
          const formattedDate = format(currentDate, "MMM d, yyyy");

          const isHovered = state.id === hoveredPolygonId;
          let fillColor = "transparent";
          if (fill && hover) {
            fillColor = isHovered ? "#9A55FF" : "#ADB5BD";
          } else if (fill || hover) {
            fillColor = population > 80 ? "#47178E" : "#CFAFFF";
          }

          if (state.geometry.type === "MultiPolygon") {
            // console.log("insde multipolygon", state.properties.name);
            return coordinate.map((polygon: any, index: number) => (
              <Polygon
                key={`${state.id}-${index}`}
                positions={polygon}
                pathOptions={{
                  fillColor: fillColor,

                  fillOpacity: 1,
                  weight: 1,
                  opacity: 1,
                  color: fill ? "white" : "transparent",
                }}
                eventHandlers={{
                  mouseover: (e) => {
                    setHoveredPolygonId(state.id);
                    getStatesOrderCount(state.properties.name);
                    const layer = e.target;
                    layer.setStyle({
                      filOpacity: 0.7,
                      weight: 1,
                      dashArray: "",
                      color: fill && "#666",
                    });
                  },
                  mouseout: (e) => {
                    setHoveredPolygonId(null);
                    const layer = e.target;
                    layer.setStyle({
                      filOpacity: 0.7,
                      weight: 1,
                      // dashArray: "3",
                      color: fill && "white",
                    });
                  },
                  click: (e) => {
                    getStatesOrderCount(stateName);
                  },
                }}
              >
                {fill && (
                  <div>
                    <Tooltip>
                      <div className="px-[9.82px] bg-white flex flex-col gap-[6.54px]">
                        <p className="font-[600] text-[12px] leading-[18px] text-darkGray font-albertSans">
                          {stateName}
                        </p>
                        <div className="flex items-center gap-[3.27px]">
                          <p className="font-[700] text-[16.36px] leading-[24.54px] text-darkGray font-albertSans">
                            {orderCount}
                          </p>
                          <p className="font-[500] text-[12px] leading-[18px] text-darkGray font-barlow">
                            orders
                          </p>
                        </div>
                        <div className="border border-borderGray" />
                        <p className="font-[600] text-[12px] leading-[18px] text-[#ADB5BD] font-barlow">
                          {formattedDate}
                        </p>
                      </div>
                    </Tooltip>
                    <CustomSVGOverlay
                      label={stateName}
                      centroid={centroid}
                      coordinates={coordinate}
                      type={"MultiPolygon"}
                    />
                  </div>
                )}
              </Polygon>
            ));
          } else {
            return (
              <Polygon
                key={state.id}
                positions={coordinate}
                pathOptions={{
                  fillColor: fillColor,

                  fillOpacity: 1,
                  weight: 1,
                  opacity: 1,

                  color: fill ? "white" : "transparent",
                }}
                eventHandlers={{
                  mouseover: (e) => {
                    setHoveredPolygonId(state.id);
                    getStatesOrderCount(state.properties.name);
                    const layer = e.target;
                    layer.setStyle({
                      filOpacity: 0.7,
                      weight: 1,
                      dashArray: "",
                      color: fill && "#666",
                    });
                  },
                  mouseout: (e) => {
                    setHoveredPolygonId(null);
                    const layer = e.target;
                    layer.setStyle({
                      filOpacity: 0.7,
                      weight: 1,

                      color: fill && "white",
                    });
                  },
                  click: (e) => {},
                }}
              >
                {fill && (
                  <>
                    <Tooltip>
                      <div className="px-[9.82px] bg-white flex flex-col gap-[6.54px]">
                        <p className="font-[600] text-[12px] leading-[18px] text-darkGray font-albertSans">
                          {stateName}
                        </p>
                        <div className="flex items-center gap-[3.27px]">
                          <p className="font-[700] text-[16.36px] leading-[24.54px] text-darkGray font-albertSans">
                            {orderCount}
                          </p>
                          <p className="font-[500] text-[12px] leading-[18px] text-darkGray font-barlow">
                            orders
                          </p>
                        </div>
                        <div className="border border-borderGray" />
                        <p className="font-[600] text-[12px] leading-[18px] text-[#ADB5BD] font-barlow">{formattedDate}</p>
                      </div>
                    </Tooltip>
                    <CustomSVGOverlay
                      label={stateName}
                      centroid={centroid}
                      coordinates={coordinate}
                      type={"Polygon"}
                    />
                  </>
                )}
              </Polygon>
            );
          }
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
