import json
from django.test import Client, TestCase
from django.template.loader import render_to_string
from django.http import HttpResponse
from .utils import analyze_dom_tags
#from .models import Tag, Count, Url
from django.urls import reverse
from django.urls import resolve
from django.http import HttpRequest

from apps.tags.views import process_tags


class TagsTestCase(TestCase):
    def setUp(self):
        # Nothing to setup
        pass

    def tearDown(self):
        # Nothing to tear down
        pass

    # Test some known/expected values from 2 predefined templates htmls

    def test_mock_html(self):
        rendered = render_to_string("tags/mock-html.html")
        result = analyze_dom_tags(rendered)
        # Total tags
        self.assertEqual(result.total, 20)
        # unique tags
        self.assertEqual(result.unique, 14)
        # Should be found as deepest
        self.assertEqual(result.deepest,
            "<p class=\"correct_deeper\">This is a paragraph which\n                                  is the correct answer. It is next ~deeper below h2 (deepest sibling)</p>")

    def test_mock_xml(self):
        rendered = render_to_string("tags/mock-xml.html")
        result = analyze_dom_tags(rendered)
        # Total tags
        self.assertEqual(result.total, 19)
        # unique tags
        self.assertEqual(result.unique, 11)
        # Should be found as deepest
        self.assertEqual(result.deepest, "<book>The correct answer book</book>")

