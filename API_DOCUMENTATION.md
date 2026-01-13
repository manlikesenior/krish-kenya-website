# Backend API Documentation

This document describes the REST API endpoints for managing Events and Tracks in the KRISH-KENYA website.

## Base URL
All API endpoints are prefixed with `/api`

## Authentication
- **Read operations** (GET): Public access
- **Write operations** (POST, PUT, DELETE): Require authentication via Supabase Auth

## Events API

### Get All Events
```http
GET /api/events
```

**Query Parameters:**
- `upcoming` (boolean, optional): Filter for upcoming events only
- `limit` (number, optional): Limit the number of results

**Example:**
```bash
GET /api/events?upcoming=true&limit=10
```

**Response:**
```json
{
  "events": [
    {
      "id": "uuid",
      "title": "Event Title",
      "date": "2024-12-31T20:00:00Z",
      "venue": "Venue Name",
      "city": "City Name",
      "description": "Event description",
      "ticket_link": "https://tickets.com/event",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Get Single Event
```http
GET /api/events/[id]
```

**Response:**
```json
{
  "event": {
    "id": "uuid",
    "title": "Event Title",
    ...
  }
}
```

### Create Event
```http
POST /api/events
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Event Title",
  "date": "2024-12-31T20:00:00Z",
  "venue": "Venue Name",
  "city": "City Name",
  "description": "Event description (optional)",
  "ticket_link": "https://tickets.com/event (optional)"
}
```

**Required Fields:** `title`, `date`, `venue`, `city`

**Response:**
```json
{
  "event": {
    "id": "uuid",
    "title": "Event Title",
    ...
  }
}
```

### Update Event
```http
PUT /api/events/[id]
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body:** (all fields optional)
```json
{
  "title": "Updated Title",
  "date": "2024-12-31T20:00:00Z",
  "venue": "Updated Venue",
  "city": "Updated City",
  "description": "Updated description",
  "ticket_link": "https://updated-link.com"
}
```

### Delete Event
```http
DELETE /api/events/[id]
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Event deleted successfully"
}
```

## Tracks API

### Get All Tracks
```http
GET /api/tracks
```

**Query Parameters:**
- `genre` (string, optional): Filter by genre
- `platform` (string, optional): Filter by platform (e.g., "Spotify", "Apple Music")
- `limit` (number, optional): Limit the number of results

**Example:**
```bash
GET /api/tracks?genre=Amapiano&limit=5
```

**Response:**
```json
{
  "tracks": [
    {
      "id": "uuid",
      "title": "Track Title",
      "genre": "Amapiano",
      "platform": "Spotify",
      "link": "https://spotify.com/track",
      "cover_image": "https://example.com/cover.jpg",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Get Single Track
```http
GET /api/tracks/[id]
```

**Response:**
```json
{
  "track": {
    "id": "uuid",
    "title": "Track Title",
    ...
  }
}
```

### Create Track
```http
POST /api/tracks
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Track Title",
  "genre": "Amapiano",
  "platform": "Spotify",
  "link": "https://spotify.com/track",
  "cover_image": "https://example.com/cover.jpg"
}
```

**Required Fields:** `title`, `genre`, `platform`, `link`, `cover_image`

**Response:**
```json
{
  "track": {
    "id": "uuid",
    "title": "Track Title",
    ...
  }
}
```

### Update Track
```http
PUT /api/tracks/[id]
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body:** (all fields optional)
```json
{
  "title": "Updated Title",
  "genre": "Afro House",
  "platform": "Apple Music",
  "link": "https://updated-link.com",
  "cover_image": "https://updated-cover.jpg"
}
```

### Delete Track
```http
DELETE /api/tracks/[id]
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Track deleted successfully"
}
```

## Error Responses

All endpoints may return the following error responses:

**400 Bad Request:**
```json
{
  "error": "Missing required fields: title, date, venue, city"
}
```

**401 Unauthorized:**
```json
{
  "error": "Unauthorized"
}
```

**404 Not Found:**
```json
{
  "error": "Event not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error"
}
```

## Usage Examples

### JavaScript/TypeScript (Fetch API)
```typescript
// Get all events
const response = await fetch('/api/events');
const { events } = await response.json();

// Create an event (requires authentication)
const response = await fetch('/api/events', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'New Event',
    date: '2024-12-31T20:00:00Z',
    venue: 'Venue Name',
    city: 'City Name'
  })
});
const { event } = await response.json();
```

### cURL
```bash
# Get all events
curl http://localhost:3000/api/events

# Create an event
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "New Event",
    "date": "2024-12-31T20:00:00Z",
    "venue": "Venue Name",
    "city": "City Name"
  }'
```

## Database Schema

The API uses Supabase with the following table structures:

### Events Table
- `id` (uuid, primary key)
- `title` (text, required)
- `date` (timestamp with time zone, required)
- `venue` (text, required)
- `city` (text, required)
- `description` (text, optional)
- `ticket_link` (text, optional)
- `created_at` (timestamp with time zone)

### Tracks Table
- `id` (uuid, primary key)
- `title` (text, required)
- `genre` (text, required)
- `platform` (text, required)
- `link` (text, required)
- `cover_image` (text, required)
- `created_at` (timestamp with time zone)

## Security

- Row Level Security (RLS) is enabled on all tables
- Public read access is allowed for all users
- Write operations (create, update, delete) require authentication
- Authentication is handled via Supabase Auth

