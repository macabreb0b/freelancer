json.(invoice, :date, :paid, :id, :project_id, :updated_at, :created_at, :client_name, :client_phone, :client_email, :number)

deliverables ||= nil
unless deliverables.nil?
  json.deliverables(deliverables) do |deliverable|
    json.partial!("api/deliverables/deliverable_invoice",
      deliverable: deliverable, id: invoice.id)
  end
end