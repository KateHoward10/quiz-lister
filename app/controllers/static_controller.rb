class StaticController < ApplicationController
  def show
    @quizzes = Quiz.all
    @locations = Quiz.select(:id, :venue, :latitude, :longitude, :slug)
    render params[:page]
  end
end
