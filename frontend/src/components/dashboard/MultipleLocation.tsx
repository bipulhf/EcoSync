"use client";

import {
  APIProvider,
  InfoWindow,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";
import React from "react";
import { useState } from "react";

export default function MultipleLocation({ sts }: any) {
  const [open, setOpen] = useState(false);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY as string}>
      <Map
        defaultZoom={11}
        defaultCenter={{
          lat: sts[0]?.latitude || 23.7593748,
          lng: sts[0]?.longitude || 90.3185111,
        }}
        disableDefaultUI={true}
        fullscreenControl={false}
        className="h-[55vh] w-[90vw] md:w-[75vw] lg:w-[70vw] xl:w-[55vw]"
      >
        {sts.map((sts: any) => (
          <React.Fragment key={sts.id}>
            <Marker
              position={{ lat: sts.latitude, lng: sts.longitude }}
              key={sts.id}
              onClick={() => setOpen(!open)}
            />
            {open && (
              <InfoWindow position={{ lat: sts.latitude, lng: sts.longitude }}>
                <p className="text-sm">Ward No: {sts.ward}</p>
              </InfoWindow>
            )}
          </React.Fragment>
        ))}
      </Map>
    </APIProvider>
  );
}
