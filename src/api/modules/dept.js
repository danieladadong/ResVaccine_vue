import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';

export const getDepts=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/depts',params);
}
export const getDept=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/dept',params);
}
export const getDeptList=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/getDepts',params);
}
export const putDept=(params)=>{
    return putJsonRequest('/api/staff/updatedept',params);
}
export const postDept=(params)=>{
    return postJsonRequest('/api/staff/adddept',params);
}
export const deleteDeptByDeptno=(params)=>{
    return deleteRequest('/api/staff/deletedept',params);
}