from celery import shared_task
from .models import Product, ProductTranslation
from .translation_utils import translate_text

@shared_task
def translate_product_task(product_id, from_lang="en", to_lang=None):
    to_langs = to_lang if isinstance(to_lang, list) else (
        ["hi", "ta", "ml"] if to_lang is None else [to_lang]
    )

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return "Product Not Found"

    for lang in to_langs:
        name = translate_text(product.product_name, from_lang, lang) if product.product_name else ""
        desc = translate_text(product.description, from_lang, lang) if product.description else ""

        ProductTranslation.objects.update_or_create(
            product=product,
            language=lang,
            defaults={
                "name": name,
                "description": desc,
                "auto_translated": True,
            },
        )

    return "Done"
