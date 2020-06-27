package reqres

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	entities "github.com/StevenRojas/donatePlasma/services/register/pkg/service"
	"github.com/gorilla/mux"
)

// OkErrorResponse Empty response, just OK or Error
type OkErrorResponse struct {
	Ok  bool  `json:"ok"`
	Err error `json:"error,omitempty"`
}

// CreateRecipientRequest create recipient request
type CreateRecipientRequest struct {
	Recipient entities.Recipient `json:"recipient"`
}

// CreateRecipientResponse create recipient response
type CreateRecipientResponse struct {
	ID  int64 `json:"id"`
	Err error `json:"error,omitempty"`
}

// GetRecipientsResponse Get a list of recipients
type GetRecipientsResponse struct {
	Recipients []entities.Recipient `json:"recipients"`
	Err        error                `json:"error,omitempty"`
}

// UpdateRecipientRequest update recipient request
type UpdateRecipientRequest struct {
	Recipient entities.Recipient `json:"recipient"`
}

// UpdateRecipientResponse create recipient request
type UpdateRecipientResponse struct {
	Recipient entities.Recipient `json:"recipient"`
	Err       error              `json:"error,omitempty"`
}

// VerifyRecipientResquest vefiry recipient request
type VerifyRecipientResquest struct {
	ID       int64 `json:"id,omitempty"`
	Verified bool  `json:"verified"`
}

// DecodeCreateRecipientRequest decode create recipient request
func DecodeCreateRecipientRequest(ctx context.Context, r *http.Request) (interface{}, error) {
	var req CreateRecipientRequest
	defer r.Body.Close()
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		return nil, err
	}
	return req, nil
}

// DecodeUpdateRecipientRequest decode update recipient request
func DecodeUpdateRecipientRequest(ctx context.Context, r *http.Request) (interface{}, error) {
	if !validateAPIKey(r) {
		return nil, errors.New("Invalid access")
	}
	var req UpdateRecipientRequest
	defer r.Body.Close()
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		return nil, err
	}
	vars := mux.Vars(r)
	id, err := strconv.ParseInt(vars["id"], 10, 32)
	if err != nil {
		return nil, errors.New("Invalid recipient ID")
	}
	req.Recipient.ID = id
	return req, nil
}

// DecodeVerifyRecipientRequest decode verify recipient request
func DecodeVerifyRecipientRequest(ctx context.Context, r *http.Request) (interface{}, error) {
	if !validateAPIKey(r) {
		return nil, errors.New("Invalid access")
	}
	var req VerifyRecipientResquest
	defer r.Body.Close()
	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		return nil, err
	}
	vars := mux.Vars(r)
	id, err := strconv.ParseInt(vars["id"], 10, 32)
	if err != nil {
		return nil, errors.New("Invalid recipient ID")
	}
	req.ID = id
	return req, nil
}
