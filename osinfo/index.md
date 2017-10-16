---
title: osinfo
layout: document
---
{% capture empty %}
{% assign content = '' %}

## Group osinfo into families
{% assign family = site.data.osinfo | group_by: "Family" %}

## Set a value to one year ago (see the minus)
{% assign year_now = 'now' | date: '%Y' %}
{% assign year_ago = year_now | minus: 1 %}
{% assign time_ago = 'now' | date: "%Y-%m-%d" | replace: year_now, year_ago | date: "%Y%m%d" | plus: 0 %}

## Newline varible (fun, eh?)
{% assign nl = "
" %}

{% for os in family %}
  ## Group by OS name (more or less)
  {% assign content = content | append: "## " | append: os['name'] | append: nl %}

    {% assign vendors = os['items'] | group_by: "Vendor" %}

    {% for vendor in vendors %}
      ## We're handling Linux special here due to rolling releases
      ## so empty release dates float to the top
      ## (this generally works in this demo)
      ##
      ## Sorting REALLY should be:
      ## 1. Release date
      ## 2. Version (numerically sorted)
      ##
      ## And in the ase of Windows, as not all release dates are known:
      ## 1. numerically sorted version
      ##
      ## ...and we should add at least release dates in the data where it is blank
      ##
      {% if os['name'] == 'linux' %}
        {% assign sorted = vendor['items'] | sort: 'Release date', 'last' | reverse %}
      {% else %}
        {% assign sorted = vendor['items'] | sort: 'Release date', 'first' | reverse %}
      {% endif %}

      ## Get the very last release and support dates from all releases
      {% assign last_release = vendor['items'] | group_by: 'Release date' | sort: 'name' | map: 'name' | last | remove: '-' | plus: 0 %} 
      {% assign last_support = vendor['items'] | group_by: 'End of life' | sort: 'name' | map: 'name' | last | remove: '-' | plus: 0 %} 

      ## Only show Linux distros if there is a release that happened or is supported
      ## within in the past timeframe (set to 1 year above)
      {% if last_support > time_ago or last_release > time_ago or os['name'] != 'linux' %}
        {% assign content = content | append: "### " | append: vendor['name'] | append: nl %}

        {% for item in sorted %}
          {% assign this_release = item['Release date'] | remove: '-' | plus: 0 %}
          {% assign this_support = item['End of life'] | remove: '-' | plus: 0 %}

          ## Assume releases with no start and no end are rolling
          ## (bad assumption, due to incomplete data, but it's to at least to show rolling releases)
          {% if this_release == 0 and this_support == 0 %}
            {% assign rolling = true %}
          {% else %}
            {% assign rolling = false %}
          {% endif %}

          ## Only show Linux versions that are within our time window of 1 year (set above)
          ## (other OSes will be shown no matter what, as they usually don't release as much as Linux)
          {% if this_release > time_ago or this_support > time_ago or rolling or os['name'] != 'linux' %}

            ## Show the OS code name in parentheis if it exists
            {% if item['Code name'] %}
              {% assign codename = item['Code name'] | prepend: "(" | append: ")" %}
            {% else %}
              {% assign codename = "" %}
            {% endif %}

            ## (liquid doesn't have matching capabilities; for lowercase, in this instance)
            {% assign lower_name = item['Name'] | downcase %}
            {% assign lower_version = item['Version'] | downcase %}

            ## Show the version if the name doesn't contain the version
            {% unless lower_name contains lower_version %}
              {% assign version = item['Version'] %}
            {% else %}
              {% assign version = '' %}
            {% endunless %}

            ## Values displayed are the name, version (if applicable), and codename (if applicable, in parentheis)
            {% capture bullet %}
              - {{ item['Name'] }} {{ version }} {{ codename }}
            {% endcapture %}
            
            {% assign bullet = bullet | strip_newlines | strip %}
            
            {% assign content = content | append: bullet | append: nl %}
          {% endif %}

        {% endfor %}
        {% assign content = content | append: nl %}
      {% else %}
        {% assign outdated = outdated | append: "- " | append: vendor['name'] | append: nl %}
      {% endif %}
    {% endfor %}
  {% endfor %}
{% endcapture %}

# DEBUGGING

[osinfo, as JSON]({{ site.baseurl }}/osinfo/osinfo.json)

# OUTDATED
(to be removed; here for debugging purposes only... these are automatically removed for having no releases and also no supported releases within the past year)

{{ outdated | markdownify }}

# CURRENT

Please ignore:
- labels having improperly formatted names
- Windows, BSD groups are not merged (that is: DOS and all the Windows should be merged together into one group. All BSDs should also be grouped together too)
- OS X / macOS called "darwin" (it should be "macOS" now)
- Sorting is a little off for numbers when versions are taken into account, as liquid has cruddy sorting

Thanks!

---
---

{{ content | markdownify }}
