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


export const getAssets = async() => {
    const res = await axios(`${base_url}assets/list-assets`, {
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

export const gettotalbalances = async() => {
    const res = await axios(`${base_url}assets/list-gettotalbalances`, {
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

export const createAssets = async(address, assetsName, quantity, smallestUnit) => {
    var payload = {
        address: address, assetsName: assetsName, quantity: quantity, smallestUnit: smallestUnit
    }
    const res = await axios(`${base_url}/assets/create-assets`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data: payload
    }).then((result) => {
        return result;
    }).catch((err) => {
        return err.response;
    });

    return res;
}