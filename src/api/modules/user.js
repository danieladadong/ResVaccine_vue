import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
export const getUserInfo=(params)=>{
    return getRequest('api/'+cookie.get("type")+'/user',params);
}
export const getBanner=(params)=>{
    return getRequest('api/image/image');
}
export const getIcon=(params)=>{
    return getRequest('api/image/imageLogo');
}
export const getNotice=(params)=>{
    return getRequest('api/image/imageTitle');
}
export const updatePwd=(params)=>{
    return postJsonRequest('api/'+cookie.get("type")+'/updatePass',params);
}
export const getUserByType=(params)=>{
    return getRequest('api/'+cookie.get("type")+'/user/type',params);
}
export const getAllUser=(params)=>{
    return getRequest('api/'+cookie.get("type")+'/users',params);
}