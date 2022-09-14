import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
export const getChatUsers=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/getChatUser',params);
}