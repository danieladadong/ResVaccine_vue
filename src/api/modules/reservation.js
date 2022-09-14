import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
export const getReservation=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/reservation',params);
}
export const getReservations=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/reservations',params);
}
export const addReservation=(params)=>{
    return postJsonRequest('/api/'+cookie.get("type")+'/addreservation',params);
}
export const updateReservation=(params)=>{
    return putJsonRequest('/api/'+cookie.get("type")+'/updatereservation',params)
}
export const deleteReservation=(params)=>{
    return deleteRequest('/api/'+cookie.get("type")+'/deletereservation',params);
}