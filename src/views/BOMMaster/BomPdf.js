import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

class BomPdf extends React.Component {
  generatePDF = () => {
    const documentDefinition = {
      content: [
        {
          text: 'Sample PDF Table',
          style: 'header',
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 100, '*'], // Column widths (you can customize them as per your needs)
            body: [
              ['Name', 'Age', 'Gender', 'Occupation'], // Header row
              ['John Doe', 30, 'Male', 'Engineer'], // Row 1
              ['Jane Smith', 25, 'Female', 'Designer'], // Row 2
              ['Bob Johnson', 45, 'Male', 'Manager'], // Row 3
            ],
          },
        },
        {
          text: 'Generated on: ' + new Date().toLocaleDateString(),
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
      },
    };

    pdfMake.createPdf(documentDefinition).download('bom-table.pdf');
  };

  render() {
    return (
      <div>
        <button onClick={this.generatePDF}>Generate PDF with Table</button>
      </div>
    );
  }
}

export default BomPdf;
