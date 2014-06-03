json.(project, :id, :name, :open, :description, :client_id, :created_at, :updated_at)


json.deliverables(project.deliverables) do |deliverable|
  json.partial!("api/deliverables/deliverable",
    deliverable: deliverable)
end