#!/usr/bin/env python
import oyaml as yaml

# change these to the names of your HTML and YAML files
html_file = open("scene_typewriter.html", "w")
with open("scene_typewriter.yaml", "r") as ymlfile:
    yaml_file = yaml.safe_load(ymlfile)

# adds the beginning for HTML page and table
html_file.write('<head><link rel="stylesheet" href="../style.css"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"></head>\n')
html_file.write('<table>\n')
html_file.write('<tbody>\n')

for key, value in yaml_file.items():
  if not (isinstance(yaml_file[key], list)): # if the key does not point to a list, just output the entry
    html_file.write('<tr>\n<th>{}</th>\n<td>\n<span>{}</span>\n</td>\n</tr>'.format(key, yaml_file[key]))
  else: # otherwise iterate through every item in the list and output each of them
    if (key != "text"): # don't print the table header for text
      html_file.write('<tr>\n<th>{}</th>\n<td>\n'.format(key))
    else: 
      html_file.write('<tr>\n<th></th>\n<td>\n<br><hr>')
    for inner_key in yaml_file[key]: 
      html_file.write('<p>{}</p>\n'.format(inner_key))
    html_file.write('</td>\n</tr>\n')
html_file.write('</tbody>\n')
html_file.write('</table>')