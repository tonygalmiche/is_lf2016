# -*- coding: utf-8 -*-
from openerp import models,fields,api
import hashlib


class Module(models.Model):
    _inherit = "ir.module.module"

    @api.multi
    def lf2016(self):
        rows = self.env['ir.module.module'].search([['state','=','installed']],limit=1000)
        r=[]
        for v in rows:
            x=v.name+'-'+v.installed_version
            r.append(x)

        r=','.join(r)
        print r

        m = hashlib.md5()
        m.update(r)
        md5=m.hexdigest()

        return md5


