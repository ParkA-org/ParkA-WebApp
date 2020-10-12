import { useState, useEffect, useRef, useCallback } from "react"
import { BsSearch } from "react-icons/bs"
import { AiOutlineMenu } from "react-icons/ai"
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import FilterSideBar from "components/FilterSidebar"
import { Container, ButtonsContainer, ButtonSection, ControllersContainer, MapContainer, Legend, LegendContainer, SearchContainer } from "./styles"

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

export default function MapViewer(): JSX.Element {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
        libraries,
    });
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [showFilters, setShowFilters] = useState(false)

    const onMapClick = useCallback((e) => {
        setMarkers((current) => [
            ...current,
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                time: new Date(),
            },
        ]);
    }, []);

    const mapRef = useRef(null);
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = useCallback(({ lat, lng }) => {
        if (process.browser) {
            if (mapRef && mapRef.current) {
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
        <div>
            <Container>
                <ControllersContainer>
                    <ButtonsContainer>
                        <ButtonSection>
                            <button onClick={() => { setShowFilters(!showFilters) }} style={{ backgroundColor: "transparent" }}>
                                <AiOutlineMenu color="#333" size="1.5rem" /></button>
                            <Search panTo={panTo} />
                            <BsSearch color="#cecccd" size="1.5rem" />
                            {showFilters && <FilterSideBar />}
                        </ButtonSection>
                    </ButtonsContainer>
                    <LegendContainer>
                        <Legend>
                            <p><img className="img" src="/icons/unavailableIcon.svg" alt="Icono Ocupado" />Ocupado</p>
                            <p><img className="img" src="/icons/availableIcon.svg" alt="Icono Disponible" />Disponible</p>
                        </Legend>
                    </LegendContainer>
                </ControllersContainer>
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
                        {markers.map((marker) => {
                            return process.browser ? (
                                <Marker
                                    key={`${marker.lat}-${marker.lng}`}
                                    position={{ lat: marker.lat, lng: marker.lng }}
                                    onClick={() => {
                                        setSelected(marker);
                                    }}
                                    icon={{
                                        url: `/icons/availableIcon.svg`,
                                        origin: new (window as any).google.maps.Point(0, 0),
                                        anchor: new (window as any).google.maps.Point(15, 15),
                                        scaledSize: new (window as any).google.maps.Size(30, 30),
                                    }}
                                />
                            ) : (marker)
                        })}

                        {selected ? (
                            <InfoWindow
                                position={{ lat: selected.lat, lng: selected.lng }}
                                onCloseClick={() => {
                                    setSelected(null);
                                }}
                            >
                                <div>
                                    <h2>Parqueo!</h2>
                                    <p>Parqueo disponible</p>
                                </div>
                            </InfoWindow>
                        ) : null}
                    </GoogleMap>
                </MapContainer>
                <style jsx>
                    {
                        `
                        .img {
                            width: 55px;
                            height: 55px;
                        }
                    `
                    }
                </style>
            </Container>
        </div>
    );
}

function Search({ panTo }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 43.6532, lng: () => -79.3832, equals: null, toUrlValue: null, toJSON: null },
            radius: 100 * 1000,
            componentRestrictions: {
                country: "do"
            }
        },
    });

    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };

    return (
        <SearchContainer>
            <Combobox onSelect={handleSelect} aria-e>
                <ComboboxInput
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Buscar en zona"
                    style={{
                        padding: "0.25em",
                        height: "100%",
                        border: "none",
                        width: "90%"
                    }}
                />
                <ComboboxPopover style={{ zIndex: 15, marginTop: "0.35em", border: "none" }}>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ place_id, description }) => (
                                <ComboboxOption key={place_id} value={description} />
                            ))
                        }
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </SearchContainer>
    );
}