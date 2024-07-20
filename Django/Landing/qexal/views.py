from account.models import Contact
from django.http.response import JsonResponse
from django.shortcuts import render
from django.http import HttpResponse
from django.core.mail import BadHeaderError, message, send_mail
from django.core.mail import EmailMessage
from django.conf import settings

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
        comment = request.POST.get("comment")
        c = Contact()
        c.name=name,
        c.email=email,
        c.subject=subject,
        c.comment=comment,
        c.save()
        
        if name and email and subject and comment != "":
            subject = "Thank You"
            from_mail = 'wozia@support.com'
            message = "Thank you for contact us"
            send_mail(subject, message, from_mail, [email],fail_silently=False)
            data = {
                'success_message' : 'Email Successfully send'
            }
            return JsonResponse(data,safe=False)