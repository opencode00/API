# JSAPI
API para node JS

Esta API realizará diversas funciones como:
Explorador de archivos, gestor de listas de audio (spotify) y videos (netflix), consultor de pepapig...
Configurar el puerto y el directorio inicial en .env 

Usar localhost:3000|5000/<action>

## File Explorer
### actions:
#### GET
- list + (querystring) path=<ruta>
- viewFile + (querystring) path=<ruta fichero a visualizar>
- mkdir + (querystring) path=<ruta actual> + (querystring) dir=<nombre directorio> 
- rm + (querystring) path=<ruta fichero a eliminar>
- mv + (querystring) opath=<ruta origen > + (querystring) dpath=<ruta destino>
- cp + (querystring) opath=<ruta origen > + (querystring) dpath=<ruta destino>

#### POST:
 - upload (post) path=<path actual>&uploadFile=<fichero a subir>
