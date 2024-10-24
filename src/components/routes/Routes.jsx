import { Routes as AppRoutes, Route } from "react-router-dom";
import Step1 from "../form compomnents/Step1";



const Routes = () => {
    return (
      <AppRoutes>
        <Route path="/" element={<Step1 />} />

      </AppRoutes>
    );
  };
  
  export default Routes;
  