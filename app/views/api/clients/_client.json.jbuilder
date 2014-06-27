json.(client, :id, :name, :company, :user_id, :phone, :email, :created_at, :updated_at)

projects ||= nil
unless projects.nil?
  json.projects(projects) do |project|
    json.partial!("api/projects/project", project: project, deliverables: nil)
  end
end