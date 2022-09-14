import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
export const getWareHouse=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/warehouse',params);
}
export const getWareHouses=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/warehouses',params);
}
export const addWareHouse=(params)=>{
    return postJsonRequest('/api/'+cookie.get("type")+'/addwarehouse',params);
}
export const updateWareHouse=(params)=>{
    return putJsonRequest('/api/'+cookie.get("type")+'/updatewarehouse',params);
}
export const deleteWareHouse=(params)=>{
    return deleteRequest('/api/'+cookie.get("type")+'/deletewarehouse',params);
}
export const getOneWHVaccine=(params)=>{
    return getRequest('/api/'+cookie.get("type")+'/getonewhvaccine',params);
}
export const getAdultWareHouseVaccines=(params)=>{
    return getRequest('api/'+cookie.get("type")+'/adultWarehouse',params);
}
export const getKidWareHouseVaccines=(params)=>{
    return getRequest('api/'+cookie.get("type")+'/kidWarehouse',params);
}