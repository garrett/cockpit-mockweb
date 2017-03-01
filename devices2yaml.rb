#!/usr/bin/env ruby

require 'rubygems'
require 'yaml'
require 'oga'

htmldoc = ARGF.read

doc = Oga.parse_html(htmldoc)

system_info = []

doc.css('.node').each do |item|
  device_info = {}

  item.css('tr').each do |info|
    key = info.css('.first').text.strip.sub(/:$/, '')
    val = info.css('.second').text.strip

    case key
    when 'capabilities'
      val = val.split(' ')
    when 'configuration'
      val_obj = {}
      val.split(' ').each do |config|
        config_key, config_val = config.split('=')

        # Convert to a number if appropriate
        config_val = config_val.to_i if config_val.to_i.to_s == config_val

        val_obj[config_key] = config_val
      end
      val = val_obj
    when 'id'
      dev_regex = /usb|cpu|scsi|pci|sata|^isa$|^cd/i
      device_info['class'] = val.split(':').first.capitalize
                                .sub(dev_regex, &:upcase)
    else
      # Convert to a number if appropriate
      val = val.to_i if val.to_i.to_s == val
    end

    device_info[key] = val unless key.empty?
  end

  system_info.push device_info
end

puts system_info.to_yaml
