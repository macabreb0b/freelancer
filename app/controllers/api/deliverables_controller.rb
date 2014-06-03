module Api
  class DeliverablesController < ApplicationController
    def index
      @project = Project.find(params[:project_id])
      @deliverables = @project.deliverables
      render 'index'
    end
    
    def show
      @deliverable = Deliverable.find(params[:id])
      render 'show'
    end
    
    def destroy
      @deliverable = Deliverable.find(params[:id])
      @deliverable.destroy
      render json: {}
    end
    
    def update
      @deliverable = Deliverable.find(params[:id])

      if @deliverable.update_attributes(deliverable_params)
        render json: @deliverable, status: 200
      else
        render json: @deliverable.errors.full_messages, status: 422
      end
    end
    
    def create
      @project = Project.find(params[:project_id])
      @deliverable = Deliverable.new(deliverable_params)
      @deliverable.project = @project
      
      if @deliverable.save
        render json: @deliverable, status: 200
      else
        render json: @deliverable.errors.full_messages, status: 422
      end
    end
    
    private
    def deliverable_params
      params.require(:deliverable)
            .permit(:name, :hourly, :completed, 
            :parent_deliverable_id, :project_id)
    end
  end
end