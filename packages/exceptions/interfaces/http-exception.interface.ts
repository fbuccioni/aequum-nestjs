import { json } from '@aequum/types';


interface HttpException {
    statusCode: number;
    description: string;
    message: string;
    code: string;
    errors?: json.JSONArray | json.JSONObject;
    input?: json.JSONObject;
}
