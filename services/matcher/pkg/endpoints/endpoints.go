package endpoints

import (
	"context"

	"github.com/StevenRojas/donatePlasma/services/matcher/pkg/reqres"
	service "github.com/StevenRojas/donatePlasma/services/matcher/pkg/service"
	"github.com/go-kit/kit/endpoint"
)

// Endpoints list of endpoints
type Endpoints struct {
	GetPublicRecipients endpoint.Endpoint
}

// MakeEndpoints create endpoints
func MakeEndpoints(s service.Service) Endpoints {
	return Endpoints{
		GetPublicRecipients: makeGetPublicRecipientsEndpoint(s),
	}
}

func makeGetPublicRecipientsEndpoint(s service.Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req, _ := request.(reqres.GetRecipientsRequest)
		recipients, err := s.GetRecipientList(ctx, req.CityID, req.BloodTypeID)

		return reqres.GetRecipientsResponse{
			Recipients: recipients,
			Err:        err,
		}, err
	}
}
