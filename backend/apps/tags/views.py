import requests
import json
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .utils import analyze_dom_tags, Results
from django.shortcuts import render
from .models import Url, Count, Tag


'''
#################### Excuse #############################
 I should probably have used DRF for APIs under Django...
 But it is just a small project with few simple models :)
 And I am applying for Frontend engineering position :)
 So therefore quick and ~dirty API with function based views
#########################################################
'''


@csrf_exempt
@never_cache
def process_tags(request):

    if request.method != "POST":
        return JsonResponse({"status": 401, "message": "Invalid request"}, safe=False, status=401)

    # TODO: proper ~regex for incoming url. Currently (for simplicity) front-end validation only
    json_data = json.loads(request.body)
    
    try:
        url = json_data['url']
    except KeyError:
        JsonResponse({"status": 403, "message": "Invalid request passed"}, safe=False, status=403)

    if len(url) < 5:
        return JsonResponse({"status": 403, "message": "Invalid url passed"}, safe=False, status=403)

    # Check cached url values - maybe we have processed/cached the requested page already..
    cache = Url.objects.filter(url=url).first()

    if cache is None:
        # No cache exists.. usual procedure
        try:
            response = requests.get(url)
            if response.status_code != 200:
                return JsonResponse({"status": 503, "message": "Provided URL is not reachable"}, safe=False, status=503)
        except requests.exceptions.RequestException as e:
            return JsonResponse({"status": 503, "message": str(e)}, safe=False, status=503)

        # Heavy lifting. Separated into utils
        result = analyze_dom_tags(url, response.text)

        # Save results ~cache into db
        new_url = Url.objects.create(
            url=url,
            total=result.total,
            deepest=result.deepest,
            path=result.path,
        )

        for single in result.top:
            new_tag, created = Tag.objects.get_or_create(tag=single[0])
            count = [item for item in result.top if item[0] == single[0]][0][1]  # TODO: A bit dirty. Refactor
            new_count = Count.objects.create(tag=new_tag, count=count)
            new_url.counts.add(new_count)
    else:
        # Serving constructed Results data from cached item
        result = Results(
            url=cache.url,
            total=cache.total,
            unique=cache.counts.count(),
            top=[[stats.tag.tag, stats.count] for stats in cache.counts.all()],  # TODO: Might also be improved
            deepest=cache.deepest,
            path=cache.path
        )

    # Return cached/saved or newly fetched results
    return JsonResponse(result.__dict__, safe=False)


def mock_html(request):
    template = "tags/mock-html.html"
    return render(request, template)


def mock_xml(request):
    template = "tags/mock-xml.html"
    return render(request, template, content_type='text/xml')
