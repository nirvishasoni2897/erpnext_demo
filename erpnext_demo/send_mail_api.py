import frappe

@frappe.whitelist()
def get_latest_invoices(item_code):
    # Fetch the latest 5 sales invoices for the given item code
    invoices = frappe.get_list('Sales Invoice', 
                               filters={'item_code': item_code},
                               fields=['name', 'posting_date'],
                               order_by='posting_date desc',
                               limit_page_length=5)

    return invoices

def send_mail_api(item_code):
    pass