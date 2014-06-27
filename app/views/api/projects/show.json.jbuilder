json.partial!("api/projects/project", project: @project, 
      deliverables: @project.deliverables, invoices: @project.invoices)