import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
export const getVaccine=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/vaccine',params);
}
export const adultVaccine=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/vaccines/type',params);
}
export const KidVaccine=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/vaccines/type',params);
}
export const getVaccines=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/vaccines',params);
}
export const addVaccine=(params)=>{
    return postJsonRequest('/api/'+cookie.get("type")+'/addvaccine',params);
}
export const updateVaccine=(params)=>{
    return putJsonRequest('/api/'+cookie.get("type")+'/updatevaccine',params);
}
export const deleteVaccine=(params)=>{
    return deleteRequest('/api/'+cookie.get("type")+'/deletevaccine',params);
}