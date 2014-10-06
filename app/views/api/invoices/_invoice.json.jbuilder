json.(invoice, :date, :paid, :id, :project_id, :updated_at, :created_at,
      :client_id, :client_name, :client_phone, :client_email, :number)

json.user_address invoice.user_address
json.client_address invoice.client_address

deliverables ||= nil
unless deliverables.nil?
  json.deliverables(deliverables) do |deliverable|
    json.partial!("api/deliverables/deliverable_invoice",
      deliverable: deliverable, invoice: invoice)
  end
end