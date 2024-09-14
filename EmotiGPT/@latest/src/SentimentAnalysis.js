const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
console.log("API Key:", apiKey); // Log the API key to check if it's undefined or correct

export const analyzeSentiment = async (text) => {
  if (!apiKey) {
    console.error("API key is missing!");
    return "API key error";
  }

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          inputs: text,
        }),
      },
    );

    if (response.status === 503) {
      console.log("Model is still loading, retrying...");
      // Wait for the estimated time provided in the error response (in seconds)
      await new Promise((resolve) =>
        setTimeout(resolve, data.estimated_time * 1000),
      );
      return analyzeSentiment(text); // Retry the sentiment analysis
    }

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("API Error:", errorDetails);
      throw new Error(`API Error: ${errorDetails.error.message}`);
    }

    const data = await response.json();
    console.log("Raw API response:", data);

    if (data && data.length > 0) {
      return data[0].label;
    } else {
      return "No sentinment analyzed";
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return "Error analyzing sentiment.";
  }

  //console.log("API Key:", apiKey);
};
