import { base_url } from "./baseurl";
import axios from "axios";

export const getAddresses = async() => {
    var payload = {
        "method" : "listaddresses",
        "params" : [],
        "id" : 1,
        "chain_name" : "dexChain"
    };
    const res = await axios(`${base_url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: payload,
    }).then((result) => {
        return result;
    }).catch((err) => {
        return err.response;
    });

    return res;
}