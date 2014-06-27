module Api
  class ClientsController < ApplicationController
  
    def create
      @client = Client.new(client_params)
      @client.user = current_user

      if @client.save
        render json: @client, status: 200
      else
        render json: @client.errors.full_messages, status: 422
      end
    end
    
    def update
      @client = Client.find(params[:id])
      
      if @client.update_attributes(client_params)
        render json: @client, status: 200
      else
        render json: @client.errors.full_messages, status: 422
      end
    end
  
    def index
      @clients = current_user.clients
      
      unless @clients.empty?
        render 'index.json.jbuilder'
      end
    end
    
    def show
      @client = Client.includes(:projects).find(params[:id])
      render 'show.json.jbuilder'
    end
    
    def destroy
      @client = Client.find(params[:id])
      @client.destroy
      render json: {}
    end
    
    private
      def client_params
        params.require(:client).permit(:name, :phone, :email, :company)
      end
  end
end