# -*- coding: utf-8 -*-
{
    "name" : "InfoSaone - Attestation Loi de finances 2016",
    "version" : "0.4",
    "author" : "Tony Galmiche / InfoSaone",
    'category' : 'InfoSaône',
    "description": "InfoSaone - Attestation Loi de finances 2016",
    "maintainer": 'InfoSaone',
    "website": 'http://www.infosaone.com',
    "depends" : ["point_of_sale"],
    "init_xml" : [],
    "demo_xml" : [],
    "data" : [
        "security/ir.model.access.csv",
        "assets.xml",
        "report/is_pos_session_report.xml",
        "report/report_paperformat.xml",
        "report/report.xml",
    ],
    "qweb": [
        "static/src/xml/*.xml"
    ],
    "installable": True,
    'application': True,
}




