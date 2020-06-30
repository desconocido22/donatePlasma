FROM golang:alpine AS matcher

ENV MATCHER_PORT=8001

# Working directory for build
WORKDIR /build

# Download dependecies from go.mod
COPY go.mod .
#COPY go.sum .
RUN go mod download

# Build the code to get the binary (matcher)
COPY . .
RUN go build -o matcher

# Working directory for place the binary
WORKDIR /bin
RUN cp /build/matcher .
EXPOSE 8001
ENTRYPOINT ["/bin/matcher"]