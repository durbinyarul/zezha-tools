// import { useState } from "react";
import "./App.css";
import Dashboard from "./dashboard/Dashboard";
import BasicCalculator from "./Calculators/basiccalc";
import EmiCalculator from "./Calculators/emicalc";
import FDCalculator from "./Calculators/fdcalc";
import RDCalculator from "./Calculators/rdcalc";
import TDSCalculator from "./Calculators/tdscalc";
import SIPCalculator from "./Calculators/sipcalc";
import CurrencyConverter from "./Calculators/currencycalc";
import TAXCOMPARECalculator from "./Calculators/taxcomparecalc";
import DOBCalculator from "./Calculators/dobcalc";
import PERCENTAGECalculator from "./Calculators/percalc";
import VALUEOFPERCalculator from "./Calculators/valueofpercalc";
import OLDREGIMECalculator from "./Calculators/oldregimecalc";
import NEWREGIMECalculator from "./Calculators/newregimecalc";
import LOANCalculator from "./Calculators/loancalc";
import FindDayCalculator from "./Calculators/finddaycalc";
import ImageSearchDownloader from "./APIs/getImages";
import VideoSearchDownloader from "./APIs/getVideo";
import ChatBot from "./APIs/chatbot";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResumeBuilder from "./resume-builder/pages/ResumeBuilder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/basiccalc-calculator" element={<BasicCalculator />} />
        <Route path="/emi-calculator" element={<EmiCalculator />} />
        <Route path="/fd-calculator" element={<FDCalculator />} />
        <Route path="/rd-calculator" element={<RDCalculator />} />
        <Route path="/tds-calculator" element={<TDSCalculator />} />
        <Route path="/sip-calculator" element={<SIPCalculator />} />
        <Route path="/currency-calculator" element={<CurrencyConverter />} />
        <Route
          path="/taxcompare-calculator"
          element={<TAXCOMPARECalculator />}
        />
        <Route path="/dob-calculator" element={<DOBCalculator />} />
        <Route
          path="/percentage-calculator"
          element={<PERCENTAGECalculator />}
        />
        <Route path="/value-of-percentage" element={<VALUEOFPERCalculator />} />
        <Route path="/old-regime-tax" element={<OLDREGIMECalculator />} />
        <Route path="/new-regime-tax" element={<NEWREGIMECalculator />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/loan-calculator" element={<LOANCalculator />} />
        <Route path="/dayfind-calculator" element={<FindDayCalculator />} />
        <Route path="/image-downloader" element={<ImageSearchDownloader />} />
        <Route path="/video-downloader" element={<VideoSearchDownloader />} />
        <Route path="/chat-bot" element={<ChatBot />} />

        {/* You can add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
