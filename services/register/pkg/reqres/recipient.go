package reqres

import (
	"context"
	"encoding/json"
	"net/http"

	entities "github.com/StevenRojas/donatePlasma/services/register/pkg/service"
)

// CreateRecipientRequest create recipient request
type CreateRecipientRequest struct {
	Recipient entities.Recipient `json:"recipient"`
}

// CreateRecipientResponse create recipient response
type CreateRecipientResponse struct {
	ID  int64 `json:"id"`
	Err error `json:"error,omitempty"`
}

// EncodeResponse generic encoder
func EncodeResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	return json.NewEncoder(w).Encode(response)
}

// DecodeCreateRecipientRequest decode create recipient request
func DecodeCreateRecipientRequest(ctx context.Context, r *http.Request) (interface{}, error) {
	var req CreateRecipientRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		return nil, err
	}
	return req, nil
}
