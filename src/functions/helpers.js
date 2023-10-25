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

export function isEmptyObj(obj) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }
    return true;
}

export function addCaptionsObjOrArrayTwoDimensional(objOrArray) {
    let captionsName = []
    let captionsLength
    let rowObj = objOrArray[0]
    if(isObject(rowObj)) {
        captionsLength = Object.keys(rowObj).length
    } else if (Array.isArray(rowObj)) {
        captionsLength = rowObj.length
    } else {
        captionsLength = 0
    }
    if (captionsLength <= 0) return [];
    for(let i = 0;i < captionsLength;i++){
        if (i == 0) captionsName.push('id')
        else captionsName.push('# ' + i + ' field')
    }
    return captionsName
}