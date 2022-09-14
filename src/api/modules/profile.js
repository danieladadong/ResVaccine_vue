import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
export const getProfile=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/profile',params);
}
export const getProfiles=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/profiles',params);
}
export const addProfile=(params)=>{
    return postJsonRequest('/api/'+cookie.get("type")+'/addprofile',params);
}
export const updateProfile=(params)=>{
    return putJsonRequest('/api/'+cookie.get("type")+'/updateprofile',params);
}
export const deleteProfile=(params)=>{
    return deleteRequest('/api/'+cookie.get("type")+'/deleteprofile',params);
}