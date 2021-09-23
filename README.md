# JSFileExplorerAPI
API for file explorer

Configurar el puerto y el directorio inicial en .env 

Usar localhost:3000|5000/<action>
### actions:
- list + (querystring) path=<ruta>
- viewFile + (querystring) path=<ruta fichero a visualizar>
- mkdir + (querystring) path=<ruta actual> + (querystring) dir=<nombre directorio> 
- rm + (querystring) path=<ruta fichero a eliminar>
- mv + (querystring) opath=<ruta origen > + (querystring) dpath=<ruta destino>
- cp + (querystring) opath=<ruta origen > + (querystring) dpath=<ruta destino>
