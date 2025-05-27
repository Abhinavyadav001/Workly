import axios from 'axios'
import React, { useEffect } from 'react'
import { setCompanies} from '@/redux/companySlice'
import { useDispatch } from 'react-redux'
import { COMPANY_API_END_POINT } from '../components/utils/constant'

const useGetAllCompanies = () => {
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetchAllCompanies=async()=>{
            try {
                const res=await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true}) 
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllCompanies()
    },[])
  return (
    <>
      
    </>
  )
}

export default useGetAllCompanies
