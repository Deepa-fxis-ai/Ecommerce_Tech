from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Product
from .tasks import translate_product_task

@receiver(post_save,sender=Product)
def trigger_translation(sender,instance,created,**kwargs):
    if created:
        translate_product_task.delay(instance.id)