package reqres

import (
	"context"
	"net/http"
	"net/url"
	"strconv"

	entities "github.com/StevenRojas/donatePlasma/services/matcher/pkg/service"
)

// GetRecipientsRequest vefiry recipient request
type GetRecipientsRequest struct {
	BloodTypeID *int64
	CityID      *int64
}

// GetRecipientsResponse Get a list of recipients
type GetRecipientsResponse struct {
	Recipients []entities.Recipient `json:"recipients"`
	Err        error                `json:"error,omitempty"`
}

// DecodePublicRecipientListRequest decode public recipient list request
func DecodePublicRecipientListRequest(ctx context.Context, r *http.Request) (interface{}, error) {
	var req GetRecipientsRequest

	vars := r.URL.Query()
	cityID, ok := getIntOrNull(vars, "city")
	if ok {
		req.CityID = &cityID
	}
	bloodTypeID, ok := getIntOrNull(vars, "compatible_with")
	if ok {
		req.BloodTypeID = &bloodTypeID
	}
	return req, nil
}

func getIntOrNull(vars url.Values, field string) (int64, bool) {
	values, ok := vars[field]
	if ok {
		if len(values) >= 1 {
			value := values[0]
			if value != "" {
				id, err := strconv.ParseInt(value, 10, 32)
				if err == nil {
					return id, true
				}
			}
		}
	}
	return 0, false
}
