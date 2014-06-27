json.(project, :id, :name, :open, :description, :total_hours, :uninvoiced_hours_count, :client_id, :created_at, :updated_at, :hourly)

deliverables ||= nil
unless deliverables.nil?
  json.deliverables(deliverables) do |deliverable|
    json.partial!("api/deliverables/deliverable",
      deliverable: deliverable)
  end
end

invoices ||= nil
unless invoices.nil?
  json.invoices(invoices) do |invoice|
    json.partial!("api/invoices/invoice",
      invoice: invoice)
  end
end