import bodyParser from "body-parser";
import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import { validate } from "class-validator";
import express, { Express, Request, Response, Router } from "express";

export class Api {
    private app: Express;
    private router: ApiRouter;
    constructor() {
        this.app = express();        
        this.router = new ApiRouter();        
    }

    init = () => {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(this.router.getRouter());
    }

    invoke = () => {
        this.app.listen(3000, () => {
            console.log("app listening on localhost:3000");
        })
    }

    withRouter = (callback: (router: ApiRouter) => void) => {
        callback(this.router);
    }
}

class ApiRouter {
    private router: Router;
    constructor() {
        this.router = Router();
    }

    getRouter = () => {
        return this.router;
    }

    post = <T, S>(path: string, reqType: ClassType<T>, resType: ClassType<S>, handler: (req: T) => Promise<S>) => {
        return this.router.post(
            path,
            (req: Request, res: Response) => {
                const testMessage = plainToClass(reqType, req.body);
                validate(testMessage).then(errors => {
                    if (errors.length > 0) {
                        res.status(400).json(errors);
                    } else {
                        handler(testMessage).then(data => {
                            const testResponse = plainToClass(resType, data);
                            validate(testResponse).then(resErrors => {
                                if (resErrors.length > 0) {
                                    res.status(500).json(resErrors);
                                } else {
                                    res.status(200).json(testResponse);
                                }
                            })
                        }).catch(error => {
                            console.error(error);
                        res.status(500).json({ message: "Error" })
                        });
                    }
                });
            }
        )
    };

    get = <S>(path: string, resType: ClassType<S>, handler: (req: Request) => Promise<S>) => {
        return this.router.get(
            path,
            (req: Request, res: Response) => {
                handler(req).then(data => {
                    const testResponse = plainToClass(resType, data);
                    validate(testResponse).then(resErrors => {
                        if (resErrors.length > 0) {
                            res.status(500).json(resErrors);
                        }
                        else {
                            res.status(200).json(data);
                        }
                    })
                }).catch(error => {
                    console.error(error);
                    res.status(500).json({ message: "Error" });
                })
            }
        )
    }

    delete = (path: string, handler: (req: Request) => Promise<void>) => {
        return this.router.delete(
            path,
            (req: Request, res: Response) => {
                handler(req).then(() => {
                    res.sendStatus(200);
                }).catch(error => {
                    console.error(error);
                    res.status(500).json({ message: "Error" });
                });
            }
        );
    }
}