# HTML. XML analysis tool

## Task
Write a simple web page or HTML analysis tool to extract specific insights about the webpage or a simple XML file.

## Technical requirements
Use any technology or programming language of your preference, however it has to be open source and you must provide detailed instructions on how to launch the code.
You can use additional libraries for the document parsing but the statistics and insights should be collected by your algorithm.
Include some tests for your code, 100% coverage is not required, focus on some key functionalities.  

## Functional requirements
The webpage URL has to be provided as a parameter.  
Find all unique tags used in the document.  
Find the most commonly used tag.  
Find the longest path in the document tree where the most popular tag is used the most times.  
All 3 insights can be presented in your preferred way.

## Solution
- Django backend with API endpoint
- Docker container
- TODO: Proper react Frontend

## Run
```
git clone https://github.com/daugela/html-xml-tag-analyser.git
```
```
cd html-xml-tag-analyser
```
```
docker-compose up
```
Pass POST requests with url parameter to http://0.0.0.0:8000/process-tags  
Expect ~response with processed url results:  

```json
{
    "status": 200,
    "total": 235,
    "unique": 23,
    "top": [
        [
            "div",
            79
        ],
        [
            "link",
            30
        ],
        [
            "a",
            27
        ],
        [
            "span",
            21
        ],
        [
            "li",
            15
        ],
        [
            "meta",
            12
        ],
        [
            "img",
            12
        ],
        [
            "p",
            11
        ]
    ],
    "deepest": "<a class=\"btn primary\" href=\"/\">Check out our sales</a>",
    "path": "[document] > html > body > header > div > div > div > div > div > div > div > div > a"
}
```