export const submitSignupForm = async (formData: FormData, date: Date | null, webhookUrl: string) => {
  const formValues = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    sprintType: formData.get('sprintType'),
    startDate: date ? new Date(date.setHours(6, 0, 0)).toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace(',', '') : null
  };

  console.log("Form submission:", formValues);
  console.log("Attempting to call webhook URL:", webhookUrl);
  
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "no-cors",
    body: JSON.stringify(formValues),
  });

  console.log("Webhook response received");
  return response;
};