import { BlobProvider } from "@react-pdf/renderer"
import { useState } from "react"
import DropZone from "./components/DropZone"
import PdfView from "./components/PdfView"


function App() {
  const [images, setImages] = useState([])
  const [isImagesLoaded, setIsImagesLoaded] = useState(false)

  const generatePdf = (files) => {
    setImages([...files])

    setIsImagesLoaded(true)
    //console.log(files)
  }

  return (
    <div className="container">
      <h1 className="title-1">PDF Generator</h1>
      {
        !isImagesLoaded ? 
        <>
          <p className="description-1">Arrastra tus imagenes y seleciona generar PDF. ¡Importante! Debes seleccionar todas las imagenes de una vez.</p>
          <DropZone generatePdf={generatePdf}/>
        </> :
        null
      }
      
      {
        isImagesLoaded ? 
        <BlobProvider document={<PdfView images={images} />}>
          {({ url, ...rest }) => {
            return (
              <>
                <p className="description-1 text-center">Ya puedes visualizar tu documento.</p>
                <div className="btn-show-pdf">
                  <a href={url} target="_blank">
                    Ver Documento PDF
                  </a>
                </div>
              </>
            );
          }}
        </BlobProvider> :
        null
      }
      {/* {
        isImagesLoaded ? 
        <PDFViewer style={{ width: "100%", height: "90vh" }}>
          <PdfView images={images} />
        </PDFViewer> :
        null
      } */}
    </div>
  )
}

export default App
