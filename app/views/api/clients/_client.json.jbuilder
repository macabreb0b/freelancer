json.(client, :id, :name, :company, :user_id, :phone, :email, :created_at, :updated_at)

client.projects ||= nil
unless client.projects.nil?
  json.projects(client.projects) do |project|
    json.partial!("api/projects/project", project: project)
  end
end