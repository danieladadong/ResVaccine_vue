import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
export const getPoints=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/points',params);
}
export const getPoint=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/point',params)
}
export const addPoints=(params)=>{
    return postJsonRequest('/api/'+cookie.get("type")+'/addpoints',params);
}
export const updatePoints=(params)=>{
    return putJsonRequest('/api/'+cookie.get("type")+'/updatepoints',params);
}
export const deletePoints=(params)=>{
    return deleteRequest('/api/'+cookie.get("type")+'/deletepoints',params);
}