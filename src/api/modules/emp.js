import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
export const getEmpList=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/emps',params);
}
export const getEmp=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/emp',params);
}
export const deleteEmpByUUID=(params)=>{
    return deleteRequest('/api/'+cookie.get("type")+'/deleteemp',params);
}
export const getEmpByType=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/list',params);
}
export const postEmp=(params)=>{
    return postJsonRequest('/api/'+cookie.get("type")+'/addemp',params);
}
export const putEmp=(params)=>{
    return putJsonRequest('/api/'+cookie.get("type")+'/updateemp',params)
}
