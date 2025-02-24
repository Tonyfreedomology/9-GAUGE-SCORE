
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
        <AssessmentResults
          answers={state.answers}
          categories={state.categories}
          onStartOver={handleStartOver}
        />
      </div>
    </div>
  );
};

export default Results;
