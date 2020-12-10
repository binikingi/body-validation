import { addUserRoutes } from "./routes/userRoutes";
import { Api } from "./system/api";
const api = new Api();

addUserRoutes(api);

api.init();
api.invoke();