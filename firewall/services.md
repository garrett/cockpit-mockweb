---
title: Firewall
layout: document
---

# Firewalld services

Information from `firewalld` service files
(located at `/usr/lib/firewalld/services/`), with port information
cross-referenced with `/etc/services`

{% assign firewalld = site.data.firewalld %}
{% assign names = site.data.firewalld | group_by_exp: 'item', 'item[0]' | map: 'name' | join: '###' | downcase | split: '###' | sort %}

{% for name in names %}

{% comment %}
  RH-Satellite-6 is some weird case exception — the rest are lowercase
{% endcomment %}{%
  if name == 'rh-satellite-6'
    %}{%
    assign name_fix = 'RH-Satellite-6'
    %}{%
  else
    %}{%
    assign name_fix = name
  %}{%
  endif
%}

{% assign item = firewalld[name_fix] %}

{% assign service = item.service %}

---

### {{ service.short }}
{{ service.description }}

{% if service.module.name %}
_Required module: `{{ service.module.name }}`_
{% endif %}

{% if service.destination %}
_Destination:_
{% if service.destination.ipv4 %}- _ipv4: `{{ service.destination.ipv4 }}`_{% endif %}
{% if service.destination.ipv6 %}- _ipv6: `{{ service.destination.ipv6 }}`_{% endif %}
{% endif %}

{:.table}
{%
  include firewalld-service-port.html display='header'
%}{%
  if service.port[0]
    %}{%
      for port in service.port
      %}{%
        include firewalld-service-port.html port=port
      %}{%
      endfor
    %}{%
  else
    %}{%
      include firewalld-service-port.html port=service.port
    %}{%
  endif
%}

{% endfor %}
