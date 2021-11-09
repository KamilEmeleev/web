const getCookies = (value) => {
    let res = {};
    if (!value) {
        return res;
    }
    const cookies = value.replace(/ /g, '').split(';');
    for (let item of cookies) {
        const [key, value] = item.split('=');
        res[key] = value;
    }
    return res;
}

module.exports = { getCookies };
