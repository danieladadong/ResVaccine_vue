import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
export const getCertificate=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/certificate',params);
}
export const getCertificates=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/certificates',params);
}
export const addCertificate=(params)=>{
    return postJsonRequest('/api/'+cookie.get("type")+'/addcertificate',params);
}
export const updateCertificate=(params)=>{
    return putJsonRequest('/api/'+cookie.get("type")+'/updatecertificate',params);
}
export const deleteCertificate=(params)=>{
    return deleteRequest('/api/'+cookie.get("type")+'/deletecertificate',params);
}
export const PassCertificate=(params)=>{
    return postJsonRequest('api/staff/pass',params);
}