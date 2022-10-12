import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useAuthStatus = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    const { userInfo } = useSelector((state: any) => state.userLogin);

    useEffect(() => {
        if (userInfo) {
        setLoggedIn(true)
        } else {
        setLoggedIn(false)
        }
        setCheckingStatus(false)
    }, [userInfo])

    return { loggedIn, checkingStatus }

}
