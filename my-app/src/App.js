import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Nav";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Team from "./Components/Team/Team";
import { Context } from "./ContextApi";
import { useContext, useEffect } from "react";
import AddMember from "./Components/CMS Section/AddMember/AddMember"
import ModifyMembers from "./Components/CMS Section/ModifyMembers/ModifyMembers"
import AddTestimonial from "./Components/CMS Section/AddTestimonials/AddTestimonials"
import ModifyTestimonials from "./Components/CMS Section/ModifyTestimonials/ModifyTestimonials"
import CMS from "./Components/CMS Section/Cms"
import axios from "axios";
import Gallery from "./Components/Gallery/Gallery";
import UploadMedia from "./Components/CMS Section/UploadMedia/UploadMedia";
import DeleteMedia from "./Components/CMS Section/DeleteMedia/DeleteMedia";
import Project from "./Components/Projects/Projects";
import IndividualProjectPage from "./Components/Projects/IndividualProjectPage";
import IndividualBlogPage from "./Components/IndividualBlogPage/IndividualBlogPage";
import Certificates from "./Components/CertificatesPage/Cartificates";
import MediaCoverage from "./Components/MediaCoverage/MediaCoveragePage";
import Vision from "./Components/Vision/Vision";
import OngoingInitiatives from "./Components/Ongoing Initiatives/OngoingInitiatives";
import Mission from "./Components/Mission/Mission";
import Impact from "./Components/Impact/Impact";
import ProgressBar from "./ProgressBar";
import Messages from "./Components/CMS Section/Messages/Messages";
import SocialMedia from "./Components/SocialMediaSection/SocialMedia";
import Careers from "./Components/Careers/Careers";
import JobApplicationPage from "./Components/Careers/JobApplicationPage";
import AddJobs from "./Components/CMS Section/AddJobsSection/AddJobs";
import JobApplications from "./Components/CMS Section/JobAplications/JobApplications";
import LoginPage from "./Components/LoginPage/Login";
import AccessDeclined from "./Components/AccessDeclined/AccessDeclined";
import AddBlogs from "./Components/CMS Section/AddBlogs/AddBlogs";
import AddProjects from "./Components/CMS Section/AddProjects/AddProjects";
import GalleryImageViewer from "./Components/Gallery/GalleryImageViewer";
import AddGalleryMedia from "./Components/CMS Section/AddGalleryMedia/AddGalleryMedia";
import Centers from "./Components/Centers/Centers";
import CenterDetailsPage from "./Components/Centers/CenterDetailsPage";
import AddEvents from "./Components/CMS Section/AddEvents/AddEvents";
import DeleteEvents from "./Components/CMS Section/DeleteEvents/DeleteEvents";
function App() {
  let { items, setItems, images, setImages, setCareerData, isAdmin, setIsAdmin, projectsData, setProjectsData, page, setPage, maxPage, setMaxPage,setEvents } = useContext(Context)
  useEffect(() => {
    axios.get("https://futuristic-unexpected-citrine.glitch.me/team").then(res => {
      setItems(res.data)
    })
    // axios.get("https://futuristic-unexpected-citrine.glitch.me/gallery").then(res => {
    //   setImages(res.data)
    // })
    axios.get("https://futuristic-unexpected-citrine.glitch.me/Jobs").then(res => {
      setCareerData(res.data)
    })
    axios.get("https://futuristic-unexpected-citrine.glitch.me/Projects").then(res => {
      setProjectsData(res.data)
      console.log(res.data)
    })
    axios.get("https://futuristic-unexpected-citrine.glitch.me/event").then((res) => {
      let data = res.data;
      data.sort((a,b)=>new Date(b.date)-new Date(a.date));
      setEvents(data.slice(0,3))
    });
  }, [])

  useEffect(() => {
    axios.get(`https://futuristic-unexpected-citrine.glitch.me/gallery/?_page=${page}&_limit=4`).then(res => {
      setMaxPage(Math.ceil(res.headers["x-total-count"] / 4));
      setImages(res.data);
      // window.scrollTo(0,0)
    })
  }, [page])
  return (
    <>
      <SocialMedia />
      <ProgressBar />
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Home" element={<LandingPage />} />
        <Route path="/About" element={<LandingPage />} />
        <Route path="/Team" element={<Team />} />
        <Route path="/Project" element={<LandingPage />} />
        <Route path="/OutInitiatives" element={<LandingPage />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/Gallery/:index" element={<GalleryImageViewer />} />
        <Route path="/Projects" element={<Project />} />
        <Route path="/Certificates" element={<Certificates />} />
        <Route path="/MediaCoverage" element={<MediaCoverage />} />
        <Route path="/Vision" element={<Vision />} />
        <Route path="/OngoingInitiatives" element={<OngoingInitiatives />} />
        <Route path="/Mission" element={<Mission />} />
        <Route path="/Impact" element={<Impact />} />
        <Route path="/Career" element={<Careers />} />
        <Route path="/Centers" element={<Centers />} />
        <Route path="/Centers/:CenterID" element={<CenterDetailsPage />} />
        <Route path="/Projects/:projectID" element={<IndividualProjectPage />} />
        <Route path="/Blog/:blogID" element={<IndividualBlogPage />} />
        <Route path="/Career/:JobID" element={<JobApplicationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="CMS" element={isAdmin ? <CMS /> : <AccessDeclined />}>
          <Route index path='AddMember' element={<AddMember />} />
          <Route path='UpdateMembers' element={<ModifyMembers />} />
          <Route path='AddTestimonial' element={<AddTestimonial />} />
          <Route path='ModifyTestimonials' element={<ModifyTestimonials />} />
          <Route path='AddMedia' element={<UploadMedia />} />
          <Route path='UploadGallery' element={<DeleteMedia />} />
          <Route path='AddJobs' element={<AddJobs />} />
          <Route path='JobApplications' element={<JobApplications />} />
          <Route path='Messages' element={<Messages />} />
          <Route path='AddBlogs' element={<AddBlogs />} />
          <Route path='AddProjects' element={<AddProjects />} />
          <Route path='AddGalleryMedia' element={<AddGalleryMedia />} />
          <Route path='AddEvents' element={<AddEvents />} />
          <Route path='DeleteEvents' element={<DeleteEvents />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}
export default App;
