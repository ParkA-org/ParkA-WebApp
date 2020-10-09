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
const center = {
    lat: 18.487876,
    lng: -69.962292,
};


export default function LocationPicker() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
        libraries,
    });
    const [marker, setMarker] = useState<Coordinates>({});
    const [selected, setSelected] = useState(null);

    const onMapClick = useCallback((e) => {
        console.log(`Latitud: ${e.latLng.lat()}`)
        console.log(`Longitud: ${e.latLng.lng()}`)
        setMarker(
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                time: new Date(),
            },
        );
    }, []);

    const mapRef = useRef(null);
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = useCallback(({ lat, lng }) => {
        if (process.browser) {
            if (mapRef.current) {
                mapRef.current!.panTo({ lat, lng });
                mapRef.current!.setZoom(16);
            }
        }
    }, []);

    useEffect(() => {
        navigator && navigator.geolocation.getCurrentPosition(
            (position) => {
                panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            () => null
        );
    }, [])

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
                onClick={onMapClick}
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
                            scaledSize: new (window as any).google.maps.Size(30, 30),
                        }}
                    />
                )}
            </GoogleMap>
        </MapContainer>
    )
}