import { useState, useEffect, useRef, useCallback } from "react"
import { Coordinates } from "utils/types"
import {
    GoogleMap,
    useLoadScript,
    Marker,
} from "@react-google-maps/api";

import { MapContainer } from "./styles"

const libraries = ["places"];
const mapStyle = {
    height: "100%",
    width: "100%",
};

const mapExtraStyles = [
    {
        "featureType": "poi",
        "stylers": [
            { "visibility": "off" }
        ]
    }
]

const options = {
    zoomControl: true,
    mapTypeControl: false,
    fullscreenControl: false,
    styles: mapExtraStyles
};

type LocationProps = {
    coordinates: Coordinates
}

export default function MapFragment({ coordinates }: LocationProps) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
        libraries,
    });
    const [marker, setMarker] = useState<Coordinates>(coordinates);
    const [center, setCenter] = useState<Coordinates>();
    useEffect(() => {
        setCenter(coordinates)
    }, [])

    const mapRef = useRef(null);
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    if (loadError) return <h2>Error</h2>;
    if (!isLoaded) return <h2>"Loading..."</h2>;

    return (
        <MapContainer>
            <GoogleMap
                id="map"
                mapContainerStyle={mapStyle}
                zoom={16}
                center={center}
                options={options}
                onLoad={onMapLoad}
            >
                {process.browser && marker !== {} && (
                    <Marker
                        key={`${marker.lat}-${marker.lng}`}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: `/icons/availableIcon.svg`,
                            origin: new (window as any).google.maps.Point(0, 0),
                            anchor: new (window as any).google.maps.Point(15, 15),
                            scaledSize: new (window as any).google.maps.Size(50, 50),
                        }}
                    />
                )}
            </GoogleMap>
        </MapContainer>
    )
}