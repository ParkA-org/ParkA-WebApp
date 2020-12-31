import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/router"
import { BsSearch } from "react-icons/bs"
import { AiOutlineMenu } from "react-icons/ai"
import Button from "components/Button"
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
import { useQuery } from "@apollo/client";
import { GET_PARKINGS } from "queries";
import { AllParkingData } from "utils/types";

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

export default function MapViewer(): JSX.Element {
    const router = useRouter()

    const [coordinates, setCoordinates] = useState({ lat: 18.487876, lng: -69.962292 })
    const { loading, error, data, refetch } = useQuery<AllParkingData>(GET_PARKINGS, {
        fetchPolicy: "network-only",
        variables: {
            filterV:
            {
                where: {
                    position_near: { latitude: coordinates.lat, longitude: coordinates.lng }
                }
            }

        }
    })

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
        libraries,
    });
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [showFilters, setShowFilters] = useState(false)

    useEffect(() => {
        if (data) {
            let marks = []
            data.getAllParkings.forEach(parking => {
                marks.push({
                    lat: parking.latitude,
                    lng: parking.longitude,
                    time: new Date(),
                    isAvailable: parking.isAvailable,
                    name: parking.parkingName,
                    information: parking.information,
                    picture: parking.mainPicture,
                    id: parking.id
                })
            })
            setMarkers(marks)
        }
    }, [data])

    const mapRef = useRef(null);
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = useCallback(({ lat, lng }) => {
        if (process.browser) {
            if (mapRef && mapRef.current) {
                mapRef.current!.panTo({ lat, lng });
                mapRef.current!.setZoom(16);
                setCoordinates({ lat: lat, lng: lng })
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
    if (!isLoaded) return <h2>"Cargando..."</h2>;

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
                            {showFilters && <FilterSideBar refetch={refetch} />}
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
                        options={options}
                        onLoad={onMapLoad}
                    >
                        {markers.map((marker) => {
                            return process.browser ? (
                                <Marker
                                    key={`${marker.lat}-${marker.lng}`}
                                    position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
                                    onClick={() => {
                                        setSelected(marker);
                                    }}
                                    icon={{
                                        url: marker.isAvailable ? `/icons/availableIcon.svg` : `/icons/unavailableIcon.svg`,
                                        origin: new (window as any).google.maps.Point(0, 0),
                                        anchor: new (window as any).google.maps.Point(15, 15),
                                        scaledSize: new (window as any).google.maps.Size(30, 30),
                                    }}
                                />
                            ) : (marker)
                        })}

                        {selected ? (
                            <InfoWindow
                                position={{ lat: parseFloat(selected.lat), lng: parseFloat(selected.lng) }}
                                onCloseClick={() => {
                                    setSelected(null);
                                }}
                            >
                                <div className="windowContent">
                                    <div className="information">
                                        <h3>{selected.name}</h3>
                                        <p className="description">{selected.information}</p>
                                        <Button onClick={() => router.push('/parking/detail/[id]', `/parking/detail/${selected.id}`)}>Ir al parqueo</Button>
                                    </div>
                                    <img className="img" src={selected.picture} alt="parking picture" />
                                </div>
                            </InfoWindow>
                        ) : null}
                    </GoogleMap>
                </MapContainer>
                <style jsx>
                    {
                        `
                        .windowContent {
                            display: flex;
                            justify-content: space-around;
                            align-items: center;
                            height: auto;
                            max-width: 20vw;
                        }
                        .information > h3 {
                            font-size: 1.2rem;
                            color: red;
                        }
                        .information {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            word-wrap: break-word;
                        }
                        .description {
                            font-size: 0.9rem;
                            margin: 0.5em;
                            max-width: 350px;
                            overflow: hidden;
                            display: -webkit-box;
                            -webkit-line-clamp: 3;
                            -webkit-box-orient: vertical;  
                        }
                        .img {
                            width: 150px;
                            height: 50px;
                            border-radius: 5px;
                            margin-left: 0.5em;
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
            <Combobox onSelect={handleSelect} aria-label="custom places demo">
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