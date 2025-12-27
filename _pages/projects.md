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

<!-- pages/projects.md -->
<div class="projects">

{% assign projects_with_rank = "" | split: "" %}

{% for project in site.projects %}
  {% assign rank = site.data.project_order[project.project_id] | default: 999 %}
  {% assign project = project | merge: { "rank": rank } %}
  {% assign projects_with_rank = projects_with_rank | push: project %}
{% endfor %}

{% if site.enable_project_categories and page.display_categories %}

  <!-- Display categorized projects -->
  {% for category in page.display_categories %}
    <a id="{{ category }}" href=".#{{ category }}">
      <h2 class="category">{{ category }}</h2>
    </a>

    {% assign categorized_projects = projects_with_rank | where: "category", category | sort: "rank" %}

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

  <!-- Display projects without categories -->
  {% assign sorted_projects = projects_with_rank | sort: "rank" %}

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
