import { Expose } from "class-transformer";
import { IsDefined, IsString, IsInt } from "class-validator";
import { Api } from "../system/api";
import { TransformDate } from "../system/customDecorators";

export class TestMessageResponse {
    @IsDefined()
    @Expose()
    @IsString()
    testName!: string;
    @IsDefined()
    @Expose()
    @IsInt()
    testResult!: number;
    @IsDefined()
    @Expose()
    @TransformDate()
    date!: Date
}

export function addUserRoutes(api: Api) {
    api.withRouter((router) => {
        router.get(
            "/test",
            TestMessageResponse,
            async () => {
                const a: TestMessageResponse = {
                    testName: "ok",
                    testResult: 1,
                    date: new Date()
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