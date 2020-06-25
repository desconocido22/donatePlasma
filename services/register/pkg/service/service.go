package service

import (
	"context"

	"github.com/go-kit/kit/log"
)

// Service definition
type Service interface {
	CreateRecipient(ctx context.Context, recipient Recipient) (int64, error)
}

type service struct {
	repository Repository
	logger     log.Logger
}

// NewService create new service instance
func NewService(rep Repository, logger log.Logger) Service {
	return &service{
		repository: rep,
		logger:     logger,
	}
}

func (s service) CreateRecipient(ctx context.Context, recipient Recipient) (int64, error) {
	logger := log.With(s.logger, "msg", "CreateRecipient")

	logger.Log("msg", "Creating Recipient")
	response, err := s.repository.CreateRecipient(ctx, recipient)
	logger.Log("msg", "Recipient created")
	return response, err
}
