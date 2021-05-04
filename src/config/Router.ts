import fs from 'fs';
import express, { Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import RouterResponse from '../libraries/RouterResponse';
import mapRoutes from 'express-routes-mapper';
import fileMiddleware from 'express-multipart-file-parser';

export default class Routes {

    private app: express.Router;

    constructor(app: express.Router) {
        this.app = app;

        this.middlewares();
        this.loadingRoutes();
    }

    private middlewares() {
        this.app.use(bodyParser.json({limit: '50mb'})); // Converte o body do request para objeto
        this.app.use(bodyParser.urlencoded({limit: '50mb', extended:true}));
        this.app.use(cors({ origin: true }));// Automaticamente habilita cross-origin requests
        this.app.use(fileMiddleware);// Trata arquivos enviados para rota e adiciona no express.req
    }

    private loadingRoutes() {
        //carrega as rotas dos serviços
        this.app.use('/', this.loadingServices());

        this.app.use('*', (_req, res, _next) => RouterResponse.notFound(res));

        //impede estourar erro na api
        this.app.use((err: Error, req: express.Request, res: express.Response) => 
            RouterResponse.serverError(err, res)
        );
    }

    private loadingServices(): Router {
        
        const path = 'src';
        // le o nome dos serviços
        const services: any = {};
        fs.readdirSync(`${path}/services`).forEach(dirname => {

            // Pega todas as versões do serviço
            const versions: Array<string> = [];
            fs.readdirSync(`${path}/services/${dirname}`).forEach(version => {
                versions.push(version);
            });

            services[dirname] = versions;

            console.log(`LOAD Service ${dirname} [${ versions.join(', ') }]`);
        });

        // Carrega o arquivo de rota do serviço
        const router: Router = express.Router();
        for(const service of Object.keys(services)) {
            const versions: Array<string> = services[service];

            for(const version of versions) {
                const moduleRouter: any = require(`../services/${service}/${version}/router`);

                const mappedRoutes = mapRoutes(moduleRouter.routes, `${path}/services/${service}/${version}/controllers/`);
                router.use(`/${service}/${version}`, mappedRoutes);
            }
        }

        return router;
    }
}