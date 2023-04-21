import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const ExportExcel = ({excelData,Heading,fileName})=>{

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    

const exportToExcel= ()=>{
    console.log('excelData',excelData)
    const ws = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.sheet_add_aoa(ws, Heading);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});

    FileSaver.saveAs(data, fileName + fileExtension);
    // FileSaver.saveAs(data, 'my File' + '.xlsx');

}
    return(
        <div>
            <button type="submit" className='submitbtn_exp' onClick={exportToExcel}><FileDownloadIcon  fontSize='medium' className='icon'/>Export Excel</button>
        </div>
    )
}
export default ExportExcel