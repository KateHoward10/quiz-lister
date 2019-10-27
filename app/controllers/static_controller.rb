class StaticController < ApplicationController
  def show
    @locations = Quiz.select(:id, :venue, :latitude, :longitude)
    render params[:page]
  end
end
