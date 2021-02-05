import React, { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import { useSelector } from "react-redux";

const HomeScreen = ({ history, location }) => {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const redirect = location.search ? location.search.split("=")[1] : "/dashboard";

    useEffect(() => {
        window.scrollTo(0, 0);
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);
    return (
        <>
            <HeroSection />
        </>
    )
}

export default HomeScreen
