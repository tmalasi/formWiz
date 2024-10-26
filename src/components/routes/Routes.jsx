import { Routes as AppRoutes, Route } from "react-router-dom";
import React, { useState, Suspense, lazy } from "react";

// Lazy load components
const Step1 = lazy(() => import("../formCompomnents/Step1"));
const Step2 = lazy(() => import("../formCompomnents/Step2"));
const Step3 = lazy(() => import("../formCompomnents/Step3"));
const Step4 = lazy(() => import("../formCompomnents/Step4"));
const HomePage = lazy(() => import("../formCompomnents/HomePage"));
const Display = lazy(() => import("../display components/Display"));
const AllCVsDisplay = lazy(() => import("../display components/AllCVsDisplays"));

const Routes = () => {
  //so that in the steps we are able to access and modify the same data
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    nationality: "",
    dob: "",
    linkedin: "",
    github: "",
    dateCreate:"",
    workExperience: [],
    projects: [],
    education: [],
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppRoutes>
        <Route path="/" element={<HomePage />} />
        <Route path="/step1" element={<Step1 formData={formData} setFormData={setFormData} />} />
        <Route path="/step2" element={<Step2 formData={formData} setFormData={setFormData} />} />
        <Route path="/step3" element={<Step3 formData={formData} setFormData={setFormData} />} />
        <Route path="/step4" element={<Step4 formData={formData} setFormData={setFormData} />} />
        <Route path="/card">
          <Route path="" element={<AllCVsDisplay />} />
          <Route path=":display" element={<Display />} />
        </Route>
      </AppRoutes>
    </Suspense>
  );
};

export default Routes;
