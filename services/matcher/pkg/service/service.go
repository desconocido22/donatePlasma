package service

import (
	"context"

	"github.com/go-kit/kit/log"
)

// Service definition
type Service interface {
	GetRecipientList(ctx context.Context, cityID *int64, bloodTypeID *int64) ([]Recipient, error)
	CanReceiveFrom(ctx context.Context, bloodTypeID int64) ([]CompatibleBloodCount, error)
	CanDonateTo(ctx context.Context, bloodTypeID int64) ([]CompatibleBloodCount, error)
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

func (s service) CanReceiveFrom(ctx context.Context, bloodTypeID int64) ([]CompatibleBloodCount, error) {
	logger := log.With(s.logger, "msg", "CanReceiveFrom")

	logger.Log("msg", "Can Receive From")
	response, err := s.repository.CanReceiveFrom(ctx, bloodTypeID)
	return response, err
}

func (s service) CanDonateTo(ctx context.Context, bloodTypeID int64) ([]CompatibleBloodCount, error) {
	logger := log.With(s.logger, "msg", "CanDonateTo")

	logger.Log("msg", "Can Donate To")
	response, err := s.repository.CanDonateTo(ctx, bloodTypeID)
	return response, err
}
