from deep_translator import GoogleTranslator

def translate_text(text, from_lang="en", to_lang="hi"):
    """Translate text using Google Translate (deep-translator wrapper)."""
    if not text:
        return ""
    return GoogleTranslator(source=from_lang, target=to_lang).translate(text)
