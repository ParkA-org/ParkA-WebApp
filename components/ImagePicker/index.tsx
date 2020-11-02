import * as React from "react";
import { useState, useRef } from "react";

import { ImagesContainer, Image, TooltipText, Tooltip } from "./styles"

type ImageElementType = {
    url: string | ArrayBuffer | null;
    file: File;
};

type ImageElementProps = {
    url: string | ArrayBuffer | null;
    deleteElement: (name: string) => void;
}

type ImagePickerProps = {
    limit?: number;
    placement?: string;
}

function ImageElement({ url, deleteElement }: ImageElementProps) {
    return (
        <>
            <Tooltip>
                <Image src={url} onClick={deleteElement} />
                <TooltipText>Haz click para eliminar la imagen</TooltipText>
            </Tooltip>

        </>
    )
}

function ImagePicker({ limit = 3, placement = "horizontal" }: ImagePickerProps) {
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

    return (
        <>
            <h2>Imágenes</h2>
            <ImagesContainer placement={placement}>
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
