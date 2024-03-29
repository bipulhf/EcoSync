"use client";

import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";

export default function ShowDirection({
  setOpen,
  sts_postition,
  landfill_position,
}: any) {
  return (
    <>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY as string}>
        <Map
          style={{ width: "85vw", height: "75vh" }}
          defaultCenter={landfill_position}
          defaultZoom={12}
          gestureHandling={"greedy"}
          zoomControl={true}
        >
          <Direction
            sts_postition={sts_postition}
            landfill_position={landfill_position}
          />
        </Map>
      </APIProvider>
    </>
  );
}

function Direction({ sts_postition, landfill_position }: any) {
  const map = useMap();
  const routesLib = useMapsLibrary("routes");
  const [directionService, setDirectionService] =
    useState<google.maps.DirectionsService>();
  const [directionRenderer, setDirectionRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);

  useEffect(() => {
    if (!map || !routesLib) return;
    setDirectionService(new routesLib.DirectionsService());
    setDirectionRenderer(new routesLib.DirectionsRenderer({ map }));
  }, [routesLib, map]);

  useEffect(() => {
    if (!directionService || !directionRenderer) return;
    directionService
      .route({
        origin: { lat: sts_postition.lat, lng: sts_postition.lng },
        destination: { lat: landfill_position.lat, lng: landfill_position.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((res) => {
        directionRenderer.setDirections(res);
        setRoutes(res.routes);
      });
  }, [directionService, directionRenderer]);
  console.log(routes);

  return null;
}
