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
    end
    
    def update
    end
    
    def create
      @project = Project.find(params[:id])
    end
    
    private
    def deliverable_params
    end
  end
end