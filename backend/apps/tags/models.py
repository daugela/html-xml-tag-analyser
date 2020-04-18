from django.db import models


# All the tags found by the app in different pages/URLs
class Tag(models.Model):
    tag = models.CharField(max_length=10, verbose_name="Tag")

    def __str__(self):
        return f"{self.tag}"

    class Meta:
        verbose_name = "Tag"
        verbose_name_plural = "Tags"
        db_table = "tags"


# Count of one specific tag that belongs to one URL
class Count(models.Model):
    tag = models.ForeignKey(Tag, on_delete=models.PROTECT)
    count = models.PositiveSmallIntegerField()

    def __str__(self):
        return f"{self.tag.tag} - {self.count}"

    class Meta:
        verbose_name = "Count"
        verbose_name_plural = "Counts"
        db_table = "counts"


# Collection of URLs that app has cached with some tag statistics
# collected according to functional requirements
class Url(models.Model):
    url = models.URLField(verbose_name="URL")
    total = models.PositiveSmallIntegerField()
    counts = models.ManyToManyField(Count)
    deepest = models.CharField(max_length=300, verbose_name="Deepest")
    path = models.CharField(max_length=300, verbose_name="Deepest path with most of most popular tags")
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.url}"

    class Meta:
        verbose_name = "URL"
        verbose_name_plural = "URLs"
        db_table = "urls"
