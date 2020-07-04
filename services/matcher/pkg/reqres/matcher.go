package reqres

import (
	"context"
	"errors"
	"net/http"
	"net/url"
	"strconv"

	entities "github.com/StevenRojas/donatePlasma/services/matcher/pkg/service"
	"github.com/gorilla/mux"
)

// GetRecipientsRequest recipient list request
type GetRecipientsRequest struct {
	BloodTypeID *int64
	CityID      *int64
}

// GetRecipientsResponse Get a list of recipients
type GetRecipientsResponse struct {
	Recipients []entities.Recipient `json:"recipients"`
	Err        error                `json:"error,omitempty"`
}

// BloodTypeRequest blood type request
type BloodTypeRequest struct {
	BloodTypeID int64
}

// CompatibleBloodTypeResponse blood type request
type CompatibleBloodTypeResponse struct {
	Types string `json:"compatible_types"`
	Err   error  `json:"error,omitempty"`
}

// DecodeBloodTypeRequest decode blood type request
func DecodeBloodTypeRequest(ctx context.Context, r *http.Request) (interface{}, error) {
	var req BloodTypeRequest

	vars := mux.Vars(r)
	id, err := strconv.ParseInt(vars["typeId"], 10, 32)
	if err != nil {
		return nil, errors.New("Invalid blood type ID")
	}
	req.BloodTypeID = id
	return req, nil
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
