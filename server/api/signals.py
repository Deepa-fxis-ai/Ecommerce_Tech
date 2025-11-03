from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Product
from .tasks import translate_product_task

from django.contrib.auth.models import User
from .models import UserProfile

@receiver(post_save,sender=Product)
def trigger_translation(sender,instance,created,**kwargs):
    if created:
        translate_product_task.delay(instance.id)

@receiver(post_save,sender=User)
def create_or_update_user_profile(sender,instance,created,**kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    else:
        instance.profile.save()