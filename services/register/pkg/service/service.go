package service

import (
	"context"

	"github.com/go-kit/kit/log"
)

// Service definition
type Service interface {
	CreateRecipient(ctx context.Context, recipient Recipient) (int64, error)
	GetRecipientList(ctx context.Context, publicOnly bool) ([]Recipient, error)
	UpdateRecipient(ctx context.Context, recipient Recipient) (Recipient, error)
	VerifyRecipient(ctx context.Context, recipientID int64, verified bool) error
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
	return response, err
}

func (s service) GetRecipientList(ctx context.Context, publicOnly bool) ([]Recipient, error) {
	logger := log.With(s.logger, "msg", "GetRecipientList")

	logger.Log("msg", "Getting Recipient list")
	response, err := s.repository.GetRecipientList(ctx, publicOnly)
	return response, err
}

func (s service) UpdateRecipient(ctx context.Context, recipient Recipient) (Recipient, error) {
	logger := log.With(s.logger, "msg", "UpdateRecipient")

	logger.Log("msg", "Updating Recipient")
	response, err := s.repository.UpdateRecipient(ctx, recipient)
	return response, err
}

func (s service) VerifyRecipient(ctx context.Context, recipientID int64, verified bool) error {
	logger := log.With(s.logger, "msg", "VerifyRecipient")

	logger.Log("msg", "Verifiying Recipient")
	err := s.repository.VerifyRecipient(ctx, recipientID, verified)
	return err
}
