class StaticController < ApplicationController
  def show
    @quizzes = Quiz.all
    @locations = Quiz.select(:id, :venue, :latitude, :longitude)
    render params[:page]
  end
end
