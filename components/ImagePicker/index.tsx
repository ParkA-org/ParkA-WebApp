import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Whisper, Tooltip } from "rsuite"
import { ImagesContainer, Image } from "./styles"

type ImageElementType = {
    url: string | ArrayBuffer | null;
    file?: File;
};

type ImageElementProps = {
    url: string | ArrayBuffer | null;
    deleteElement?: (name: string) => void;
}

type ImagePickerProps = {
    limit?: number;
    placement?: string;
    pictures?: string[];
    setFiles: (files: any[]) => void
}

function ImageElement({ url, deleteElement }: ImageElementProps) {

    const toolTip = <Tooltip> Haz click para eliminar la imagen</Tooltip>
    return (
        <>
            <Whisper placement="left" trigger="hover" speaker={toolTip}>
                <Image src={url} onClick={deleteElement} />
            </Whisper>
        </>
    )
}

function PictureElement({ url }: ImageElementProps) {

    const toolTip = <Tooltip> Haz click para eliminar la imagen</Tooltip>
    return (
        <>
            <Whisper placement="left" trigger="hover" speaker={toolTip}>
                <Image src={url} />
            </Whisper>
        </>
    )
}

function ImagePicker({ limit = 3, placement = "horizontal", setFiles, pictures = [] }: ImagePickerProps) {
    const [images, setImages] = useState<Array<ImageElementType>>([]);
    const inputEl = useRef(null);

    const handleChange = (event) => {
        event.persist();
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.addEventListener(
            "load",
            function () {
                let url = reader.result;
                setImages([
                    ...images,
                    {
                        url: url,
                        file: file
                    }
                ]);
            },
            false
        );

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleClick = (event) => {
        event.preventDefault();
        inputEl.current.click();
    };

    const handleDelete = (name: string) => {
        setImages(prevImages => prevImages.filter(img => img.file.name !== name))
    }

    useEffect(() => {
        let files = []
        images.forEach(img => files.push(img.file))
        if (files.length > 0)
            setFiles(files)

    }, [images])

    useEffect(() => {
        console.log('Pictures ', pictures)
    }, [])

    return (
        <>
            <h2>Imágenes</h2>
            <ImagesContainer placement={placement}>
                {pictures.length > 0 && pictures.map((pic) => <PictureElement key={pic} url={pic} />)}
                {images.length > 0 && images.map((img) => <ImageElement key={img.file.name} url={img.url} deleteElement={() => handleDelete(img.file.name)} />)}
                {images.length < limit && <Image src="/placeholders/empty/carPlaceholder.svg" alt="add image" onClick={handleClick} />}
            </ImagesContainer>
            <input
                type="file"
                id="input"
                onChange={handleChange}
                style={{ display: "none" }}
                accept="image/*"
                ref={inputEl}
            />
        </>
    );
}

export default ImagePicker;
