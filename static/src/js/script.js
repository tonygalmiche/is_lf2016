
//Doc : https://www.odoo.com/documentation/10.0/howtos/web.html
//Doc : https://www.odoo.com/documentation/10.0/reference/javascript.html#openerp.Model.query


//TODO : Pour que les modifications sur ce fichier soient prise en compte, il faut activer le mode dévellopeur avec les assets


//Cette page est appellée au démarrage d'Odoo
console.log("Test 1bis");


//Cette fonction qui porte le même nom que le module est appellée au démarrage d'Odoo
openerp.is_lf2016 = function(instance, local) {

    console.log("Test 2");

    local.HomePage = instance.Widget.extend({
        template: "HomePageTemplate", // Permet de préciser le template QWeb à utiliser

        init: function(parent) {
            this._super(parent);
            this.name = "Mordecai";
        },

        //Cette fonction est appellée en cliquant sur le menu
        start: function() {
            var model = new instance.web.Model("ir.module.module");
            html='<h3>Version actuelle du logiciel</h3>';
            model.query(['name','installed_version'])
                .filter([['name','=','is_lf2016']])
                .all().then(function (data) {
                    $.each(data, function(k, v){
                        html+='<p>Version : '+v.installed_version+'</p>';
                    });
                model.call('lf2016',[[]],{}).then(function (data) {
                    html+='<h3>Clé de contrôle des modules installés</h3>';

                    html+="<p>Clé de contrôle : "+data+"</p>";
                    html+="<p><strong>ATTENTION : </strong>Si un module est installé, modifié ou supprimé cette clé de contrôle sera modifiée automatiquement et l'attestation de conformité ne sera plus valide !</p>";
                    html+='<h3>Modules installés</h3>';
                    model.query(['name','installed_version'])
                        .order_by('name', 'id')
                        .filter([['state','=','installed']])
                        .limit(1000)
                        .all().then(function (data) {
                            $.each(data, function(k, v){
                                console.log(k,v.name)
                                html+='- '+v.name+' ('+v.installed_version+')<br /> ';
                            });

                        $("#lf2016").html(html);
                    });
                });
            });







        },



    });




    //Cette ligne permet de déclarer la fonction précédente  et de faire le lien avec l'action Odoo 
    instance.web.client_actions.add('is_lf2016.homepage', 'instance.is_lf2016.HomePage');


}


/*
//Cette fonction est appellée au démarrage d'Odoo car elle a le même nom que le moudule
odoo.is_lf2016 = function(instance, local) {
    console.log("Test 2");


    //Cette fonction est appellée en cliqant sur le menu
    local.LF2016 = instance.Widget.extend({
        template: "LF2016",     // Permet de préciser le template QWeb à utiliser

        events: {
            "click a"     : "click_a",
            "click button": "click_button",
        },

        init: function(parent) {
            console.log("Test 3");
            this._super(parent);
        },
        start: function() {
            d={};
            load_data(instance)
            console.log("Test 4");
        },

        
        click_a: function(e) {
            d.obj=e.currentTarget;
            console.log(e);
            docid=$(d.obj).attr("docid")/1;
            console.log(docid);


            this.do_action({
                type: 'ir.actions.act_window',
                res_model: 'mrp.prevision',
                res_id: docid,
                views: [[false, 'form']],
                flags: {
                    form: {
                        action_buttons: true, 
                        options: {
                            mode: 'edit'
                        }
                    }
                },
            });

        },


        click_button: function(e) {
            console.log(e);
            console.log($("#name").val());
            load_data(instance)
        },

        


    });
    //Cette ligne permet de déclarer la fonction précédente  et de faire le lien avec l'action Odoo 
    instance.web.client_actions.add('is_lf2016.is_lf2016_tag', 'instance.is_lf2016.LF2016');

}

*/

/*
function load_data(instance){
    date = new Date(); t1=date.getTime();
    var mrp_prevision_model   = new instance.web.Model("mrp.prevision");
    var product_model         = new instance.web.Model("product.product");
    var html;


    var id = document.getElementById("table_body");
    height=window.innerHeight-170; // Recupere l'espace disponilbe dans le navigateur
    width=window.innerWidth-250; // Recupere l'espace disponilbe dans le navigateur


    html='';
    html+='<div style="width:'+width+'px" id="table_head">';
    html+='<table style="width:100%">';
    html+='<thead>';
    html+='<tr>';
    html+='<th style="text-align:center;background-color:#EEEEEE">OD</th>';
    html+='<th style="text-align:left">Article</th>';
    html+='<th style="text-align:center">Catégorie</th>';
    html+='<th style="text-align:center">Gestionnaire</th>';
    html+='<th style="text-align:left">Fournisseur</th>';
    html+='<th style="text-align:right">Quantité</th>';
    html+='<th style="text-align:center">Date de début</th>';
    html+='<th style="text-align:center">Date début contrôle qualité</th>';
    html+='<th style="text-align:center">Date fin contrôle qualité</th>';
    html+='</thead>';
    html+='</table>';
    html+='</div>';

    html+='<div style="width:'+width+'px;height:'+height+'px" id="table_body">';
    html+='<table style="width:100%">';
    html+='<tboby class="tbody">';

    champs=['id','name','product_id','is_category_id','is_gestionnaire_id','partner_id','quantity','start_date','start_date_cq','end_date'];

    //type_od            = $("#type_od").val();
    name               = $("#name").val();
    product_id         = $("#product_id").val();
    is_category_id     = $("#is_category_id").val();
    is_gestionnaire_id = $("#is_gestionnaire_id").val();
    partner_id         = $("#partner_id").val();
    limit              = $("#limit").val()/1;

    if (limit==0) limit=3;


    filter=[];
    //if  (type_od!='')            filter.push(['type','like',type_od]);
    
    //if  (name!='')               filter.push(['name','like',name]);
    if  (product_id!='')         filter.push(['product_id.is_code','=like',product_id+'%']);
    if  (is_category_id!='')     filter.push(['is_category_id','=',is_category_id]);
    if  (is_gestionnaire_id!='') filter.push(['is_gestionnaire_id','=',is_gestionnaire_id]);
    //if  (partner_id!='')         filter.push(['partner_id','like',partner_id]);
    

    //console.log(filter);

    var Products = new openerp.Model('product.product');

    Products.call('test',[filter],{}).then(function (data) {
        tr=data['tr'];

        $.each(tr, function(k, v){
            console.log(k,v)
            html+=v;
        });
        html+='</tboby>';
        html+='</table>';
        html+='</div>';
        $("#analysecbn").html(html);

    });


function clicktr(i,c,z)
{
    console.log(i,c,z);
    var a = document.getElementById(''+i+'');
    if (z == '2')
    {
        if (a.style.backgroundColor == "rgb(204, 255, 204)") 
        { 
            a.style.backgroundColor = "#FFFF00";
        }
        else 
        {
            a.style.backgroundColor = "#CCFFCC";
        }
    }
    else if (z == '1')
    {
        if (a.style.backgroundColor != "rgb(204, 255, 204)") {
            if (a.style.backgroundColor == "rgb(255, 255, 0)") { a.style.backgroundColor = '#'+c; }
            else { a.style.backgroundColor = "#FFFF00"; }
        }
    }
}


*/




