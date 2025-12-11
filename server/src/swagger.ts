// server/src/swagger.ts
import type { OpenAPIObject } from "openapi3-ts";

/**
 * Minimal but complete OpenAPI v3 specification for the Leads API.
 * Update descriptions/fields to match your actual server behavior.
 */
const swaggerSpec: OpenAPIObject = {
  openapi: "3.0.0",
  info: {
    title: "RealEstateFlow API",
    version: "1.0.0",
    description: "API documentation for RealEstateFlow - Leads endpoints",
  },
  servers: [
    {
      url: "http://localhost:4000/api",
      description: "Local dev server (use with client at http://localhost:3000)",
    },
  ],
  tags: [
    { name: "Leads", description: "Operations related to lead management" }
  ],
  paths: {
    "/leads": {
      get: {
        tags: ["Leads"],
        summary: "List all leads",
        description: "Returns an array of leads.",
        responses: {
          "200": {
            description: "An array of leads",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Lead" },
                },
              },
            },
          },
          "500": { description: "Server error" }
        },
      },
      post: {
        tags: ["Leads"],
        summary: "Create a lead",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateLeadPayload" },
            },
          },
        },
        responses: {
          "201": {
            description: "Lead created",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Lead" } }
            }
          },
          "400": { description: "Bad request / validation error" },
          "500": { description: "Server error" }
        },
      },
    },

    "/leads/{id}": {
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Lead ID",
        }
      ],
      get: {
        tags: ["Leads"],
        summary: "Get a lead by id",
        responses: {
          "200": {
            description: "Lead object",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Lead" } } }
          },
          "404": { description: "Lead not found" },
          "500": { description: "Server error" }
        }
      },
      put: {
        tags: ["Leads"],
        summary: "Update a lead",
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/CreateLeadPayload" } }
          }
        },
        responses: {
          "200": { description: "Updated lead", content: { "application/json": { schema: { $ref: "#/components/schemas/Lead" } } } },
          "400": { description: "Bad request" },
          "404": { description: "Not found" }
        }
      },
      delete: {
        tags: ["Leads"],
        summary: "Delete a lead",
        responses: {
          "200": { description: "Deleted", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" } } } } } },
          "404": { description: "Not found" }
        }
      }
    }
  },

  components: {
    schemas: {
      Lead: {
        type: "object",
        properties: {
          id: { type: "string", example: "1" },
          name: { type: "string", example: "John Doe" },
          phone: { type: "string", example: "9999999999" },
          email: { type: "string", example: "john@example.com" },
          location: { type: "string", example: "Hyderabad" },
          budget: { type: "number", example: 5000000 },
          status: { type: "string", example: "new" },
          notes: { type: "string", example: "Called on Monday" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        },
        required: ["id","name","createdAt"]
      },
      CreateLeadPayload: {
        type: "object",
        properties: {
          name: { type: "string" },
          phone: { type: "string" },
          email: { type: "string" },
          location: { type: "string" },
          budget: { type: "number" },
          status: { type: "string", example: "new" },
          notes: { type: "string" }
        },
        required: ["name"]
      }
    }
  }
};

export default swaggerSpec;
