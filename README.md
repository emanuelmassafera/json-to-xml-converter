<h1 align="center">JSON to XML Converter</h1>

<p align="center">📦 Package that converts Magento 2 orders from JSON  to XML 📦</p>

---

Table of contents
=================
<!--ts-->
   * [About](#-about-the-project)
   * [How to run](#-how-to-run)
   * [Author](#-author)
   * [License](#-license)
<!--te-->

---

## About <a name="-about-the-project" style="text-decoration:none"></a>

This package aims to convert Magento 2 orders to be pushed to a different application, but unlike Magento, it uses an XML file instead of a JSON, and that XML file has a completely different format.

Basically, this NodeJS package performs the conversion based on a data mapping JSON file. This mapping file must contain the origin field and target field, and can contain a field to define if a value is static and what's the value and a convert function where you can write a basic js function to convert the value.
 
Below you can see an example of a **mapping.json** file:

```json
[
  {
    "origin": "",
    "target": "OrderHeader.OrderActionType",
    "static_value": "A"
  },
  {
    "origin": "extension_attributes.syspro_id",
    "target": "OrderHeader.Customer"
  },
  {
    "origin": "created_at",
    "target": "OrderHeader.OrderDate",
    "convert_function": "return function convert(property) { return new Date(property).toISOString().slice(0,10); };"
  }
]
```

The result is an XML file that follows the rules entered in the mapping file.

---

## How to run <a name="-how-to-run" style="text-decoration:none"></a>

---

## Author <a name="-author" style="text-decoration:none"></a>

<img style="border-radius: 50%;" src="https://avatars1.githubusercontent.com/u/65625500?s=460&u=eb9e300de61698fc8531949a451ce2f0e9da46f9&v=4" width="100px;" alt=""/>
<sub>Emanuel Massafera</sub>

<b></b>

[![Badge](https://img.shields.io/static/v1?label=&message=Emanuel&color=blue&style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/emanuelmassafera/)](https://www.linkedin.com/in/emanuelmassafera/) [![Badge](https://img.shields.io/static/v1?label=&message=emanuel301@live.com&color=0078D4&style=flat-square&logo=Microsoft-Outlook&logoColor=white&link=mailto:emanuel301@live.com)](mailto:emanuel301@live.com)

---

## License <a name="-license" style="text-decoration:none"></a>

This repository is licensed by **MIT LICENSE**. For detailed information, read the file [LICENSE](https://github.com/emanuelmassafera/retrieve-test/blob/main/LICENSE). 

Made with ♥ by Emanuel Massafera :wave: [Get in touch!](https://www.linkedin.com/in/emanuelmassafera/)
