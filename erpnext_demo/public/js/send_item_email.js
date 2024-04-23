frappe.ui.form.on('Item', {
    refresh: function(frm) {
        // Add custom button to the Item details page
        frm.add_custom_button(__('Send Email'), function() {
            // Handle button click event
            // Fetch latest 5 sales invoices of the current item
            frappe.call({
                method: 'your_custom_app_name.api.get_latest_invoices',
                args: {
                    item_code: frm.doc.item_code
                },
                callback: function(response) {
                    if (response.message) {
                        // Construct email with the latest 5 sales invoices
                        var invoices = response.message;
                        var emailContent = 'Latest 5 sales invoices:\n';
                        for (var i = 0; i < invoices.length; i++) {
                            emailContent += invoices[i].name + ' - ' + invoices[i].posting_date + '\n';
                        }
                        
                        // Open email composer with pre-filled content
                        frappe.call({
                            method: 'frappe.email.compose',
                            args: {
                                subject: 'Latest 5 Sales Invoices for ' + frm.doc.item_name,
                                content: emailContent,
                                recipients: 'your@email.com' // Replace with your email address
                            },
                            callback: function(response) {
                                // Email composer opened
                            }
                        });
                    }
                }
            });
        });
    }
});
