from bs4 import BeautifulSoup
import re
import json
import collections


class Results(object):
    def __init__(self, status: int, total: int, unique: int, top: [], deepest: str, path: str):
        self.status = status
        self.total = total
        self.unique = unique
        self.top = top
        self.deepest = deepest
        self.path = path


def analyze_dom_tags(html):
    # Shockingly %) BeautifulSoap does not have methods for statistical data extraction...
    # Using regex to quickly find all <tag openings that matches regex <lowercase[space]
    tags_all = re.findall(r"<[a-z0-9]+", html, re.MULTILINE)  # Using raw response.text here

    # Squeeze all tags into set for list of unique tag values
    tags_unique = list(set(tags_all))

    # Use collections to find counts of every unique tag in the list
    tags_counts = collections.Counter(tags_all)

    # Build list of unique tags with respective count
    # Also strip tag names into alphabetical-only values (from previous regex list of matches)
    tags_counts_tuples = [(tag.strip("<"), tags_counts[tag]) for tag in tags_counts]

    # Built list of most popular tags in the document
    tags_top = sorted(tags_counts_tuples, key=lambda tag: tag[1], reverse=True)

    # Feed document into BS.. "Beautiful Soap" not the ~other BS :)
    # soup = BeautifulSoup(dom.content, "html.parser")  # HTML parser included in standard library
    soup = BeautifulSoup(html, "html.parser")  # HTML parser included in standard library
    # soup = BeautifulSoup(response.content, "lxml")  # For consideration later
    # soup = BeautifulSoup(response.content, "xml")  # For consideration later

    # Find all tags with no child elements (deepest in DOM)
    # Use sorted top tag list here (but might also be unsorted list of tags - until its list of unique tags)
    tags_deepest = []
    for tag in tags_top:
        matches = soup.find_all(tag)
        for single_match in matches:
            if len(single_match.contents) < 2:
                tags_deepest.append(single_match)

    #  Process the DOM tree. Try to calculate depths going up the DOM from every previously found deepest tag
    #  While calculating how many of the most used/popular tag appears in the path tree
    paths = []
    for tag in tags_deepest:
        count = 0  # Occurrences of the most popular tag in the tree
        for parent_tag in tag.parents:
            if parent_tag is not None:
                if parent_tag.name == tags_top[0][0]:
                    count += 1
        paths.append((tag, count))

    path_deepest = max(paths, key=lambda tag: tag[1])

    #  Build simple tag > tag > tag tree view for the deepest result tag in UI
    display_path = path_deepest[0].name
    for parent in path_deepest[0].parents:
        if parent is not None:
            display_path = "{0} > {1}".format(parent.name, display_path)

    return Results(
        200, len(tags_all),
        len(tags_unique),
        list(tags_top),
        str(path_deepest[0]),
        display_path
    )
