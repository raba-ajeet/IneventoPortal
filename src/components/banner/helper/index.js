import { API } from "../../../backend"

export const createBanner = (userId,token,Banner) => {
    return fetch(`${API}/banner/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:Banner
    }).then(res => {
        console.log(res);
        return res.json()
    })
    .catch(err => console.log(err));
}

export const getAllBanners = () => {
    return fetch(`${API}/banner`,{
        method:"GET",
        headers:{
            Accept:"application/json"
        }
    }).then(res => res.json())
    .catch(err => console.log(err))
}

export const deleteBanner = (userId,token,bannerId) => {
    return fetch(`${API}/${userId}/banner/${bannerId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err))
}