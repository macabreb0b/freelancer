json.array!(@clients) do |client|
  json.partial!('client', client: client, projects: client.projects)
end