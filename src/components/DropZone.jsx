import React, {useMemo, useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const focusedStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };

const DropZone = ({ generatePdf }) => {
    const [files, setFiles] = useState([])

    /* No entiendo que hace, parece q no es necesario */
    const onDrop = useCallback((acceptedFiles) => {
        setFiles([...files, ...acceptedFiles])
/*         acceptedFiles.forEach((file) => {
          const reader = new FileReader()
    
          reader.onabort = () => console.log('file reading was aborted')
          reader.onerror = () => console.log('file reading has failed')
          reader.onload = () => {
          // Do whatever you want with the file contents
            
            const binaryStr = reader.result
            //console.log(files)
          }
          reader.readAsArrayBuffer(file)
        }) */
        
    }, [files])

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
      } = useDropzone({
        accept: {
          'image/jpeg': [],
          'image/png': []
        },
        onDrop
      });

      const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isFocused,
        isDragAccept,
        isDragReject
      ]);
    
      /* Se podria usar esta lista para indicar el orden */
      const acceptedFileItems = files.map(file => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ));
    
      const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
          <ul>
            {errors.map(e => (
              <li key={e.code}>{e.message}</li>
            ))}
          </ul>
        </li>
      ));
    
      return (
        <section className="container-dropzone">
          <div {...getRootProps({style})}>
            <input {...getInputProps()} />
            <p>Arrastra y suelta las imagenes que desees, o haz click y seleccionalos.</p>
            <em>(Solo imagenes *.jpeg y *.png serán aceptadas)</em>
          </div>
          <p className="description-2">El tiempo de generación de los documentos dependera de tu ordenador y la cantidad de imágenes para procesar. Estamos trabajando en mejorar la experiencia. Gracias por su comprención.</p>
          {
            files.length > 0 ?
            <>
              <button onClick={()=>generatePdf(files)} className="btn-generate">Generar PDF</button>
              <button onClick={()=>setFiles([])} className="btn-generate">Limpiar</button>
            </>:
            <button className="btn-generate-disabled">Generar PDF</button>
          }          
          <aside>
            <h4 className='title-2'>Archivos aceptados</h4>
            <ul className='accepted-files'>{acceptedFileItems}</ul>
            <h4>Archivos rechazados</h4>
            <ul>{fileRejectionItems}</ul>
          </aside>
        </section>
      );
}

export default DropZone