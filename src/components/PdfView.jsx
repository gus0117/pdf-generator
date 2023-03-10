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
            images.map( (img, index) => (
                <Page size="A4" style={styles.page} key={index + 1}>
                    <Image style={styles.image} src={ URL.createObjectURL(img) } />      
                </Page>
            ))
        }
        
    </Document>
  )
}

export default PdfView