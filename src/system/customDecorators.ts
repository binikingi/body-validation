import { Transform } from "class-transformer";

export function TransformDate(error: string = "Could not parse date") {
    return Transform(value => {
        if (isNaN(Date.parse(value))) {
            throw new Error(error)
        }
        return new Date(value)
    }, { toClassOnly: true })
}