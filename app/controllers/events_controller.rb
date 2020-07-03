class EventsController < ApplicationController
  before_action :set_quiz
  before_action :require_quiz_owner!

  def create
    @event = @quiz.events.create(event_params)
    if @event.save
      redirect_to @quiz
    else
      flash.now[:alert] = @event.errors.full_messages.join(" ")
    end
  end

  def destroy
    Event.find(params[:id]).destroy
  end

  private
    def set_quiz
      @quiz = Quiz.find(params[:quiz_id])
    end

    def require_quiz_owner!
      if !current_user.try(:admin?) && current_user != @quiz.user
        flash.now[:alert] = "You can only update events for your own quizzes."
      end
    end

    def event_params
      params.require(:event).permit(:date)
    end
end
