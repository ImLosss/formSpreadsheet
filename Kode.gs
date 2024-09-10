var url = 'https://docs.google.com/spreadsheets/d/15bKaldlC663ntBXGj41ZfuSy1U81Egd1O2K7SrFSNBg/edit?gid=0#gid=0'
var sh = 'Data Pendaftar'
var folderCV = '1UUD6ohjX9jpSZitpok6geAo1THq6aklK'
var folderPelatihan = '1Wif4K-71yPPiME1cHkiDjkItxoWvMs3p'
var folderSKK = '18TUTJhbWNPfj8id41CymEqMnIwBmpNaY'

// This function is called when a POST request is made to the URL of the script
function doPost(e){
  try {
    var fileLink = "-"
    var fileLink2 = "-"
    var fileLink3 = "-"

    formdata = JSON.parse(e.postData.contents)
    var superscript = SuperScript.initSuper(url,sh)
    var formObject = {}
    formdata.forEach(element => formObject[element.name] = element.value)
    var ss= SpreadsheetApp.openByUrl(url)
    var sheet = ss.getSheetByName(sh)
    var lr = sheet.getLastRow() - 1
    var ws=ss.getSheets()[0]
    if(formObject.sertifikat) {
      var file = superscript.uploadFile(folderPelatihan,formObject.sertifikat.data,`SertifikatPelatihan${ lr }_${ formObject.nama }`)
      fileLink = file.getUrl()
    }
    if(formObject.cv) {
      var file2 = superscript.uploadFile(folderCV,formObject.cv.data,`CV${ lr }_${ formObject.nama }`)
      fileLink2 = file2.getUrl()
    }
    if(formObject.upload_ska_skk) {
      var file3 = superscript.uploadFile(folderSKK,formObject.upload_ska_skk.data,`SKA_SKK${ lr }_${ formObject.nama }`)
      fileLink3 = file3.getUrl()
    }
    ws.appendRow([
      lr,
      new Date(),
      formObject.nama,
      formObject.pendidikan,
      formObject.tahun_ijazah,
      formObject.usia,
      formObject.no_telfon_aktif,
      formObject.email,
      formObject.pengalaman_kerja,
      formObject.jabatan_terakhir,
      formObject.ska_skk,
      formObject.masa_berlaku_ska_skk ? formObject.masa_berlaku_ska_skk : '-',
      fileLink3,
      fileLink,
      fileLink2
    ]);
    return ContentService.createTextOutput("Berhasil upload")
  } catch(e) {
    return ContentService.createTextOutput(e)
  }
}

