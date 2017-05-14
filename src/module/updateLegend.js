import computed_breaks from './../json/computed_breaks.js';
import colortree from './../json/colortree.js';
import datatree from './../json/datatree.js';
import geo from './../json/geoscheme.js';

import {
    Store
}
from './reduxSetup.js';

export default function updateLegend(theme, geography_name) {
    console.log('updateLegend');

    var current_store_values = Store.getState();
    var dataset = current_store_values.dataset;
    console.log('dataset: ' + dataset);
    console.log('theme: ' + theme);

    let breaks_style = datatree[dataset][theme].favstyle[0] + datatree[dataset][theme].favstyle[1];
    console.log('breaks style: ' + breaks_style);

    let legend_breaks = computed_breaks[dataset][theme][geography_name][breaks_style];
    console.log('legend breaks: ' + legend_breaks);

    let color_style = datatree[dataset][theme].favstyle[2] + '_' + datatree[dataset][theme].favstyle[1];
    console.log('color_style: ' + color_style);

    let colorscheme = colortree[color_style];
    console.log('colorscheme: ' + colorscheme);

    let type = datatree[dataset][theme].type;
    console.log('type: ' + type);

    let default_color = '#fff';
    let title = datatree[dataset][theme].title;
    console.log('title: ' + title);

    let html_string = "<div class='legend-title-text'>" + title + "</div><table>"; // inner HTML to be inserted into legend

    for (let i = legend_breaks.length - 1; i > -1; i--) {
        html_string += '<tr><td class="t-pad-sides"><div class="legend-box" style="background-color:' + colorscheme[i] +
            ';"></div></td><td class="t-pad-sides"></td><td class="t-align-right">' + formatValue(legend_breaks[i], type) + '</td><td class="t-pad-sides">' + ((i === legend_breaks.length - 1) ? '+' : '') + '</td></tr>';
    }

    // default color
    html_string += '<tr><td class="t-pad-sides"><div class="legend-box" style="background-color:' + default_color +
        ';"></div></td><td class="t-pad-sides">&lt;</td><td class="t-align-right">' + formatValue(legend_breaks[0], type) + '</td><td class="t-pad-sides"></td></tr></table>';

    document.getElementById('legend-ctrl').innerHTML = html_string;
    console.log('legend modified');

}


function formatValue(val, type) {

    if (type === 'currency') {
        return ' $' + val.toLocaleString(); // add currency and thousands comma
    }
    if (type === 'number') {
        return val.toLocaleString(); // add thousands comma
    }
    if (type === 'regular') {
        return val; // no formatting
    }
}
