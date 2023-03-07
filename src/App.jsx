import { PDFViewer } from "@react-pdf/renderer"
import { useState } from "react"
import img1 from "./assets/img1.png"
import img2 from "./assets/img2.png"
import img3 from "./assets/img3.jpg"
import img4 from "./assets/img4.jpg"
import img5 from "./assets/img5.jpg"
import DropZone from "./components/DropZone"

import PdfView from "./components/PdfView"
import WebContent from "./components/WebContent"

function App() {
  const [text, setText] = useState("Texto de prueba")
  const [images, setImages] = useState([])
  const [isImagesLoaded, setIsImagesLoaded] = useState(false)

  const generatePdf = (files) => {
    setImages([...files])
    setIsImagesLoaded(true)
    //console.log(files)
  }

  return (
    <div>
      <DropZone generatePdf={generatePdf}/>
      {
        isImagesLoaded ? 
        <PDFViewer style={{ width: "100%", height: "90vh" }}>
          <PdfView images={images} />
        </PDFViewer> :
        null
      }
    </div>
  )
}

export default App
