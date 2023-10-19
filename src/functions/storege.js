import {print} from "./helpers";

export function storeSaveReWtite(nameParametr,data) {
    window.localStorage.setItem(nameParametr, JSON.stringify(data));
    return storeGetParam(nameParametr);
}

export function storeDeleteElement(nameParametr,element) {
    let data = storeGetParam(nameParametr).filter(item => item.id != element.id);
    storeSaveReWtite(nameParametr,data);
    return data;
}

export function storeDeleteElementsForParam(nameParametr,key,value) {
    let data = storeGetParam(nameParametr).filter(item => item[key] != value);
    storeSaveReWtite(nameParametr,data);
    return data;
}

export function storeGetElementsForParam(nameParametr,key,value) {
    let data = storeGetParam(nameParametr).filter(item => item[key] == value);
    return data;
}

export function storeSetElementForParam(nameParametr,key,value,keySet,valueSet) {
    let elementsAdd = storeGetElementsForParam(nameParametr,key,value).map(item => {
        item[keySet] = valueSet;
        return item;
    });

    print(elementsAdd,'elementsAdd');
    let data = storeGetParam(nameParametr).map(item => {
        let el = elementsAdd.filter(item2 => item2.id == item.id)[0];
        print(el,'el')
        if (el != undefined) {
            storeEditElement(nameParametr, el);
            return el;
        } else return item;
    })



    //storeSaveReWtite(nameParametr,data)
    /*let allElements = elementsAdd.map(item => {
        storeEditElementParametr(nameParametr, item);
    });*/
    return data;
}


export function storeAddElement(nameParametr,element) {
    element.id = getIdForNewElement(nameParametr);
    let data = storeGetParam(nameParametr);
    window.localStorage.setItem(nameParametr, JSON.stringify([...data,element]));
    return [...data,element];
}

function getIdForNewElement(nameParametr) {
    let newId = 0;
    storeGetParam(nameParametr).forEach((el,index,key) => {
        if (el.id >= newId) newId = el.id + 1;
        console.log(el,index,key,newId)
    })
    if (newId == 0) newId++;
    return newId;
}

export function storeEditElements(nameParametr,elements) {
    let data = storeGetParam(nameParametr)
    let el_edit;
    data = data.map(item => {
        el_edit = elements.filter(el => el.id == item.id)[0];
        if (el_edit != undefined) return copyFieldsObject(item, el_edit);
        else return item;
    })
    print(data,'storeEditElement')
    storeSaveReWtite(nameParametr,data)
    return data;
}
export function storeEditElement(nameParametr,element) {
    let data = storeGetParam(nameParametr)
    data = data.map(item => {
        if (item.id == element.id) return copyFieldsObject(item, element);
        else return item;
    })
    print(data,'storeEditElement')
    storeSaveReWtite(nameParametr, data);
    return data;
}

export function storeUpdateElementFields(nameParametr,element) {
    let data = storeGetParam(nameParametr)
    data = data.map(item => {
        if (item.id == element.id) return updateFieldsObject(item, element);
        else return item;
    })
    print(data,'storeUpdateElementFields')
    storeSaveReWtite(nameParametr, data);
    return data;
}

function updateFieldsObject(obj,newObject) {
    if (obj.id == newObject.id)
        for (var key in newObject) {
            if (obj.hasOwnProperty(key)) {
                obj[key] = newObject[key];
            }
        }
    return obj;
}


function copyFieldsObject(obj,newObject) {
    if (obj.id == newObject.id)
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            obj[key] = newObject[key];
        }
    }
    return obj;
}

export function storeGetParam(nameParametr) {
    let data = window.localStorage.getItem(nameParametr);
    if (data != undefined) {
        data = JSON.parse(data);
        if (data.length == 0) data = [];
    } else {
        data = [];
    }
    //
    return data;
}

export function storeGetObjectById(nameParametr,id) {
    let data = window.localStorage.getItem(nameParametr);
    data = JSON.parse(data);
    data = data.filter(item => item.id == id)[0];
    //
    return data;
}

