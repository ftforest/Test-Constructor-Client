export function settings_edit(use_state,name,value) {
    let obj = use_state;
    //
    obj[name] = value;
    //
    return obj;
}