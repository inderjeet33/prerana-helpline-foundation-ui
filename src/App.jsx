import {  Routes, Route, Link } from "react-router-dom";
import DonorAuth from "./pages/DonorAuth";
import DonorDetails from "./pages/DonorDetails";
import Dashboard from "./pages/Dashboard";
import SetPassword from "./pages/SetPassword";

import logo from "./assets/infiniteseva logo.png"; // your logo
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Donate from "./pages/Donate";
import NgoSignup from "./ngo/Signup";
import NgoOtpVerify from "./ngo/OtpVerify";
import NgoAuth from "./pages/NgoAuth";
import CsrAuth from "./pages/CsrAuth";
import NgoDashboard from "./pages/NgoDashboard";
import ModeratorDashboard from "./pages/ModeratorDashboard";
import PublicLayout from "./components/PublicLayout";
import ModeratorLayout from "./pages/ModeratorLayout";
import NgoDonations from "./pages/NgoDonations";
import CampaignCreate from "./pages/CampaignCreate";
import CreateCampaign from "./pages/createCampaign";
import CampaignCard from "./pages/CampaignCard";
import MyCampaigns from "./pages/MyCampaign";
import CampaignDetails from "./pages/CampaignDetails";
import DonationHistory from "./pages/DonationHistory";
import VolunteerHistory from "./pages/VolunteerHistory";
import ModeratorLogin from "./pages/ModeratorLogin";
import IndividualProtected from "./components/IndividualProtected";
import NgoProtected from "./components/NgoProtected";
import NgoVerifyOtp from "./pages/NgoVerifyOtp";
import NgoSendOtp from "./pages/NgoSendOtp";
import NgoSetPassword from "./pages/NgoSetPassword";
import NgoBasicInfo from "./pages/NgoBasicDetails";
import NgoLogin from "./pages/NgoLogin";
import NgoProfileComplete from "./pages/NgoProfileComplete";
import Unauthorized from "./pages/UnAuthorized";
import NotFound from "./pages/NotFound";
import HomeRedirect from "./pages/HomeRedirect";
import NgoPublicProfile from "./pages/NgoPublicProfile";
import NgoGallery from "./pages/NgoGallery";
import PublicCampaigns from "./pages/PublicCampaign";
import ModeratorProtected from "./components/ModeratorProtected";
import Profile from "./pages/profile";
import Awards from "./pages/awards";
import Privacy from "./pages/Privacy";
import FAQ from "./pages/Faq";
import About from "./pages/About";
import AppLayout from "./layout/AppLayout";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import NgoLayoutWithFooter from "./pages/NgoLayoutWithFooter";
import ModeratorGallery from "./pages/ModeratorGallery";
import ScrollToTop from "./components/ScrollTop";
import NGOLayoutWithFooter from "./pages/NgoLayoutWithFooter";
import IndividualCampaignView from "./pages/individualCampaignView";
import Volunteer from "./pages/Volunteer";
import NgoVolunteers from "./pages/NgoVolunteer";
import NeedHelp from "./pages/NeedHelp";
import HelpRequestHistory from "./pages/HelpRequestHistory";
import NgoHelpRequests from "./pages/NgoHelpRequests";
import CsrSendOtp from "./pages/CsrSendOtp";
import CsrVerifyOtp from "./pages/CsrVerifyOtp";
import CsrSetPassword from "./pages/CsrSetPassword";
import CsrBasicInfo from "./pages/CsrBasicInfo";
import CsrLogin from "./pages/CsrLogin";
import CsrDashboard from "./pages/CsrDashboard";
import CsrProtected from "./components/CsrProtected";
import CSRLayoutWithFooter from "./pages/CsrLayoutWithFooter";

function Home() {
  return (<></>);
}

export default function App() {
  return (
    <>
    <ScrollToTop />
      <Routes>
        <Route path="/set-password" element={<SetPassword />} />
        {/* <Route path="/" element={<HomeRedirect />} /> */}
        {/* <Route path="/ngo/verify-otp" element={<NgoOtpVerify/>}/> */}
        <Route path="/donor-auth" element={<DonorAuth />} />
        <Route path="/dashboard" element={<PublicLayout><IndividualProtected><Dashboard /></IndividualProtected></PublicLayout>} />
        <Route path="/donate" element = {<PublicLayout><IndividualProtected><Donate/></IndividualProtected></PublicLayout>}/>
        <Route path="/volunteer" element = {<PublicLayout><IndividualProtected><Volunteer/></IndividualProtected></PublicLayout>}/>
        <Route path="/request-help" element = {<PublicLayout><IndividualProtected><NeedHelp/></IndividualProtected></PublicLayout>}/>
        <Route path="/help-history" element = {<PublicLayout><IndividualProtected><HelpRequestHistory/></IndividualProtected></PublicLayout>}/>
        <Route path="/donation-history" element ={<PublicLayout><IndividualProtected><DonationHistory/></IndividualProtected></PublicLayout>}/>
        <Route path="/volunteer-history" element ={<PublicLayout><IndividualProtected><VolunteerHistory/></IndividualProtected></PublicLayout>}/>
        <Route path="/donations/:id/ngo" element={<PublicLayout><IndividualProtected><NgoPublicProfile /></IndividualProtected></PublicLayout>} />
        <Route path="/auth" element={<DonorAuth />} />
        <Route path="/donor-details" element={<PublicLayout><DonorDetails /></PublicLayout>} />
        <Route path="/ngo-signup" element={<NgoSignup/>}/>
        <Route path="/ngo-auth" element={<NgoAuth/>}/>
          <Route path="/csr-auth" element={<CsrAuth/>}/>

        <Route path="/ngo-dashboard" element={<NgoProtected><NgoLayoutWithFooter><NgoDashboard/></NgoLayoutWithFooter></NgoProtected>}/>

        <Route path="/csr-dashboard" element={<CsrProtected><CSRLayoutWithFooter><CsrDashboard/></CSRLayoutWithFooter></CsrProtected>}/>

        <Route
  path="/moderator/gallery"
  element={<ModeratorProtected><ModeratorGallery /></ModeratorProtected>}
/>

        <Route path="/moderator-dashboard" element={<ModeratorProtected><ModeratorLayout/></ModeratorProtected>}/>
        <Route path="/ngo-donations" element ={<NgoProtected><NgoLayoutWithFooter><NgoDonations/></NgoLayoutWithFooter></NgoProtected>}/>
        <Route path="/ngo-volunteers" element ={<NgoProtected><NgoLayoutWithFooter><NgoVolunteers/></NgoLayoutWithFooter></NgoProtected>}/>
        <Route path="/campaigns/create" element = {<PublicLayout><CampaignCreate/></PublicLayout>}/>
        <Route path="/campaign/create" element={<NgoProtected><NgoLayoutWithFooter><CreateCampaign /></NgoLayoutWithFooter></NgoProtected>} />
        <Route path="/campaign/my-campaigns" element={<NgoProtected><NgoLayoutWithFooter><MyCampaigns/> </NgoLayoutWithFooter>s</NgoProtected>}/>
        <Route path="/campaign/:id" element={<NgoProtected><NGOLayoutWithFooter><CampaignDetails/></NGOLayoutWithFooter></NgoProtected>} />
        <Route path="/individual/campaign/:id" element={<PublicLayout><IndividualProtected><IndividualCampaignView/></IndividualProtected></PublicLayout>} />
        <Route path="/ngo-help-requests" element={<NgoProtected><NgoLayoutWithFooter><NgoHelpRequests></NgoHelpRequests></NgoLayoutWithFooter></NgoProtected>}/>
        <Route path="/moderator-login" element={<ModeratorLogin />} />
        <Route path="/ngo-login" element={<NgoLogin />} />
        <Route path="/csr-login" element={<CsrLogin/>} />
        <Route path="/ngo/profile" element={<NgoProtected><NgoLayoutWithFooter><NgoProfileComplete/></NgoLayoutWithFooter></NgoProtected>} />
        <Route path="/ngo/gallery"element={<PublicLayout><NgoProtected><NgoLayoutWithFooter><NgoGallery/></NgoLayoutWithFooter></NgoProtected></PublicLayout>}/>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
<Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
<Route path="/privacy" element={<PublicLayout><Privacy /></PublicLayout>} />
<Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
<Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />


<Route path="/ngo/send-otp" element={<NgoSendOtp />} />
<Route path="/ngo/verify-otp" element={<NgoVerifyOtp />} />
<Route path="/ngo/set-password" element={<NgoSetPassword />} />
<Route path="/ngo/basic-info" element={<NgoBasicInfo/>}/>
<Route path="/csr/send-otp" element={<CsrSendOtp/>} />
<Route path="/csr/verify-otp" element={ <CsrVerifyOtp/>} />
<Route path="/csr/set-password" element={ <CsrSetPassword/>} />
<Route path="/csr/basic-info" element={<CsrBasicInfo/>}/>

{/* <Route path="/ngo/complete-profile" element={<NgoProfileWizard />} /> */}
<Route path="/campaigns" element={<PublicLayout><IndividualProtected><PublicCampaigns /></IndividualProtected></PublicLayout>} />
<Route path="/awards" element={<Awards />} />


<Route
  path="/profile"
  element={
    <IndividualProtected>
      <Profile />
    </IndividualProtected>
  }
/>

      </Routes>
      </>
  );
}
