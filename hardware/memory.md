---
title: 'System: <strong>Memory</strong>'
layout: frame
---

{% capture rows_raw %}
A1, Synchronous Registered (Buffered), 00CE063200CE, M393A2K43BB1-CTD, 16384 MB, 2666 MT/s, 368BCF29
A2, Synchronous Registered (Buffered), 00CE063200CE, M393A2K43BB1-CTD, 16384 MB, 2666 MT/s, 368BCF29
A3, Synchronous Registered (Buffered), 00CE063200CE, M393A2K43BB1-CTD, 16384 MB, 2666 MT/s, 368BCF29
A4, Synchronous Registered (Buffered), 00CE063200CE, M393A2K43BB1-CTD, 16384 MB, 2666 MT/s, 368BCF29
A5, None, Not Specified, Not Specified, No Module Installed, Unknown, Not Specified
A6, None, Not Specified, Not Specified, No Module Installed, Unknown, Not Specified
A7, None, Not Specified, Not Specified, No Module Installed, Unknown, Not Specified
A8, None, Not Specified, Not Specified, No Module Installed, Unknown, Not Specified
A9, None, Not Specified, Not Specified, No Module Installed, Unknown, Not Specified
A10, None, Not Specified, Not Specified, No Module Installed, Unknown, Not Specified
A11, None, Not Specified, Not Specified, No Module Installed, Unknown, Not Specified
A12, None, Not Specified, Not Specified, No Module Installed, Unknown, Not Specified
B1, Synchronous Registered (Buffered), 00CE063200CE, M393A2K43BB1-CTD, 16384 MB, 2666 MT/s, 368BCF29
B2, Synchronous Registered (Buffered), 00CE063200CE, M393A2K43BB1-CTD, 16384 MB, 2666 MT/s, 368BCF29
B3, Synchronous Registered (Buffered), 00CE063200CE, M393A2K43BB1-CTD, 16384 MB, 2666 MT/s, 368BCF29
B4, Synchronous Registered (Buffered), 00CE063200CE, M393A2K43BB1-CTD, 16384 MB, 2666 MT/s, 368BCF29
B5, None, Not Specified, Not Specified, No Module Installed, Unknown, Not Specified
B6, None, Not Specified, Not Specified, No Module Installed, Unknown, Not Specified
B7, None, Not Specified, Not Specified, No Module Installed, Unknown, Not Specified
B8, None, Not Specified, Not Specified, No Module Installed, Unknown, Not Specified
B9, None, Not Specified, Not Specified, No Module Installed, Unknown, Not Specified
B10, None, Not Specified, Not Specified, No Module Installed, Unknown, Not Specified
B11, None, Not Specified, Not Specified, No Module Installed, Unknown, Not Specified
B12, None, Not Specified, Not Specified, No Module Installed, Unknown, Not Specified
{% endcapture %}

{% capture newline %}
{% endcapture %}

{% assign rows = rows_raw | split: newline %}

{% assign empty_rows = "" %}
{% assign empty_rows_placeholder = "" %}

{% capture memory_rows %}
  {% for row in rows %}
    {% if row == "" %}{% continue %}{% endif %}

    {% assign r = row | split: "," %}

    {% if r[1] == " None" %}
      {% assign empty_rows = empty_rows | append: r[0] | append: " " %}
      <tr class="listing-ct-item listing-ct-nonavigate listing-ct-noexpand ct-empty-slot">
        <td class="ct-hardware-memory-id">{{ r[0] }}</td>
        <td class="ct-hardware-memory-description" colspan="5">Empty Slot</td>
        <td></td>
      </tr>
    {% else %}
      <tr class="listing-ct-item listing-ct-nonavigate listing-ct-noexpand">
        <td class="ct-hardware-memory-id">{{ r[0] }}</td>
        <td class="ct-hardware-memory-description">{{ r[1] }}</td>
        <td class="ct-hardware-memory-vendor">{{ r[2] }}</td>
        <td class="ct-hardware-memory-model">{{ r[3] }}</td>
        <td class="ct-hardware-memory-size">{{ r[4] }}</td>
        <td class="ct-hardware-memory-speed">{{ r[5] }}</td>
        <td class="ct-hardware-memory-serial">{{ r[6] }}</td>
      </tr>
    {% endif %}
  {% endfor %}
{% endcapture %}


{% assign empty_slots = empty_rows | strip | split: " " %}

{% assign empty_count = empty_slots | size %}

{% if empty_count > 0 %}
  {% assign empty_string = empty_slots
   | size
   | prepend: '<span class="ct-hardware-memory-empty-count">'
   | append: ' empty slots '
   | append: '<a href="#" id="view-all-slots">view all</a></span>'
  %}
{% else %}
  {% assign empty_string = "" %}
{% endif %}

{% capture mem_table %}
<table class="listing listing-ct listing-ct-wide" id="hardware-memory-list">
  <caption class="cockpit-caption">Memory {{ empty_string }}</caption>
  <thead><tr>
    <th>ID</th>
    <th>Description</th>
    <th>Vendor</th>
    <th>Model</th>
    <th>Size</th>
    <th>Clock Speed</th>
    <th>Serial</th>
  </tr></thead>
  <tbody>
  {{ memory_rows }}
  </tbody>
</table>
{% endcapture %}

{% capture content %}
{:.breadcrumb}
1. [System](link){:role=link tabindex=0}
2. {:.active}Hardware Information

## System Information

<table class="info-table-ct wide-split-table-ct">
  <tbody>
      <tr><th>Type</th><td>Notebook</td></tr>
      <tr><th>Name</th><td>40FJ43ABM0</td></tr>
      <tr><th>Version</th><td>ThinkPad T460s</td></tr>
  </tbody>
  <tbody>
      <tr><th>BIOS</th><td>LENOVO</td></tr>
      <tr><th>BIOS version</th><td>N1CET69W (1.37 )</td></tr>
      <tr><th>BIOS date</th><td>07/09/2018</td></tr>
      <tr><th>CPU</th><td>4x Intel(R) Core(TM) i7-6600U CPU @ 2.60GHz</td></tr>
  </tbody>
</table>

{{ mem_table }}
{% endcapture %}

<div class="page-ct container-fluid">
{{ content | markdownify }}
</div>

<style>
.ct-empty-slot > td:not(:first-child) {
  color: #999;
  text-align: left;
}

.ct-empty-slot {
  display: none;
}

.show-all-slots .ct-empty-slot {
  display: table-row;
}

.ct-hardware-memory-empty-count {
  font-size: 17px;
  margin-left: 2em;
  vertical-align: baseline;
}
.ct-hardware-memory-empty-count > a {
  font-size: inherit;
  margin-left: 0.5em;
}

/* show tbodys side by side on wide screens */
@media screen and (min-width: 70rem) {
  table.wide-split-table-ct {
    width: 100%;
  }
  table.wide-split-table-ct tbody {
    float: left;
    width: 50%;
  }
}
</style>

<script>
  $memList = $('#hardware-memory-list');

  $('#view-all-slots').click(function(ev){
    $memList.addClass('show-all-slots');
    $(this).hide();
  });
</script>