
declare global {
  interface Window {
    fbq?: (event: string, eventName: string, params?: object) => void;
  }
}

export const trackFacebookEvent = (eventName: string, params?: object) => {
  if (window.fbq) {
    console.log('Tracking FB event:', eventName, params);
    window.fbq('track', eventName, params);
  } else {
    console.warn('Facebook Pixel not initialized');
  }
};

export const FB_EVENTS = {
  START_ASSESSMENT: 'StartAssessment',
  COMPLETE_QUESTION: 'CompleteQuestion',
  COMPLETE_ASSESSMENT: 'CompleteAssessment',
  COMPLETE_REGISTRATION: 'CompleteRegistration'
} as const;
