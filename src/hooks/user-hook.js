import React, {createContext, useState, useContext, useEffect} from "react";
import usersDataJson from '../data/users.json';
import {storeGetParam, storeSaveReWtite} from "../functions/storege";
import {getData} from "../functions/helpers";

const UserContext = createContext();
export const useUsers = () => useContext(UserContext);

export default function UserProvider({ children, globalStore }) {
    const NameElement = 'users'
    
    let usersData = []
    if (globalStore == 'state') {
        usersData = usersDataJson
    }
    if (globalStore == 'storeg') {
        usersData = getData(NameElement,usersDataJson) ? usersDataJson : storeGetParam(NameElement)
    }
    let [users, setUsers] = useState(usersData);

    const structure = {
        'id': {
            'value':'',
            'type':'text',
        },
        'email': {
            'value':'',
            'type':'email',
        },
        'password': {
            'value':'',
            'type':'password',
        },
        'created_at': {
            'value':'2018-07-22',
            'type':'date',
        }
    }

    function UserSave(el,update = false) {
        

        if (update) {
            let data = users.filter(item => item.id != el.id)
            setUsers([...data,el])
            storeSaveReWtite(NameElement,[...data,el])
        } else {
            setUsers([...users,el])
            storeSaveReWtite(NameElement,[...users,el])
        }
    }

    function UserEdit(id,addId,e) {
        
        

        window.location.href = '/edit/' + NameElement + '/' + addId + '/' + id;
    }

    function UserDelete(id,e) {
        
        

        let data = users.filter(item => item.id != id);
        setUsers(data);
        storeSaveReWtite(NameElement,data)
    }

    function UserView(id,e) {
        
        

        window.location.href = '/user/view/'+id;
    }

    function UserGetId(id) {
        let oneUser = users.filter(item => item.id == id)[0]
        return oneUser
    }

    return (
        <UserContext.Provider value={{ NameElement, users, UserEdit, UserDelete, UserView, UserGetId, structure, UserSave }}>
            {children}
        </UserContext.Provider>
    );
}
