import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer"
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

  const resetApp = () => {
    setImages([])
    setIsImagesLoaded(false)
  }

  return (
    <div className="container">
      <h1 className="title-1">PDF Generator</h1>
      {
        !isImagesLoaded ? 
        <>
          <p className="description-1">Arrastra tus imágenes y selecciona generar PDF. <span className="highlight">¡Importante! Debes seleccionar todas las imagenes de una vez.</span></p>
          <DropZone generatePdf={generatePdf}/>
        </> :
        null
      }
      
      {
        isImagesLoaded ? 
        <>
          <BlobProvider document={<PdfView images={images} />}>
            {({ url }) => {
              return (
                <>
                  <p className="description-1 text-center">Ya puedes visualizar tu documento.</p>
                  <div className="btn-generate">
                    <a href={url} target="_blank">
                      Ver PDF
                    </a>
                  </div>

                </>
              );
            }}
          </BlobProvider>
          <PDFDownloadLink className="btn-generate" document={<PdfView images={images} />} fileName="PDFGenerator.pdf">
            <a className="">Descargar</a>
          </PDFDownloadLink>
          <button className="btn-generate" onClick={() => resetApp()}>Generar otro</button>
        </>:
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
