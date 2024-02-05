import { useEffect, useState } from "react"



const useOnlineStatus = () =>{
    const [online, setOnline] = useState(true)

    useEffect(()=>{
        window.addEventListener("offline",()=>{
            setOnline(false)
        })
    },[])


    useEffect(()=>{
        window.addEventListener("online",()=>{
            setOnline( )
        })
    },[])

    return online
}

export default useOnlineStatus