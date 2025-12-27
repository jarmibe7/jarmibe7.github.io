---
layout: page
title: Projects
permalink: /projects/
description: A growing collection of my projects.
nav: true
nav_order: 3
# display_categories: [work, fun]
horizontal: false
---

<div class="projects">

{% assign sorted_projects = "" | split: "" %}

{%- comment -%}
Build the sorted list by looping through the ranking file
{%- endcomment -%}
{% for project_id in site.data.project_order %}
  {% assign proj = site.projects | where: "project_id", project_id | first %}
  {% if proj %}
    {% assign sorted_projects = sorted_projects | push: proj %}
  {% endif %}
{% endfor %}

{% if site.enable_project_categories and page.display_categories %}

  {% for category in page.display_categories %}
    <a id="{{ category }}" href=".#{{ category }}">
      <h2 class="category">{{ category }}</h2>
    </a>

    {% assign categorized_projects = sorted_projects | where: "category", category %}

    {% if page.horizontal %}
      <div class="container">
        <div class="row row-cols-1 row-cols-md-2">
          {% for project in categorized_projects %}
            {% include projects_horizontal.liquid %}
          {% endfor %}
        </div>
      </div>
    {% else %}
      <div class="row row-cols-1 row-cols-md-3">
        {% for project in categorized_projects %}
          {% include projects.liquid %}
        {% endfor %}
      </div>
    {% endif %}
  {% endfor %}

{% else %}

  {% if page.horizontal %}
    <div class="container">
      <div class="row row-cols-1 row-cols-md-2">
        {% for project in sorted_projects %}
          {% include projects_horizontal.liquid %}
        {% endfor %}
      </div>
    </div>
  {% else %}
    <div class="row row-cols-1 row-cols-md-3">
      {% for project in sorted_projects %}
        {% include projects.liquid %}
      {% endfor %}
    </div>
  {% endif %}

{% endif %}
</div>
