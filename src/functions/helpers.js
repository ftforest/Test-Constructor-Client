import {storeGetParam, storeSaveReWtite} from "./storege";

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

export function ViewObject (obj,debugT = 'Debug',i = 0) {
    const result = []
    Object.keys(obj).forEach((key, index) => result.push(<li key={index}>{key} : {obj[key]} </li>))

    return (
        <div key={i}>
            <span>{debugT}:</span>
            <ul>
                {result}
            </ul>
        </div>
    )
}

export function getData(NameElement,testsDataJson) {
    if (storeGetParam(NameElement).length == 0) {
        storeSaveReWtite(NameElement,testsDataJson)
        return true
    } else {
        return false
    }
}

export function structureGetValue (objStructure) {
    let obj = {}
    Object.keys(objStructure).forEach((key,idx) => {
        obj[key] = objStructure[key].value
    })
    console.log(obj,'obj')
    return obj;
}