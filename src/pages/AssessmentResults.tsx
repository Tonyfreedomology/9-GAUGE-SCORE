import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AssessmentResults as ResultsComponent } from "@/components/AssessmentResults";
import { trackFacebookEvent, FB_EVENTS } from "@/lib/utils/facebookTracking";

const AssessmentResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, categories } = location.state || {};

  useEffect(() => {
    // If there's no state data, redirect back to assessment
    if (!answers || !categories) {
      navigate("/assessment");
      return;
    }

    // Fire Meta pixel CompleteRegistration event
    trackFacebookEvent("CompleteRegistration");
    
    // Also fire our custom complete assessment event
    trackFacebookEvent(FB_EVENTS.COMPLETE_ASSESSMENT, {
      total_questions_answered: Object.keys(answers).length
    });
  }, [answers, categories, navigate]);

  const handleStartOver = () => {
    trackFacebookEvent(FB_EVENTS.START_ASSESSMENT);
    navigate("/assessment");
  };

  if (!answers || !categories) {
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
      <div className="relative z-[2] min-h-screen p-8 md:p-12">
        <ResultsComponent
          answers={answers}
          categories={categories}
          onStartOver={handleStartOver}
        />
      </div>
    </div>
  );
};

export default AssessmentResults;
