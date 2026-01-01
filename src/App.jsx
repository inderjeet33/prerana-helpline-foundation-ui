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
import ModeratorLayout from "./pages/ModeratorLayout";
import NgoDonations from "./pages/NgoDonations";
import CampaignCreate from "./pages/CampaignCreate";
import NGOLayout from "./pages/NgoLayout";
import CreateCampaign from "./pages/createCampaign";
import CampaignCard from "./pages/CampaignCard";
import MyCampaigns from "./pages/MyCampaign";
import CampaignDetails from "./pages/CampaignDetails";
import DonationHistory from "./pages/DonationHistory";
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

function Home() {
  return (
    <div className="hero-container">
      {/* SMALL LOGO IN TOP LEFT */}
      <img
        src={logo}
        alt="Logo"
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          height: "50px",
          zIndex: 1000,
        }}
      />

      <div className="overlay"></div>

      <div className="hero-content">
        <h1 className="title">Prerana Helpline Foundation</h1>
        <p className="subtitle">
          Empowering lives through compassion, care, and community support.
        </p>

        <div className="button-group">
          <Link to="/donor-auth">
            <button className="btn primary">Donate Now</button>
          </Link>

          <button className="btn secondary">Request Help</button>
          <button className="btn secondary">CSR Partnerships</button>
          <Link to= "/ngo-auth">
          <button className="btn secondary">NGO Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
      <Routes>
        <Route path="/set-password" element={<SetPassword />} />
        {/* <Route path="/" element={<HomeRedirect />} /> */}
        {/* <Route path="/ngo/verify-otp" element={<NgoOtpVerify/>}/> */}
        <Route path="/donor-auth" element={<DonorAuth />} />
        <Route path="/dashboard" element={<IndividualProtected><Dashboard /></IndividualProtected>} />
        <Route path="/donate" element = {<IndividualProtected><Donate/></IndividualProtected>}/>
        <Route path="/donation-history" element ={<IndividualProtected><DonationHistory/></IndividualProtected>}/>
        <Route path="/donations/:id/ngo" element={<IndividualProtected><NgoPublicProfile /></IndividualProtected>} />
        <Route path="/auth" element={<DonorAuth />} />
        <Route path="/donor-details" element={<DonorDetails />} />
        <Route path="/ngo-signup" element={<NgoSignup/>}/>
        <Route path="/ngo-auth" element={<NgoAuth/>}/>
        <Route path="/ngo-dashboard" element={<NgoProtected><NGOLayout><NgoDashboard/></NGOLayout></NgoProtected>}/>
        <Route path="/moderator-dashboard" element={<ModeratorProtected><ModeratorLayout/></ModeratorProtected>}/>
        <Route path="/ngo-donations" element ={<NgoProtected><NGOLayout><NgoDonations/></NGOLayout></NgoProtected>}/>
        <Route path="/campaigns/create" element = {<CampaignCreate/>}/>
        <Route path="/campaign/create" element={<NGOLayout><CreateCampaign /></NGOLayout>} />
        <Route path="/campaign/my-campaigns" element={<NGOLayout><MyCampaigns/> </NGOLayout>}/>
        <Route path="/campaign/:id" element={<IndividualProtected><CampaignDetails/></IndividualProtected>} />
        <Route path="/moderator-login" element={<ModeratorLogin />} />
        <Route path="/ngo-login" element={<NgoLogin />} />
        <Route path="/ngo/profile" element={<NgoProtected><NGOLayout><NgoProfileComplete/></NGOLayout></NgoProtected>} />
        <Route path="/ngo/gallery"element={<NgoProtected><NGOLayout><NgoGallery/></NGOLayout></NgoProtected>}/>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
<Route path="/" element={<HomeRedirect />} />



<Route path="/ngo/send-otp" element={<NgoSendOtp />} />
<Route path="/ngo/verify-otp" element={<NgoVerifyOtp />} />
<Route path="/ngo/set-password" element={<NgoSetPassword />} />
<Route path="/ngo/basic-info" element={<NgoBasicInfo/>}/>
{/* <Route path="/ngo/complete-profile" element={<NgoProfileWizard />} /> */}
<Route path="/campaigns" element={<IndividualProtected><PublicCampaigns /></IndividualProtected>} />
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
  );
}
