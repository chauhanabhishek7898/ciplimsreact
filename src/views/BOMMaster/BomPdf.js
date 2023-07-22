import React, { useEffect } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetBOMByBId } from './BomMasteerService'

pdfMake.vfs = pdfFonts.pdfMake.vfs;
const BomPdf = () => {
  const location = useLocation();
  const nbId = location.state?.nbId;
  console.log("get_nbid", nbId)

  const [BOMDetail, setBOMDetail] = React.useState([]);
  const [BOMMaster, setBOMMaster] = React.useState([]);

  const [vBrand, setvBrand] = React.useState("");
  const [vVarient, setvVarient] = React.useState("");
  const [vPackName, setvPackName] = React.useState("");
  const [vProductName, setvProductName] = React.useState('');
  const [nPerUnitBBVolLt, setnPerUnitBBVolLt] = React.useState("");
  const [CaseConfig, setCaseConfig] = React.useState("");
  const [nPerCaseVolLt, setnPerCaseVolLt] = React.useState("");
  const [nRequirementinCS, setnRequirementinCS] = React.useState("");

  const [nBId, setnBId] = React.useState("");
  const [total, settotal] = React.useState(0);
  const [nMId, setnMId] = React.useState("");
  const [nYieldPercentage, setnYieldPercentage] = React.useState("");
  const [nPerSUUsage, setnPerSUUsage] = React.useState("");
  const [nBOM, setnBOM] = React.useState("");
  const [nReqInUOM, setnReqInUOM] = React.useState('');
  const [nStandardRate, setnStandardRate] = React.useState("");
  const [nStdCOGS, setnStdCOGS] = React.useState("");
  const [MaterialDetail, setMaterialDetail] = React.useState("");
  const [vUOM, setvUOM] = React.useState("");
  const [vCategory, setvCategory] = React.useState("");
  const [vMaterialType, setvMaterialType] = React.useState("");

  useEffect(() => {
    getPOByPOId()
  }, [])
  const getPOByPOId = () => {
    GetBOMByBId(nbId).then(res => {
      console.log('responseGetBOMByBId', res)
      console.log('responseGetBOMByBId', res)
      setBOMMaster(res.BOMMaster)
      setBOMDetail(res.BOMDetail)
      let count = Object.keys(res.BOMDetail).length
      let data = res.BOMDetail
      for (var i = 0; i < count; i++) {
        let counts = i
        res.BOMDetail[i].id = counts
      }

      setvBrand(res.BOMMaster[0].vBrand)
      setvVarient(res.BOMMaster[0].vVarient)
      setvPackName(res.BOMMaster[0].nPack)
      setvProductName(res.BOMMaster[0].vProductName)
      setnPerUnitBBVolLt(res.BOMMaster[0].nPerUnitBBVolLt)
      setCaseConfig(res.BOMMaster[0].nCaseConfig)
      setnPerCaseVolLt(res.BOMMaster[0].nPerCaseVolLt)
      setnRequirementinCS(res.BOMMaster[0].nRequirementinCS)

      setnBId(res.BOMDetail[0].vBrand)
      setnMId(res.BOMDetail[0].nPDId)
      setnYieldPercentage(res.BOMDetail[0].nYieldPercentage)
      setnPerSUUsage(res.BOMDetail[0].nPerSUUsage)

      setnBOM(res.BOMDetail[0].nBOM)
      setnReqInUOM(res.BOMDetail[0].nReqInUOM)
      setnStandardRate(res.BOMDetail[0].nStandardRate)
      setnStdCOGS(res.BOMDetail[0].nStdCOGS)
      setMaterialDetail(res.BOMDetail[0].MaterialDetail)
      setvUOM(res.BOMDetail[0].vUOM)
      setvCategory(res.BOMDetail[0].vCategory)
      setvMaterialType(res.BOMDetail[0].vMaterialType)

      let total = res.BOMDetail[0].nStdCOGS + res.BOMDetail[1].nStdCOGS + res.BOMDetail[2].nStdCOGS
      settotal(total)

    })

  }

  const getComplaints = () => {
    const complain = []
    console.log("BOMDetail", BOMDetail)
    BOMDetail.forEach((complaints, index) => {
      let arr = [
        // { text: index + 1, style: 'tabletext' },
        { text: complaints.MaterialDetail, style: 'tabletext' },
        { text: complaints.vUOM, style: 'tabletext' },
        { text: complaints.nYieldPercentage, style: 'tabletext' },
        { text: complaints.nPerSUUsage, style: 'tabletext' },

        { text: complaints.nBOM, style: 'tabletext' },
        { text: complaints.nReqInUOM, style: 'tabletext' },
        { text: complaints.nStandardRate, style: 'tabletext' },
        { text: complaints.nStdCOGS, style: 'tabletext' },

      ]
      complain.push(arr);
    })
    return complain;
  }

  const generatePDF = () => {
    const documentDefinition = {
      pageOrientation: 'landscape',

      content: [
        {
          text: 'BOM',
          style: 'header',
        },
        {
          table: {
            headerRows: 1,
            widths: [200, 200], // Column widths (you can customize them as per your needs)
            body: [
              [{ text: 'Product', style: 'uppertableheader' }, { text: vProductName, style: 'uppertabledata' },], // Row 3
              [{ text: 'Brand', style: 'uppertableheaders' }, { text: vBrand, style: 'uppertabledatas' },], // Header row
              [{ text: 'Variant', style: 'uppertableheaders' }, { text: vVarient, style: 'uppertabledatas' },], // Row 1
              [{ text: 'Pack', style: 'uppertableheaders' }, { text: vPackName, style: 'uppertabledatas' },],
              [{ text: 'Per Unit BB Vol. Lt', style: 'uppertableheaders' }, { text: nPerUnitBBVolLt, style: 'uppertabledatas' },], // Header row
              [{ text: 'Case Config', style: 'uppertableheaders' }, { text: CaseConfig, style: 'uppertabledatas' },], // Row 1
              [{ text: 'Per Case Vol. Lt', style: 'uppertableheaders' }, { text: nPerCaseVolLt, style: 'uppertabledatas' },],
              [{ text: 'Requirement in CS', style: 'uppertableheaders' }, { text: nRequirementinCS, style: 'uppertabledatas' },],
            ],
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
            },
            hLineColor: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? '#ccc' : '#ccc';
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? '#ccc' : '#ccc';
            },
          }
        },

        '\n', '\n',

        {
          table: {
            // margin: [0, 5, 0, 15],
            headerRows: 1,
            dontBreakRows: true,
            keepWithHeaderRows: 1,
            widths: [180, 40, 40, 90, 50, 100, 90, 110], // Column widths (you can customize them as per your needs)
            body: [
              [
                { text: 'Material Name', style: 'tableHeader' },
                { text: 'UOM', style: 'tableHeader' },
                { text: 'Yield %', style: 'tableHeader' },
                { text: 'Per SU Usage', style: 'tableHeader' },
                { text: 'BOM', style: 'tableHeader' },
                { text: 'Req. in UOM', style: 'tableHeader' },
                { text: 'Standard Rate', style: 'tableHeader' },
                { text: 'Standard COGS', style: 'tableHeader' },
              ],
              ...getComplaints(),
            ],
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
            },
            hLineColor: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? '#ccc' : '#ccc';
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? '#ccc' : '#ccc';
            },
          }
          // layout: 'noBorders'
        },

        {
          style: 'tablefooter',
          table: {
            headerRows: 1,
            dontBreakRows: true,
            keepWithHeaderRows: 1,
            widths: [640, 2, 99],
            body: [
              [
                { text: 'Standard Cost per Case', fillColor: '#cccccc', },
                { text: '₹', fillColor: '#cccccc', }, { text: total, fillColor: '#cccccc', },
              ],
              // ...getTotal(),
            ],
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
            },
            hLineColor: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? '#ccc' : '#ccc';
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? '#ccc' : '#ccc';
            },
          }
          // layout: 'noBorders'
        },

      ],

      styles: {
        header: {
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 5]
        },
        uppertableheader: {
          bold: true,
          fontSize: 8,
          color: 'black'
        },
        uppertableheaders: {
          bold: false,
          fontSize: 8,
          color: 'black'
        },
        uppertabledata: {
          bold: true,
          fontSize: 8,
          color: 'black'
        },
        uppertabledatas: {
          bold: false,
          fontSize: 8,
          color: 'black'
        },
        tableHeader: {
          bold: true,
          fontSize: 8,
          color: 'black'
        },
        tabletext: {
          bold: false,
          fontSize: 8,
          color: 'black'
        },
        tablefooter: {
          bold: true,
          fontSize: 9,
          color: 'black'
        }
      },
    };

    pdfMake.createPdf(documentDefinition).download('BOM.pdf');
  };

  return (
    <div>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  )
}

export default BomPdf