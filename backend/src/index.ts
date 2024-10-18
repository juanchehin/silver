import express, { Application } from 'express';
import cors from 'cors';
const https = require("https");
const fs = require("fs");
const logger = require("./utils/logger").logger;

import loginRoutes from './routes/loginRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import productosRoutes from './routes/productosRoutes';
import ventasRoutes from './routes/ventasRoutes';
import clientesRoutes from './routes/clientesRoutes';
import cuentasRoutes from './routes/cuentasRoutes';
import serviciosRoutes from './routes/serviciosRoutes';
import cajaRoutes from './routes/cajaRoutes';
import configuracionesRoutes from './routes/configuracionesRoutes';
import eventosRoutes from './routes/eventosRoutes';
import tasasRoutes from './routes/tasasRoutes';
import empleadosRoutes from './routes/empleadosRoutes';
import egresosRoutes from './routes/egresosRoutes';
import comisionesRoutes from './routes/comisionesRoutes';
import proveedoresRoutes from './routes/proveedoresRoutes';
import comprasRoutes from './routes/comprasRoutes';

class Server {

    public app: Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', 3000);        
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.static('public'))

    }

// ==================================================
//        RUTAS
// ==================================================
    routes(): void {

        this.app.use('/api/usuarios', usuariosRoutes);
        this.app.use('/api/clientes', clientesRoutes);
        this.app.use('/api/productos', productosRoutes);
        this.app.use('/api/servicios', serviciosRoutes);
        this.app.use('/api/caja', cajaRoutes);
        this.app.use('/api/eventos', eventosRoutes);
        this.app.use('/api/egresos', egresosRoutes);
        this.app.use('/api/comisiones', comisionesRoutes);

        this.app.use('/api/configuraciones', configuracionesRoutes);
        this.app.use('/api/tasas', tasasRoutes);
        this.app.use('/api/ventas', ventasRoutes);
        this.app.use('/api/compras', comprasRoutes);
        this.app.use('/api/cuentas', cuentasRoutes);
        this.app.use('/api/empleados', empleadosRoutes);
        this.app.use('/api/proveedores', proveedoresRoutes);

        this.app.use('/api/login', loginRoutes);

    }

// ==================================================
//   Inicio el servicio en el puerto 3000
// ==================================================
    start() {

        const enableHttps = false;
        const ssloptions: any = {}

        if (enableHttps) {
                ssloptions.key = fs.readFileSync('/etc/letsencrypt/live/silver.chehininformatica.shop/privkey.pem');
                ssloptions.cert = fs.readFileSync('/etc/letsencrypt/live/silver.chehininformatica.shop/fullchain.pem');
        }

        if (enableHttps) {
            https.createServer(ssloptions,this.app).listen(3000, function () {
                logger.info("HTTPS Server running on port 3000")
                console.log("HTTPS Server running on port 3000");
            });
        } else {
            this.app.listen(this.app.get('port'), () => {
                logger.info("HTTP Server running on port 3000")
                console.log('Server en puerto', this.app.get('port'));
            });
        }

    }

}

const server = new Server();
server.start();