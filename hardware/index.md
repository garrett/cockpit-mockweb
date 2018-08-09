---
title: Example hardware
layout: minimal
---

{% capture md %}
# Example computers for the hardware list

* [Smaller server](casual)
* [Big server](big)
* [Big server, SR-IOV](sriov)
* [Laptop (Lenovo X230)](x230)
* [Laptop (Lenovo T460s)](t460s)
* [Arm (Banana Pro)](banana)
* [Arm (Odroid U3)](odroidu3)

## RAW data
- [JSON export](devices.json)

## Memory
- [Memory list mockup](memory)
{% endcapture %}

<div style="padding: 5vh 5vw 0; font-size: 140%">
  {{ md | markdownify }}
</div>
