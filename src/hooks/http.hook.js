import { useState , useCallback } from "react";

export const useHttp=()=>{
    const[loading,setloading]=useState(false),
          [error,setError]=useState(null)


    const request= useCallback(async (url, method='GET',body=null, header={'Content-Type':'application/json'})=>{

        setloading(true)

        try{
            
        }catch{
            
        }

    },[])


}