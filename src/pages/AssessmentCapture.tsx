import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CaptureEmailForm } from "@/components/CaptureEmailForm";
import { trackFacebookEvent, FB_EVENTS } from "@/lib/utils/facebookTracking";

const AssessmentCapture = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, categories } = location.state || {};

  useEffect(() => {
    // If there's no state data, redirect back to assessment
    if (!answers || !categories) {
      navigate("/assessment");
      return;
    }

    // Log view of capture page
    trackFacebookEvent(FB_EVENTS.COMPLETE_ASSESSMENT, {
      total_questions_answered: Object.keys(answers).length,
      capture_page_viewed: true
    });
  }, [answers, categories, navigate]);

  const handleEmailCaptureComplete = (firstName: string, email: string) => {
    // Fire Meta pixel CompleteRegistration event
    trackFacebookEvent("CompleteRegistration", {
      first_name: firstName,
      email: email,
      content_name: "Assessment"
    });
    
    // Navigate to results page with all the needed data
    navigate("/assessment/results", { 
      state: { 
        answers, 
        categories,
        userInfo: {
          firstName,
          email
        }
      } 
    });
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
      <div className="relative z-[2] min-h-screen flex items-center justify-center p-8 md:p-12">
        <CaptureEmailForm onComplete={handleEmailCaptureComplete} />
      </div>
    </div>
  );
};

export default AssessmentCapture;
