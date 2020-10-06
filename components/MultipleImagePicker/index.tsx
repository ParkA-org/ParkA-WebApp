
import { useRef, useState } from "react"
import { ImageSquare } from "./styles"

function ImagePreview({ file }: { file: File }) {
    const imgEl = useRef(null)
    const reader = new FileReader()
    reader.addEventListener(
        "load",
        function () {
            imgEl.current.src = reader.result
        },
        false
    )
    if (file)
        reader.readAsDataURL(file);
    else
        console.log('No file')

    return (
        <ImageSquare ref={imgEl} alt="uploaded image" src="../icons/cameraIcon.svg" />
    )
}

type ImagePickerProps = {
    setFiles: (files: any[]) => void
}

export default function MultipleImagePicker({ setFiles }: ImagePickerProps) {

    const DRAG_IMAGE_STATES = {
        ERROR: -1,
        NONE: 0,
        DRAG_OVER: 1,
        UPLOADING: 2,
        COMPLETE: 3,
    }

    const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
    const [previewImages, setPreviewImages] = useState([])
    const handleDragEnter = (e) => {
        e.preventDefault()
        setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setDrag(DRAG_IMAGE_STATES.NONE)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setDrag(DRAG_IMAGE_STATES.NONE)
        let images = []
        setFiles(e.dataTransfer.files)
        for (let i = 0; i < e.dataTransfer.files.length && i < 5; i++) {
            let file = e.dataTransfer.files[i]
            images = [...images, <ImagePreview file={file} />]
        }
        setPreviewImages(images)
    }

    return (
        <div className="container">
            <div>
                <h2>Agregar imágenes</h2>
                <textarea
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={handleDrop}
                    placeholder="Arrastre hasta 5 imágenes de su parqueo"
                ></textarea>
            </div>
            <div className="imagezone">
                {previewImages}
            </div>

            <style jsx>{`
            .container {
              display: flex;
              justify-content: space-around;
              width: 100%;
            }
           textarea {
            border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
                    ? "3px dashed #09f"
                    : "3px solid #333"};
            font-size: 21px;
            min-height: 200px;
            padding: 15px;
            outline: 0;
            resize: none;
            width: 100%;
          }
          .imagezone {
              width: 50%;
              height: auto;
              display: flex;
              justify-content: space-around;
              flex-wrap: wrap;
          }`}</style>
        </div>
    )
}