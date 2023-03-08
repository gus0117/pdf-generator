import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
    page: {
        flexDirection:'column',
        backgroundColor: '#E4E4E4'
    },
    image: {
        minWidth: '600px',
        minHeight: '800px'
    }
})

const PdfView = ({ images }) => {

  return (
    <Document>
        {
            images.map( img => (
                <Page size="A4" style={styles.page} key={img.name}>
                    <Image style={styles.image} src={ URL.createObjectURL(img) } />
                </Page>
            ))
        }
    </Document>
  )
}

export default PdfView