import JsBarcode from 'jsbarcode';

if (window.jQuery) {
	$(window).on('hashchange', page_changed);
	$(window).on('load', page_changed);
}

function page_changed(event) {
	// waiting for page to load completely
	frappe.after_ajax(function () {
		var route = frappe.get_route();
		if (route[0] == "Form") {
			frappe.ui.form.on(route[1], {
				refresh: function (frm) {
					let default_svg = '<svg height=60></svg>';
					let barcode_area = $(
							`<div class="barcode-wrapper">${default_svg}</div>`
					);
					let sibling = $(frm.parent).find('.row.flex>.text-right');
					sibling.parent().find('.barcode-wrapper').remove();
					$(barcode_area).insertBefore(sibling);
					const svg = barcode_area.find('svg')[0]
					let options = JSON.parse('{ "height" : 60, "margin": 0, "displayValue" : false }');
					JsBarcode(svg, frm.docname, options);
				}
			})
		}
	})
}
