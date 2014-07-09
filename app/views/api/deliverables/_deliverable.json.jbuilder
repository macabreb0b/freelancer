json.(deliverable, :name, :completed, :id, :parent_deliverable_id, :project_id, :updated_at, :created_at, :rank, :collapsed, :hourly, :description)

json.hours(deliverable.hours) do |hour|
  json.partial!("api/hours/hour",
    hour: hour)
end