json.array!(@invoices) do |invoice|
  json.partial!('invoice', invoice: invoice, hours: invoice.hours)
end