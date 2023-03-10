import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
    page: {
        flexDirection:'column',
        backgroundColor: '#E4E4E4'
    },
    image: {
        width:'100%',
    }
})

const PdfView = ({ images }) => {

  return (
    <Document>
        
        {
            images.map( img => (
                <Page size="A4" style={styles.page}>
                    <Image style={styles.image} src={ URL.createObjectURL(img) } key={img.name} />      
                </Page>
            ))
        }
        
    </Document>
  )
}

export default PdfView