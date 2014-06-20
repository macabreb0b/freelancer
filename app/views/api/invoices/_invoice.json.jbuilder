json.(invoice, :date, :paid, :id, :project_id, :updated_at, :created_at, :client_name, :client_phone, :client_email)

json.deliverables(invoice.deliverables) do |deliverable|
  json.partial!("api/deliverables/deliverable_invoice",
    deliverable: deliverable, id: invoice.id)
end