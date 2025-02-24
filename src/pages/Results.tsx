
import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AssessmentResults } from "@/components/AssessmentResults";
import { trackFacebookEvent } from "@/lib/utils/facebookTracking";

const Results = () => {
  const location = useLocation();
  const state = location.state as { 
    answers?: Record<string, number>;
    categories?: any[];
  } | null;

  useEffect(() => {
    // Track completion in Facebook
    if (window.fbq) {
      window.fbq('track', 'CompleteRegistration');
    }
  }, []);

  // If no state is passed, redirect to assessment
  if (!state?.answers || !state?.categories) {
    return <Navigate to="/assessment" replace />;
  }

  return (
    <AssessmentResults
      answers={state.answers}
      categories={state.categories}
      onStartOver={() => window.location.href = '/assessment'}
    />
  );
};

export default Results;
