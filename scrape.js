var tabletojson = require('tabletojson')
var url = 'https://pt.wikipedia.org/wiki/Lista_de_concelhos_por_NUTS,_distritos_e_ilhas'
tabletojson.convertUrl(url, (tablesAsJson) => {
  var listOfMunicipalities = tablesAsJson[0].concat(tablesAsJson[1])
  buildJSON(listOfMunicipalities) // Remove first line of headers
})

const buildJSON = (listOfMunicipalities) => {
  let data = []
  listOfMunicipalities.map((municipality) => {
    const newObj = {}
    newObj.name = municipality['Concelhos']
    newObj.district = municipality['Distrito']
    newObj.region = municipality['Nível II']
    newObj.province = municipality['Nível III']
    data.push(newObj)
  })
  writeToFile(data)
}

const writeToFile = (data) => {
  const fs = require('fs')
  var outputFilename = './municipalities.json'
  fs.writeFile(outputFilename, JSON.stringify(data, null, 4), function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('Done ' + outputFilename)
    }
  })
}
