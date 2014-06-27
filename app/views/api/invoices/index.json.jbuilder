json.array!(@invoices) do |invoice|
  json.partial!('invoice', invoice: invoice, 
        deliverables: invoice.deliverables)
end