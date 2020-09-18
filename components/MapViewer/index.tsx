import { useState, useRef, useCallback } from "react"
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
import { Container, ButtonsContainer, ButtonSection, ControllersContainer, MapContainer, Legend, LegendContainer } from "./styles"

const libraries = ["places"];
const mapStyle = {
    height: "100%",
    width: "100%",
};
const options = {
    zoomControl: true,
    mapTypeControl: false,
    fullscreenControl: false
};
const center = {
    lat: 18.487876,
    lng: -69.962292,
};

export default function MapViewer(): JSX.Element {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyA2qh5V5bOl9h1f2h9RiPNgb9hQxDZtMkU',
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

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = useCallback(({ lat, lng }) => {
        if (process.browser) {
            mapRef.current.panTo({ lat, lng });
            mapRef.current.setZoom(16);
        }
    }, []);

    if (loadError) return <h2>Error</h2>;
    if (!isLoaded) return <h2>"Loading..."</h2>;

    return (
        <div>
            <Container>
                <ControllersContainer>
                    <ButtonsContainer>
                        <ButtonSection>
                            <button onClick={() => { setShowFilters(!showFilters) }}>Filtros</button>
                            <Search panTo={panTo} />
                        </ButtonSection>
                        {showFilters && <FilterSideBar />}
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
                                        origin: new window.google.maps.Point(0, 0),
                                        anchor: new window.google.maps.Point(15, 15),
                                        scaledSize: new window.google.maps.Size(30, 30),
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

function Locate({ panTo }) {
    return (
        <button
            className="locate"
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    () => null
                );
            }}
        >
            Obtener locación
        </button>
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
            location: { lat: () => 43.6532, lng: () => -79.3832 },
            radius: 100 * 1000,
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
        <div className="search">
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Buscar en zona"
                    style={{
                        padding: "0.25em",
                        borderRadius: "10px",
                        border: "none"
                    }}
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}