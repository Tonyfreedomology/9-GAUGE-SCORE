import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AssessmentResults as ResultsComponent } from "@/components/AssessmentResults";
import { trackFacebookEvent, FB_EVENTS } from "@/lib/utils/facebookTracking";

const AssessmentResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, categories, userInfo } = location.state || {};

  useEffect(() => {
    // If there's no state data, redirect back to assessment
    if (!answers || !categories) {
      navigate("/assessment");
      return;
    }

    // If no user info, redirect to capture page
    if (!userInfo) {
      navigate("/assessment/capture", { state: { answers, categories } });
      return;
    }

    // Only track CompleteRegistration if registration was just completed
    if (userInfo.registrationComplete) {
      trackFacebookEvent("CompleteRegistration", {
        first_name: userInfo.firstName,
        email: userInfo.email,
        content_name: "Assessment"
      });
    }
  }, [answers, categories, userInfo, navigate]);

  const handleStartOver = () => {
    // Clear the localStorage flag to ensure StartAssessment will fire on restart
    localStorage.removeItem('hasStartedAssessment');
    trackFacebookEvent(FB_EVENTS.START_ASSESSMENT);
    navigate("/assessment");
  };

  if (!answers || !categories || !userInfo) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('https://static.wixstatic.com/media/af616c_493e2c122a7049cf84997445a1c30517~mv2.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />
      {/* Dark overlay */}
      <div className="fixed inset-0 z-[1] bg-black/60" />
      
      {/* Content */}
      <div className="relative z-[2] min-h-screen px-0 py-8 md:p-12 bg-transparent">
        <div className="fixed inset-0 z-[-1] pointer-events-none" />
        <ResultsComponent
          answers={answers}
          categories={categories}
          onStartOver={handleStartOver}
          userInfo={userInfo}
        />
      </div>
    </div>
  );
};

export default AssessmentResults;
