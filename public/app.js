document.addEventListener('DOMContentLoaded', () => {
    const sourceLanguageSelect = document.getElementById('sourceLanguage');
    const targetLanguageSelect = document.getElementById('targetLanguage');
    const textToTranslateInput = document.getElementById('textToTranslate');
    const translateButton = document.getElementById('translateButton');
    const translatedTextDiv = document.getElementById('translatedText');

    // Fetch the list of languages and populate the dropdowns
    fetch('/api/list-languages')
        .then(response => response.json())
        .then(data => {
            data.Languages.forEach(language => {
                const sourceOption = document.createElement('option');
                sourceOption.value = language.LanguageCode;
                sourceOption.textContent = language.LanguageName;
                sourceLanguageSelect.appendChild(sourceOption);

                const targetOption = document.createElement('option');
                targetOption.value = language.LanguageCode;
                targetOption.textContent = language.LanguageName;
                targetLanguageSelect.appendChild(targetOption);
            });
        })
        .catch(error => {
            console.error('Error fetching language list:', error);
        });

    // Handle the translate button click
    translateButton.addEventListener('click', () => {
        const sourceLanguage = sourceLanguageSelect.value;
        const targetLanguage = targetLanguageSelect.value;
        const textToTranslate = textToTranslateInput.value.trim();

        if (sourceLanguage && targetLanguage && textToTranslate) {
            console.log(sourceLanguage);
            fetch('/api/translate-text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: textToTranslate,
                    sourcelanguage: sourceLanguage,
                    targetlanguage: targetLanguage
                })
            })
            .then(response => response.json())
            .then(data => {
                translatedTextDiv.textContent = `Translated Text: ${data.TranslatedText}`;
            })
            .catch(error => {
                console.error('Error translating text:', error);
                translatedTextDiv.textContent = 'An error occurred while translating the text.';
            });
        } else {
            alert('Please fill in all fields.');
        }
    });
});
