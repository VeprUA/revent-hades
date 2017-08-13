# revent-hades
Service to submit and monitor software errors and warnings.

## How to use

### Submitting message
To submit an error, simply make a `POST` request to `/api/v1/messages/` with the following payload.

```
{
    appName: [String] || "Untitled App",
    user: [String] || "gen_user",
    tags: [String] || 'ERROR',
    message: [String],
    isError: [integer] || 1,
    comment: [String]
}
```

### Retrieving message
To fetch all messages, make a `GET` request to `/api/v1/messages/`. Expected output as follows

```
{
    messageId: [Integer],
    message: [String],
    user: [String], 
    dateCreated: [timestamp], 
    isError: [Integer], 
    appName: [String], 
    comment: [String]
}
```

