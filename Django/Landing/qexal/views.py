from django.http.response import JsonResponse
from django.shortcuts import render, redirect
from django.core.mail import send_mail, BadHeaderError
from django.conf import settings
import re
from django.utils import translation
from django.http import HttpResponse

def set_language(request, lang_code):
    # Activate the selected language
    translation.activate(lang_code)

    # Redirect back to the previous page or home page
    response = redirect(request.META.get('HTTP_REFERER', '/'))

    # Set a cookie to remember the user's language preference
    response.set_cookie(settings.LANGUAGE_COOKIE_NAME, lang_code)

    return response

# Index Pages
def index(request):
    return render(request,"index/index.html")
def index1(request):
    return render(request,"index/index-1.html")
def index2(request):
    return render(request,"index/index-2.html")
def index3(request):
    return render(request,"index/index-3.html")
def index4(request):
    return render(request,"index/index-4.html")
def index5(request):
    return render(request,"index/index-5.html")
def index6(request):
    return render(request,"index/index-6.html")
def index7(request):
    return render(request,"index/index-7.html")
def index8(request):
    return render(request,"index/index-8.html")
def index9(request):
    return render(request,"index/index-9.html")

# Contact Form
def contact(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        subject = request.POST.get("subject")
        comments = request.POST.get("comments")

        if not name:
            return JsonResponse({'error_message': 'You must enter your name.'}, status=400)
        if not email or not is_email(email):
            return JsonResponse({'error_message': 'Please enter a valid email address.'}, status=400)
        if not comments:
            return JsonResponse({'error_message': 'Please enter your message.'}, status=400)

        # Email details
        email_subject = f'You have been contacted by {name}.'
        email_body = f"You have been contacted by {name}. Their additional message is as follows.\n\n\"{comments}\"\n\nYou can contact {name} via email, {email}"

        try:
            send_mail(
                email_subject,
                email_body,
                settings.DEFAULT_FROM_EMAIL,
                [settings.CONTACT_EMAIL],
                fail_silently=False,
            )
            return JsonResponse({'success_message': 'Email Sent Successfully.'})
        except BadHeaderError:
            return JsonResponse({'error_message': 'Invalid header found.'}, status=400)
    else:
        return render(request, "contact.html")

def is_email(email):
    email_regex = r"(^[-_.a-zA-Z0-9]+@[-_.a-zA-Z0-9]+\.[a-zA-Z]{2,}$)"
    return re.match(email_regex, email) is not None
