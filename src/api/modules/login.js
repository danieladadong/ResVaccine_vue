import{
    postJsonRequest,
    postRequest
} from '@/api/axios'
export const Login = (params)=>{
    return postJsonRequest('/api/login', params)
}
export const Regist = (params)=>{
    return postJsonRequest('/api/regist', params)
}