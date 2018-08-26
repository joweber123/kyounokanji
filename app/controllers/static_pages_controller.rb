class StaticPagesController < ApplicationController
  def home
    @articles = Article.all
  end
  def show
    @article = Article.find(params[:id])
    @comment = @article.comments.create(comment_params)
  end

  def article
    @article = Article.find(params[:id])
  end
end
