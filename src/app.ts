// import bodyParser from "body-parser";
// import { Expose, plainToClass } from "class-transformer";
// import { IsDefined, validate } from "class-validator";
// import express, { Router, Response, Request } from "express";

import { adduserRoutes } from "./routes/userRoutes";
import { Api } from "./system/api";

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const router = Router();
// class TestMessage {
//     @IsDefined()
//     @Expose()
//     testName!: string;
//     @IsDefined()
//     @Expose()
//     testResult!: number;
// }

// router.post("/test", async (req: Request, res: Response) => {
//     const testMessage = plainToClass(TestMessage, req.body);
//     const errors = await validate(testMessage);
//     if (errors.length > 0) {
//         res.json(errors);
//     }
//     else {
//         res.json({ message: "ok" });
//     }
// })

// app.use(router);
// app.listen(3000, () => {
//     console.log("app listening on port localhost:3000");
// })
const api = new Api();

adduserRoutes(api);

api.init();
api.invoke();