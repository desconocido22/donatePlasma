package transport

import (
	"context"
	"net/http"

	"github.com/StevenRojas/donatePlasma/services/register/pkg/endpoints"
	"github.com/StevenRojas/donatePlasma/services/register/pkg/reqres"
	httptransport "github.com/go-kit/kit/transport/http"
	"github.com/gorilla/mux"
)

// NewHTTPServer Create new HTTP server instance
func NewHTTPServer(ctx context.Context, endpoints endpoints.Endpoints) http.Handler {
	r := mux.NewRouter()
	r.Use(middleware)
	setRecipientPaths(r, endpoints)

	return r
}

func setRecipientPaths(r *mux.Router, endpoints endpoints.Endpoints) {
	// Create a recipient record
	r.Methods(http.MethodPost).Path("/api/register/recipient").Handler(httptransport.NewServer(
		endpoints.CreateRecipient,
		reqres.DecodeCreateRecipientRequest,
		reqres.EncodeResponse,
	))

	// Get a list of all recipients
	r.Methods(http.MethodGet).Path("/api/register/recipient").Handler(httptransport.NewServer(
		endpoints.GetRecipients,
		reqres.DecodeProtectedEmptyRequest,
		reqres.EncodeResponse,
	))

	// Get a list of public recipients
	r.Methods(http.MethodGet).Path("/api/register/recipient/public").Handler(httptransport.NewServer(
		endpoints.GetPublicRecipients,
		reqres.DecodeEmptyRequest,
		reqres.EncodeResponse,
	))

	// Update a recipient
	r.Methods(http.MethodPut).Path("/api/register/recipient/{id}").Handler(httptransport.NewServer(
		endpoints.UpdateRecipient,
		reqres.DecodeUpdateRecipientRequest,
		reqres.EncodeResponse,
	))

	// Verify/Unverify a recipient
	r.Methods(http.MethodPatch).Path("/api/register/recipient/{id}/verify").Handler(httptransport.NewServer(
		endpoints.VerifyRecipient,
		reqres.DecodeVerifyRecipientRequest,
		reqres.EncodeResponse,
	))

	// Set as public or not public a recipient
	r.Methods(http.MethodPatch).Path("/api/register/recipient/{id}/public").Handler(httptransport.NewServer(
		endpoints.PublicRecipient,
		reqres.DecodePublicRecipientRequest,
		reqres.EncodeResponse,
	))

	// Delete a recipient
	r.Methods(http.MethodDelete).Path("/api/register/recipient/{id}").Handler(httptransport.NewServer(
		endpoints.DeleteRecipient,
		reqres.DecodeDeleteRecipientRequest,
		reqres.EncodeResponse,
	))
}

func middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(
		func(w http.ResponseWriter, r *http.Request) {
			w.Header().Add("Content-Type", "application/json")
			next.ServeHTTP(w, r)
		})
}
