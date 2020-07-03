class EventsController < ApplicationController
  def create
    @quiz = Quiz.find(params[:quiz_id])
    @event = @quiz.events.create(event_params)
    redirect_to @quiz
  end

  def destroy
    Event.find(params[:id]).destroy
  end

  private
    def event_params
      params[:event].permit(:date)
    end
end