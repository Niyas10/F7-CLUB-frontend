import React from 'react'
import UserNavbar from '../../components/userComponents/userCommon/UserNavbar'
import LandingPage from '../../components/userComponents/homePage/Landingpage'
import ThirdSection from '../../components/userComponents/homePage/ThirdSection'
import SecondSection from '../../components/userComponents/homePage/SecondSection'
import UserFooter from '../../components/userComponents/userCommon/UserFooter'
import FourthSection from '../../components/userComponents/homePage/FourthSection'

function UserHome() {
  return (
   <>
   <UserNavbar/>
   <LandingPage/>
   <ThirdSection/>
   <SecondSection/>
   <FourthSection/>
  
   <UserFooter/>

   
   </>
  )
}

export default UserHome