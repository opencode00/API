const {google} = require('googleapis');
const cred = require('../config/pepapigcred.json');

//Scopes: https://developers.google.com/identity/protocols/oauth2/scopes
/*const client = getClient()*/
function getClient(){
    const client = new google.auth.JWT(
        cred.client_email, 
        null, 
        cred.private_key, 
        ['https://www.googleapis.com/auth/spreadsheets.readonly']
    );

    return client;
}
/**
 * query(client, sheetId, range, callback)
 * @param client - resultado de getClient
 * @param sheetId - identificador del documento
 * @param range - hoja y rango a obtener (Hoja1!A1:B7)
 * @param callback - funcion local que recibe los datos como parámetro
 * USO: 
 *  const client = sheetApi.getClient();
 *  sheetApi.query(client, '1vPL4MhtBubbieSa740ugNfbaip1tPFPg6UyO9fDaGqs','PCombinaciones!A1:G18', (data)=>{
 *      res.send(data.data.values);
 *  });
 */  
async function query(client, sheetId, range, callback){
    let data; 
    // client.authorize((err, tokens)=>{
    //     if(err) {
    //         console.error(err);
    //         return;
    //     }
    //     execute(client, sheetId, range, callback);
    // });
    const gsapi = google.sheets({version: 'v4', auth: client});
    const opt = {
        spreadsheetId: sheetId,
        range: range
    }
    let res = await gsapi.spreadsheets.values.get(opt);
    callback(res);
}
    
module.exports =  {getClient, query};