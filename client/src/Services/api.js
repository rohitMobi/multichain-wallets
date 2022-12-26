import { base_url } from "./baseurl";
import axios from "axios";

export const getInfo = async() => {
    const res = await axios(`${base_url}get-info`, {
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

export const listAtreams = async() => {
    const res = await axios(`${base_url}streams/list-streams`, {
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

export const getPermissions = async() => {
    const res = await axios(`${base_url}permissions/list-permissions`, {
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

export const createStream = async(name) => {
    var payload = { name: name }
    const res = await axios(`${base_url}streams/create-stream`, {
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

export const changePermissionAddress = async(grant_revoke, address, type) => {
    var payload = { grant_revoke: grant_revoke, address: address, type: type }
    const res = await axios(`${base_url}addresses/change-permission-address`, {
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

export const tokenTransafer = async(address, assetsName, quantity) => {
    var payload = {
        address: address, assetsName: assetsName, quantity: quantity
    }
    const res = await axios(`${base_url}assets/transfer-token`, {
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