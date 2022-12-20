import { base_url } from "./baseurl";
import axios from "axios";

export const getAddresses = async() => {
    const res = await axios(`${base_url}addresses/list-addresses`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((result) => {
        return result;
    }).catch((err) => {
        return err.response;
    });

    return res;
}

export const createAddresses = async() => {
    const res = await axios(`${base_url}addresses/new-address`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((result) => {
        return result;
    }).catch((err) => {
        return err.response;
    });

    return res;
}


export const getTransactions = async() => {
    const res = await axios(`${base_url}transactions/list-transactions`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((result) => {
        return result;
    }).catch((err) => {
        return err.response;
    });

    return res;
}