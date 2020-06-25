package endpoints

import (
	"context"
	"errors"

	reqres "github.com/StevenRojas/donatePlasma/services/register/pkg/reqres"
	service "github.com/StevenRojas/donatePlasma/services/register/pkg/service"
	"github.com/go-kit/kit/endpoint"
)

// Endpoints list of endpoints
type Endpoints struct {
	CreateRecipient endpoint.Endpoint
}

// MakeEndpoints create endpoints
func MakeEndpoints(s service.Service) Endpoints {
	return Endpoints{
		CreateRecipient: makeCreateRecipientEndpoint(s),
	}
}

func makeCreateRecipientEndpoint(s service.Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req, ok := request.(reqres.CreateRecipientRequest)
		if !ok {
			return nil, errors.New("Wrong request message")
		}

		id, err := s.CreateRecipient(ctx, req.Recipient)

		return reqres.CreateRecipientResponse{
			ID:  id,
			Err: err,
		}, err
	}
}
