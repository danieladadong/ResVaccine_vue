import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
export const getNotice=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/notice',params);
}
export const getNotices=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/notices',params);
}

export const addNotices=(params)=>{
    return postJsonRequest('/api/'+cookie.get("type")+'/addnotice',params)
}
export const updateNotices=(params)=>{
    return putJsonRequest('/api/'+cookie.get("type")+'/updatenotice',params);
}
export const deleteNotices=(params)=>{
    return deleteRequest('/api/'+cookie.get("type")+'/deletenotice',params);
}