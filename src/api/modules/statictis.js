import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
export const getPointsEcharts=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/statistics/points',params);
}
export const getCertificateEcharts=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/statistics/certificate',params);
}
export const getAdultEcharts=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/statistics/adult',params);
}
export const getChildEcharts=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/statistics/child',params);
}
export const getVaccinesEcharts=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/statistics/vaccine',params);
}