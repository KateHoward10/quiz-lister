class EventsController < ApplicationController
  before_action :set_quiz
  before_action :require_quiz_owner!

  def index
  end

  def create
    @event = @quiz.events.create(event_params)
    if @event.valid?
      @event.save
      render :index, status: :created
    else
      flash.now[:error] = @event.errors.full_messages.join(" ")
      render :index, status: :unprocessable_entity
    end
  end

  def destroy
    Event.find_by!(id: params[:id], quiz_id: params[:quiz_id]).destroy
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
