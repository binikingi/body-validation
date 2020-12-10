import { Expose } from "class-transformer";
import { IsDefined, IsString, IsInt } from "class-validator";
import { Api } from "../system/api";

export class TestMessageResponse {
    @IsDefined()
    @Expose()
    @IsString()
    testName!: string;
    @IsDefined()
    @Expose()
    @IsInt()
    testResult!: number;
}

export function addUserRoutes(api: Api) {
    api.withRouter((router) => {
        router.get(
            "/test",
            TestMessageResponse,
            async (_req) => {
                const a: TestMessageResponse = {
                    testName: "ok",
                    testResult: 1
                };

                return a;
            }
        );

        router.post(
            "/test",
            TestMessageResponse,
            TestMessageResponse,
            async (req) => {
                console.log(JSON.stringify(req));
                return req;
            }
        )
    });
}