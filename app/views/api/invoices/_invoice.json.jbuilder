json.(invoice, :date, :paid, :id, :project_id, :updated_at, :created_at, :client_name, :client_phone, :client_email)

json.hours(hours) do |hour|
  json.partial!("api/hours/hour",
    hour: hour)
end