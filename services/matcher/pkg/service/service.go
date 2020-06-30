package service

import (
	"context"

	"github.com/go-kit/kit/log"
)

// Service definition
type Service interface {
	GetRecipientList(ctx context.Context, cityID *int64, bloodTypeID *int64) ([]Recipient, error)
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

func (s service) GetRecipientList(ctx context.Context, cityID *int64, bloodTypeID *int64) ([]Recipient, error) {
	logger := log.With(s.logger, "msg", "GetRecipientList")

	logger.Log("msg", "Getting Recipient list")
	response, err := s.repository.GetRecipientList(ctx, cityID, bloodTypeID)
	return response, err
}
