
import { useLocation, Navigate } from 'react-router-dom';
import { AssessmentResults } from '@/components/AssessmentResults';
import { useEffect } from 'react';
import { trackFacebookEvent } from '@/lib/utils/facebookTracking';

const Results = () => {
  const location = useLocation();
  const state = location.state as { 
    answers?: Record<string, number>;
    categories?: any[];
  } | null;

  useEffect(() => {
    if (state?.answers && state?.categories) {
      // Track completion with Facebook Pixel
      trackFacebookEvent('CompleteRegistration');
    }
  }, [state]);

  // If someone tries to access results directly without data, redirect to assessment
  if (!state?.answers || !state?.categories) {
    return <Navigate to="/assessment" replace />;
  }

  const handleStartOver = () => {
    window.location.href = '/assessment';
  };

  return (
    <AssessmentResults
      answers={state.answers}
      categories={state.categories}
      onStartOver={handleStartOver}
    />
  );
};

export default Results;
