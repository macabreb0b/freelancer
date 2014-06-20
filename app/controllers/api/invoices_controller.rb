class Api::InvoicesController < ApplicationController
  
  def destroy
    @invoice = Invoice.find(params[:id])
    ActiveRecord::Base.transaction do
      begin
        @invoice.hours.each do |hour|
          hour.invoice_id = nil
          hour.save
        end
        @invoice.destroy
      rescue => e
        render json: e.to_json, status: 400
      else
        render json: {}, status: 200
      end
    end
  end
  
  def index
    @invoices = current_user.invoices
    render 'index'
  end
  
  def show
    @invoice = Invoice.find(params[:id])
    render 'show'
  end
  
  def update
  end
  
  private
  
    def invoice_params
    end
end
  