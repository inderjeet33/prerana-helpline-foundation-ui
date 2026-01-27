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

function Home() {
  return (
  //   <div className="hero-container">
  //     {/* SMALL LOGO IN TOP LEFT */}
  //     <img
  //       src={logo}
  //       alt="Logo"
  //       style={{
  //         position: "absolute",
  //         top: "10px",
  //         left: "10px",
  //         height: "50px",
  //         zIndex: 1000,
  //       }}
  //     />

  //     <div className="overlay"></div>

  //     <div className="hero-content">
  //       <h1 className="title">Prerana Helpline Foundation</h1>
  //       <p className="subtitle">
  //         Empowering lives through compassion, care, and community support.
  //       </p>

  //       <div className="button-group">
  //         <Link to="/donor-auth">
  //           <button className="btn primary">Dote Now</button>
  //         </Link>

  //         <button className="btn secondary">Request Help</button>
  //         <button className="btn secondary">CSR Partnerships</button>
  //         <Link to= "/ngo-auth">
  //         <button className="btn secondary">NGO Login</button>
  //         </Link>
  //       </div>
  //     </div>
  //   </div>
  // );
  <></>);
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
        <Route path="/ngo-dashboard" element={<NgoProtected><NgoLayoutWithFooter><NgoDashboard/></NgoLayoutWithFooter></NgoProtected>}/>
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
        
        <Route path="/moderator-login" element={<ModeratorLogin />} />
        <Route path="/ngo-login" element={<NgoLogin />} />
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
