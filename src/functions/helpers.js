export function print(data,text = 'print') {
    console.log(text+":",data);
}

export function isObject(yourVariable) {
    if (
        typeof yourVariable === 'object' &&
        !Array.isArray(yourVariable) &&
        yourVariable !== null
    ) {
        return true;
    }
    return false;
}