interface TranslationResult {
    detectedLanguage: string;
    translation: string;
}

export async function detectLanguageAndTranslateWithOpenAI(text: string, targetLanguage: string, apiKey: string): Promise<TranslationResult> {
    if (!apiKey) {
        throw new Error("OpenAI API key is not provided.");
    }

    const API_URL = "https://api.openai.com/v1/chat/completions";

    const systemPrompt = `You are an expert multilingual translator. Your task is to detect the language of a given text and translate it into a specified target language.
You must respond ONLY with a valid JSON object. Do not add any extra text or explanations.
The JSON object must have the following structure:
{
  "detectedLanguage": "The full name of the detected language, e.g., 'Spanish'",
  "translation": "The translated text in the target language."
}`;

    const userPrompt = `Text: "${text}"\nTarget Language: ${targetLanguage}`;
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ],
                response_format: { type: "json_object" }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("OpenAI API Error:", errorData);
            throw new Error(`Failed to get translation from OpenAI: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        const content = data.choices[0]?.message?.content;

        if (!content) {
            throw new Error("Invalid response format from OpenAI API: No content found.");
        }
        
        const result = JSON.parse(content);

        if (result && result.detectedLanguage && result.translation) {
             return result as TranslationResult;
        } else {
            throw new Error("Invalid JSON structure in OpenAI response.");
        }
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("An unknown error occurred while communicating with OpenAI.");
    }
}
