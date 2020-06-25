FROM golang:alpine AS middleware

ENV MIDDLEWARE_REST_PORT=8000

# Working directory for build
WORKDIR /build

# Download dependecies from go.mod
COPY go.mod .
#COPY go.sum .
RUN go mod download

# Build the code to get the binary (register)
COPY . .
RUN go build -o register

# Working directory for place the binary
WORKDIR /bin
RUN cp /build/register .
EXPOSE 8000
ENTRYPOINT ["/bin/register"]