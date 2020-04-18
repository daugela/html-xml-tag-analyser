from django.urls import re_path
from apps.tags.views import process_tags, mock_html, mock_xml

urlpatterns = [
    re_path("^process-tags$", process_tags),  # Expects POST with single valid parameter (url)
    re_path("^mock-html$", mock_html),
    re_path("^mock-xml$", mock_xml),
]
